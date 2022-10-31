import { imageSize } from 'image-size'
import { jestExpect } from '@jest/expect'

import { GiphyContentType, GiphyThemePreset } from '../src/native/types'
import {
  expectToMatchImageSnapshot,
  getElWidth,
  getGPHDialogSearchField,
  showGPHDialog,
  STABLE_SEARCH_TERMS,
} from './utils'

type AnyRecord = Record<string, any>

async function showGPHDialogSettings() {
  await element(by.id('show-gph-dialog-settings')).tap()
  await expect(element(by.id('gph-settings'))).toExist()
}

async function hideGPHDialogSettings() {
  await element(by.id('gph-close-dialog')).tap()
  await expect(element(by.id('gph-settings'))).not.toExist()
}

function scrollGPHDialogSettingsTo(matcher: Detox.NativeMatcher) {
  return waitFor(element(matcher)).toBeVisible().whileElement(by.id('gph-dialog-content')).scroll(1000, 'down')
}

async function setCardPickerValue(cardId: string, value: string) {
  if (device.getPlatform() === 'ios') {
    const textInput = by.id('gph-card_text-input').withAncestor(by.id(cardId))
    await scrollGPHDialogSettingsTo(textInput)
    await element(textInput).tap()
    await element(by.id('gph-card_picker')).setColumnToValue(0, value)
    await element(by.id('done_text')).tap()
  } else {
    const picker = by.id('gph-card_picker').withAncestor(by.id(cardId))
    await scrollGPHDialogSettingsTo(picker)
    await element(picker).tap()
    await element(by.text(value).withAncestor(by.type('androidx.appcompat.widget.AlertDialogLayout'))).tap()
  }
}

async function toggleSwitches(allIds: string[], turnOnIds: string[]) {
  for (const id of allIds) {
    const switchValueHolder = await element(by.id(`${id}-value`))
    const attrs = await switchValueHolder.getAttributes()
    const turnedOn = (attrs as AnyRecord).text === 'true'
    const shouldTurnOn = turnOnIds.includes(id)

    if ((turnedOn && !shouldTurnOn) || (!turnedOn && shouldTurnOn)) {
      await scrollGPHDialogSettingsTo(by.id(id))
      await element(by.id(id)).tap()
    }
  }
}

async function setTextFieldValue(textFieldId: string, value: string) {
  const matcher = by.id(textFieldId)
  await scrollGPHDialogSettingsTo(matcher)
  await element(matcher).replaceText(value)
  await element(matcher).tapReturnKey()
}

function getGPHDialogTouchInterceptor() {
  if (device.getPlatform() === 'ios') {
    return element(by.type('UICollectionView').withDescendant(by.type('GiphyUISDK.GPHMediaCell')))
  }
  return element(by.type('com.giphy.sdk.ui.views.GPHTouchInterceptor'))
}

function getGPHDialogMediaCell() {
  if (device.getPlatform() === 'ios') {
    return element(by.type('GiphyUISDK.GPHMediaCell'))
  }
  return element(by.type('com.giphy.sdk.ui.views.GifView'))
}

function getGPHDialogConfirmationButton() {
  if (device.getPlatform() === 'ios') {
    return element(by.label('Select GIF')).atIndex(0)
  }
  return element(by.type('androidx.appcompat.widget.AppCompatButton'))
}

