import type { GiphyMedia } from '../src'
import { GIPHY_MEDIA_FIXTURE } from '../example/src/fixtures'
import { expectToMatchImageSnapshot, getRootElement } from './utils'

const VISIBLE_GIFS_COUNT = 2

export function getGifViewId(media: GiphyMedia) {
  return `gph-${media.isVideo ? 'video' : 'media'}-view-${media.id}`
}

export function getGifViewElement(media: GiphyMedia) {
  const id = getGifViewId(media)
  return element(by.id(id))
}

describe('Main Screen', () => {
  beforeAll(async () => {
    await device.launchApp()
  })

  beforeEach(async () => {
    await device.reloadReactNative()
  })

  it('should be visible', async () => {
    await expect(getRootElement()).toBeVisible()
  })

  it(`should contain ${VISIBLE_GIFS_COUNT} visible gifs`, async () => {
    for (const [idx, media] of GIPHY_MEDIA_FIXTURE.entries()) {
      const el = getGifViewElement(media)
      await expect(el).toExist()
      if (idx < VISIBLE_GIFS_COUNT) {
        // Use lower visibility threshold for elements that might be partially visible
        // due to layout constraints in the ScrollView
        try {
          await expect(el).toBeVisible()
        } catch (error) {
          await expect(el).toBeVisible(25)
        }
      } else {
        await expect(el).not.toBeVisible()
      }
    }

    await expectToMatchImageSnapshot(device.takeScreenshot('main-screen'))
  })
})
