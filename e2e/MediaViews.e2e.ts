import { execSync } from 'child_process'
import { jestExpect } from '@jest/expect'

import { fetchTrendingId, wait } from './utils'

const GIF_ID = '3o6gbbuLW76jkt8vIc'
const MISSING_ID = 'noSuchGiphyMediaId000'
const LOAD_TIMEOUT = 30_000
const NO_EVENT_WAIT = 5_000
// ExoPlayer logs these when a player is created and released.
const EXO_PLAYER_INIT_LOG = /ExoPlayerImpl: Init [0-9a-f]+ \[ExoPlayerLib/
const EXO_PLAYER_RELEASE_LOG = /ExoPlayerImpl: Release [0-9a-f]+ \[ExoPlayerLib/

const byID = (id: string) => element(by.id(id))
const errorText = () => byID('media-tests_error')
const loadText = () => byID('media-tests_load')
const playbackStateText = () => byID('media-tests_playback-state')
const muteEventText = () => byID('media-tests_mute-event')

async function showMediaTests() {
  await byID('show-media-tests').tap()
  await waitFor(byID('media-tests_id-input')).toBeVisible().withTimeout(5000)
}

async function show(kind: 'media' | 'video', mediaId: string) {
  await byID('media-tests_id-input').replaceText(mediaId)
  // Blur the input, otherwise the next tap only dismisses the keyboard.
  await byID('media-tests_id-input').tapReturnKey()
  await byID(`media-tests_show-${kind}`).tap()
  await waitFor(byID(`media-tests_${kind}-view`))
    .toBeVisible()
    .withTimeout(5000)
}

async function expectLoaded() {
  await waitFor(loadText()).toHaveText('loaded').withTimeout(LOAD_TIMEOUT)
  await expect(errorText()).toHaveText('none')
}

async function expectError() {
  await waitFor(errorText()).not.toHaveText('none').withTimeout(LOAD_TIMEOUT)
  // The native side must send a description, not just the event.
  await expect(errorText()).not.toHaveText('empty description')
}

async function expectPlaybackState(state: 'Playing' | 'Paused') {
  await waitFor(playbackStateText()).toHaveText(state).withTimeout(LOAD_TIMEOUT)
}

function adb(command: string) {
  return execSync(`adb -s ${device.id} ${command}`, { encoding: 'utf8' })
}

// A start time for `log show` on the simulator: local time, whole seconds.
function iosLogTime() {
  const now = new Date()
  const pad = (n: number) => `${n}`.padStart(2, '0')
  return (
    `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ` +
    `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`
  )
}

/*
 * The AVPlayers created since `since` that are still playing. CoreMedia logs each player's creation,
 * playback status (timeControlStatus 2 is playing) and deallocation in the app's log.
 */
function iosPlayingPlayers(since: string) {
  const log = execSync(
    `xcrun simctl spawn ${device.id} log show --style compact --start "${since}" ` +
      `--predicate 'process == "GiphyReactNativeSdkExample" AND eventMessage CONTAINS "<P/"'`,
    { encoding: 'utf8', maxBuffer: 256 * 1024 * 1024 }
  )
  const players = new Map<string, { status: number; deallocated: boolean }>()
  for (const line of log.split('\n')) {
    const match = line.match(
      /<(P\/[A-Za-z0-9]+)\|0x[0-9a-f]+> (Player initialized|setting timeControlStatus=(\d)|Player deallocated)/
    )
    if (!match) {
      continue
    }
    const [, id, event, status] = match
    if (event === 'Player initialized') {
      players.set(id, { status: 0, deallocated: false })
    }
    // Players created before `since` aren't tracked.
    const player = players.get(id)
    if (player && status !== undefined) {
      player.status = Number(status)
    } else if (player && event === 'Player deallocated') {
      player.deallocated = true
    }
  }
  return [...players].filter(([, player]) => !player.deallocated && player.status === 2).map(([id]) => id)
}

async function waitForIosPlayingPlayers(since: string, expectPlaying: boolean) {
  const deadline = Date.now() + LOAD_TIMEOUT
  let playing = iosPlayingPlayers(since)
  while (playing.length > 0 !== expectPlaying && Date.now() < deadline) {
    await wait(1000)
    playing = iosPlayingPlayers(since)
  }
  return playing
}

describe('Media Views', () => {
  beforeEach(async () => {
    await device.launchApp({ newInstance: true })
    await showMediaTests()
  })

  afterEach(async () => {
    await device.terminateApp()
  })

  it('should load a GIF by ID', async () => {
    await show('media', GIF_ID)
    await expectLoaded()
  })

  it('should load a sticker by ID', async () => {
    await show('media', await fetchTrendingId('stickers'))
    await expectLoaded()
  })

  it('should report a load for the last media after switching quickly', async () => {
    await byID('media-tests_id-input').replaceText(`${GIF_ID},${await fetchTrendingId('stickers')}`)
    await byID('media-tests_id-input').tapReturnKey()
    // The view gets the second media before the first has loaded.
    await byID('media-tests_switch-media').tap()
    await expectLoaded()
  })

  it('should report an error for an unknown ID in the media view', async () => {
    await show('media', MISSING_ID)
    await expectError()
    await wait(NO_EVENT_WAIT)
    await expect(loadText()).toHaveText('none')
  })

  it('should report an error for an unknown ID in the video view', async () => {
    await show('video', MISSING_ID)
    await expectError()
  })

  it('should play, mute, pause and resume a clip', async () => {
    await show('video', await fetchTrendingId('clips'))
    await expectPlaybackState('Playing')

    // The clip plays with sound, so muting it must report onMute, not onUnmute.
    await byID('media-tests_mute-all').tap()
    await waitFor(muteEventText()).not.toHaveText('none').withTimeout(LOAD_TIMEOUT)
    await expect(muteEventText()).toHaveText('mute')

    await byID('media-tests_pause-all').tap()
    await expectPlaybackState('Paused')

    await byID('media-tests_resume').tap()
    await expectPlaybackState('Playing')

    await expect(errorText()).toHaveText('none')
  })

  it('should release the player when a playing video view unmounts', async () => {
    const clipId = await fetchTrendingId('clips')
    const since = iosLogTime()
    await show('video', clipId)
    await expectPlaybackState('Playing')

    if (device.getPlatform() === 'ios') {
      // The log shows the clip playing; otherwise the check below would pass without checking anything.
      jestExpect(await waitForIosPlayingPlayers(since, true)).not.toEqual([])
      // Replacing the video view with a media view of the same ID (still in the input) unmounts it.
      await byID('media-tests_show-media').tap()
      jestExpect(await waitForIosPlayingPlayers(since, false)).toEqual([])
      return
    }

    adb('logcat -c')
    await byID('media-tests_show-media').tap()

    const deadline = Date.now() + LOAD_TIMEOUT
    let released = false
    while (!released && Date.now() < deadline) {
      released = EXO_PLAYER_RELEASE_LOG.test(adb('logcat -d -s ExoPlayerImpl:I'))
      if (!released) {
        await wait(500)
      }
    }
    jestExpect(released).toBe(true)
  })

  it('should not start playback when a video view unmounts before its media loads', async () => {
    const isIos = device.getPlatform() === 'ios'
    await byID('media-tests_id-input').replaceText(await fetchTrendingId('clips'))
    await byID('media-tests_id-input').tapReturnKey()
    const since = isIos ? iosLogTime() : ''
    if (!isIos) {
      adb('logcat -c')
    }
    // The video view is replaced 50 ms after it mounts, while it still looks up its media.
    await byID('media-tests_video-then-media').tap()
    await waitFor(byID('media-tests_media-view')).toBeVisible().withTimeout(5000)
    await wait(NO_EVENT_WAIT * 2)

    if (isIos) {
      jestExpect(iosPlayingPlayers(since)).toEqual([])
    } else {
      jestExpect(adb('logcat -d -s ExoPlayerImpl:I')).not.toMatch(EXO_PLAYER_INIT_LOG)
    }
  })
})