describe('Giphy Dialog Settings', () => {
  beforeEach(async () => {
    await device.launchApp()
  })

  afterEach(async () => {
    await device.terminateApp()
  })

  test('Theme', async () => {
    const cardId = 'gph-settings_theme'
    const variants = Object.keys(GiphyThemePreset)

    for (const theme of variants) {
      // Update settings
      await showGPHDialogSettings()
      await setCardPickerValue(cardId, theme)
      await hideGPHDialogSettings()

      // Show GPH Dialog
      await showGPHDialog()
      await getGPHDialogSearchField().typeText(STABLE_SEARCH_TERMS.gif)
      await expectToMatchImageSnapshot(device.takeScreenshot('Dialog'))

      // Reload App
      await device.terminateApp()
      await device.launchApp()
    }
  })

  test('Media Type', async () => {
    const variants = [
      {
        mediaTypes: [GiphyContentType.Gif],
        searchTerm: STABLE_SEARCH_TERMS.gif,
      },
      {
        mediaTypes: [GiphyContentType.Sticker, GiphyContentType.Emoji],
        searchTerm: STABLE_SEARCH_TERMS.sticker,
      },
      {
        mediaTypes: [GiphyContentType.Clips],
        searchTerm: STABLE_SEARCH_TERMS.clip,
      },
    ]

    for (const { mediaTypes, searchTerm } of variants) {
      // Update settings
      await showGPHDialogSettings()
      await toggleSwitches(Object.values(GiphyContentType), mediaTypes)
      await hideGPHDialogSettings()

      // Show GPH Dialog
      await showGPHDialog()
      await getGPHDialogSearchField().typeText(searchTerm)
      await expectToMatchImageSnapshot(device.takeScreenshot('Dialog'))

      // Reload App
      await device.terminateApp()
      await device.launchApp()
    }
  })

  test('Confirmation Screen', async () => {
    const cardId = 'gph-settings_confirmation-screen'

    for (const showConfirmation of [true, false]) {
      // Update settings
      await showGPHDialogSettings()
      await toggleSwitches([cardId], showConfirmation ? [cardId] : [])
      await hideGPHDialogSettings()

      // Show GPH Dialog
      await showGPHDialog()
      await getGPHDialogSearchField().typeText(STABLE_SEARCH_TERMS.gif)
      await expectToMatchImageSnapshot(device.takeScreenshot('Dialog'))

      // Check confirmation screen
      await getGPHDialogMediaCell().atIndex(0).tap({ x: 50, y: 50 })
      if (showConfirmation) {
        await expectToMatchImageSnapshot(device.takeScreenshot('Confirmation Screen'))
        await getGPHDialogConfirmationButton().tap()
      } else {
        await expect(getGPHDialogTouchInterceptor()).not.toExist()
      }
      await expectToMatchImageSnapshot(device.takeScreenshot('Result'))

      // Reload App
      await device.terminateApp()
      await device.launchApp()
    }
  })

  test('Sticker Column Count', async () => {
    const cardId = 'gph-settings_sticker-column-count'
    const variants = [
      { columnCount: 2, columnCountLabel: 'Two' },
      { columnCount: 3, columnCountLabel: 'Three' },
      { columnCount: 4, columnCountLabel: 'Four' },
    ] as const

    for (const { columnCount, columnCountLabel } of variants) {
      // Update settings
      await showGPHDialogSettings()
      await toggleSwitches(Object.values(GiphyContentType), [GiphyContentType.Sticker])
      await setCardPickerValue(cardId, columnCountLabel)
      await hideGPHDialogSettings()

      //  Show GPH dialog and check the number of columns
      await showGPHDialog()
      await getGPHDialogSearchField().typeText(STABLE_SEARCH_TERMS.stickerCollection)
      const cell = getGPHDialogMediaCell().atIndex(0)
      await waitFor(cell).toBeVisible().withTimeout(5000)
      const parentWidth = await getElWidth(getGPHDialogTouchInterceptor())
      const cellWidth = await getElWidth(cell)
      const expectedWidth = Math.floor(parentWidth / columnCount)
      const threshold = 15
      jestExpect(cellWidth).toBeGreaterThanOrEqual(expectedWidth - threshold)
      jestExpect(cellWidth).toBeLessThanOrEqual(expectedWidth + threshold)

      // Reload App
      await device.terminateApp()
      await device.launchApp()
    }
  })

  /* ANDROID SPECIFIC */
  if (device.getPlatform() === 'android') {
    test('Checkered Background', async () => {
      const cardId = 'gph-settings_checkered-background'

      for (const showCheckeredBg of [true, false]) {
        // Update settings
        await showGPHDialogSettings()
        await toggleSwitches(Object.values(GiphyContentType), [GiphyContentType.Sticker])
        await toggleSwitches([cardId], showCheckeredBg ? [cardId] : [])
        await hideGPHDialogSettings()

        // Show GPH Dialog
        await showGPHDialog()
        await getGPHDialogSearchField().typeText(STABLE_SEARCH_TERMS.sticker)
        await expectToMatchImageSnapshot(device.takeScreenshot('Dialog'))

        // Reload App
        await device.terminateApp()
        await device.launchApp()
      }
    })

    test('Suggestions Bar', async () => {
      const cardId = 'gph-settings_suggestions-bar'

      for (const showSuggestionsBar of [true, false]) {
        // Update settings
        await showGPHDialogSettings()
        await toggleSwitches([cardId], showSuggestionsBar ? [cardId] : [])
        await hideGPHDialogSettings()

        // Show GPH Dialog
        await showGPHDialog()
        const suggestionsBar = element(by.type('com.giphy.sdk.ui.views.GPHSuggestionsView'))
        if (showSuggestionsBar) {
          await expect(suggestionsBar).toBeVisible()
        } else {
          await expect(suggestionsBar).not.toBeVisible()
        }

        // Reload App
        await device.terminateApp()
        await device.launchApp()
      }
    })
  }

  /* iOS SPECIFIC */
  if (device.getPlatform() === 'ios') {
    test('Tray Height Multiplier', async () => {
      const variants = [
        {
          heightMultiplier: '0.5',
          expectedHeight: 1125,
          expectedWidth: 1170,
        },
        {
          heightMultiplier: '1',
          expectedHeight: 2391,
          expectedWidth: 1170,
        },
      ] as const

      for (const variant of variants) {
        const { heightMultiplier, expectedHeight, expectedWidth } = variant

        // Update settings
        await showGPHDialogSettings()
        await toggleSwitches(Object.values(GiphyContentType), [GiphyContentType.Text])
        await setTextFieldValue('gph-settings_tray-height', heightMultiplier)
        await hideGPHDialogSettings()

        // Show GPH Dialog and check its size
        await showGPHDialog()
        const dialogEl = element(
          by.type('UIViewControllerWrapperView').withDescendant(by.type('GiphyUISDK.GPHMediaCell'))
        )
        const screenshot = await dialogEl.takeScreenshot(`Dialog-h${heightMultiplier}`)
        const screenshotSize = imageSize(screenshot)
        jestExpect(screenshotSize.height).toEqual(expectedHeight)
        jestExpect(screenshotSize.width).toEqual(expectedWidth)

        // Reload App
        await device.terminateApp()
        await device.launchApp()
      }
    })
  }
})
