import { imageSize } from 'image-size'
import { jestExpect } from '@jest/expect'

import { GiphyContentType } from '../src/dto/giphyContentType'
import { GiphyThemePreset } from '../src/dto/giphyThemePreset'
import {
  expectToMatchImageSnapshot,
  getElWidth,
  getGPHDialogSearchField,
  showGPHDialog,
  STABLE_SEARCH_TERMS,
  wait,
} from './utils'

type AnyRecord = Record<string, any>

const SETTINGS_CARD = {
  checkeredBackground: 'gph-settings_checkered-background',
  confirmationScreen: 'gph-settings_confirmation-screen',
  dynamicText: 'gph-settings_dynamic-text',
  selectedContentType: 'gph-settings_selected-content-type',
  stickerColumnCount: 'gph-settings_sticker-column-count',
  suggestionsBar: 'gph-settings_suggestions-bar',
  theme: 'gph-settings_theme',
  trayHeight: 'gph-settings_tray-height',
} as const

async function showGPHDialogSettings() {
  await element(by.id('show-gph-dialog-settings')).tap()
  await expect(element(by.id('gph-settings'))).toExist()
}

async function hideGPHDialogSettings() {
  await element(by.id('gph-close-dialog')).tap()
  await expect(element(by.id('gph-settings'))).not.toExist()
}

function scrollGPHDialogSettingsTo(matcher: Detox.NativeMatcher) {
  return waitFor(element(matcher)).toBeVisible().whileElement(by.id('gph-dialog-content')).scroll(800, 'down')
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
  return element(
    by
      .type('com.giphy.sdk.ui.views.GPHTouchInterceptor')
      .withAncestor(by.type('com.giphy.sdk.ui.views.dialogview.GiphyDialogView'))
  )
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

function getGPHTabBar() {
  if (device.getPlatform() === 'ios') {
    return element(by.type('GiphyUISDK.GPHTabBar'))
  }
  return element(by.type('com.giphy.sdk.ui.views.GPHMediaTypeView'))
}

function getSuggestionBar() {
  if (device.getPlatform() === 'ios') {
    return element(by.type('UICollectionView').withDescendant(by.type('GiphyUISDK.GPHTermSuggestionCell')))
  }
  return element(by.type('com.giphy.sdk.ui.views.GPHSuggestionsView'))
}

function getDynamicTextLabel() {
  if (device.getPlatform() === 'ios') {
    return element(by.type('GiphyUISDK.GPHTextSuggestionCell'))
  }
  return element(
    by.type('android.widget.LinearLayout').withAncestor(by.type('com.giphy.sdk.ui.views.GPHSuggestionsView'))
  ).atIndex(0)
}

describe('Giphy Dialog Settings', () => {
  beforeEach(async () => {
    await device.launchApp()
  })

  afterEach(async () => {
    await device.terminateApp()
  })

  test('Theme Preset', async () => {
    const variants = Object.keys(GiphyThemePreset)

    for (const theme of variants) {
      // Update settings
      await showGPHDialogSettings()
      await setCardPickerValue(SETTINGS_CARD.theme, theme)
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

  test('Custom Theme', async () => {
    // Update settings
    await showGPHDialogSettings()
    await setCardPickerValue(SETTINGS_CARD.theme, 'Custom')
    await toggleSwitches(Object.values(GiphyContentType), Object.values(GiphyContentType))
    await toggleSwitches([SETTINGS_CARD.suggestionsBar], [SETTINGS_CARD.suggestionsBar])
    await toggleSwitches([SETTINGS_CARD.confirmationScreen], [SETTINGS_CARD.confirmationScreen])
    await hideGPHDialogSettings()

    // Show GPH Dialog
    await showGPHDialog()
    await getGPHDialogSearchField().typeText(STABLE_SEARCH_TERMS.gif)
    await expectToMatchImageSnapshot(device.takeScreenshot('Search'))

    // Check confirmation screen
    await getGPHDialogMediaCell().atIndex(0).tap({ x: 50, y: 50 })
    await expectToMatchImageSnapshot(device.takeScreenshot('Confirmation Screen'))

    // Reload App
    await device.terminateApp()
    await device.launchApp()
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

  test('Selected Content Type', async () => {
    const variants = Object.keys(GiphyContentType)

    for (const contentType of variants) {
      // Update settings
      await showGPHDialogSettings()
      await toggleSwitches(Object.values(GiphyContentType), Object.values(GiphyContentType))
      await setCardPickerValue(SETTINGS_CARD.selectedContentType, contentType)
      await hideGPHDialogSettings()

      // Show GPH Dialog
      await showGPHDialog()
      await expectToMatchImageSnapshot(getGPHTabBar().takeScreenshot(`dialog-tab-bar-${contentType}`))

      // Reload App
      await device.terminateApp()
      await device.launchApp()
    }
  })

  test('Confirmation Screen', async () => {
    for (const showConfirmation of [true, false]) {
      // Update settings
      await showGPHDialogSettings()
      await toggleSwitches(
        [SETTINGS_CARD.confirmationScreen],
        showConfirmation ? [SETTINGS_CARD.confirmationScreen] : []
      )
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
    const variants = [
      { columnCount: 2, columnCountLabel: 'Two' },
      { columnCount: 3, columnCountLabel: 'Three' },
      { columnCount: 4, columnCountLabel: 'Four' },
    ] as const

    for (const { columnCount, columnCountLabel } of variants) {
      // Update settings
      await showGPHDialogSettings()
      await toggleSwitches(Object.values(GiphyContentType), [GiphyContentType.Sticker, GiphyContentType.Emoji])
      await setCardPickerValue(SETTINGS_CARD.stickerColumnCount, columnCountLabel)
      await hideGPHDialogSettings()

      //  Show GPH dialog and check the number of columns
      await showGPHDialog()
      await getGPHTabBar().tap({ x: 10, y: 10 })
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

  test('Dynamic Text Enabled', async () => {
    // Update settings
    await showGPHDialogSettings()
    await toggleSwitches(Object.values(GiphyContentType), [GiphyContentType.Gif, GiphyContentType.Text])
    await toggleSwitches([SETTINGS_CARD.dynamicText], [SETTINGS_CARD.dynamicText])
    await toggleSwitches([SETTINGS_CARD.suggestionsBar], [SETTINGS_CARD.suggestionsBar])
    await hideGPHDialogSettings()

    // Show GPH Dialog
    await showGPHDialog()
    await getGPHDialogSearchField().typeText(STABLE_SEARCH_TERMS.dynamicText)

    // Check dynamic text
    await waitFor(getSuggestionBar()).toBeVisible().withTimeout(5000)
    await expectToMatchImageSnapshot(getSuggestionBar().takeScreenshot(`Suggestion Bar`))
    await getDynamicTextLabel().tap()
    await waitFor(getGPHDialogMediaCell().atIndex(0)).toBeVisible()
    await wait(1500)

    const failureThreshold = device.getPlatform() === 'android' ? 0.03 : 0.05
    await expectToMatchImageSnapshot(device.takeScreenshot('Dialog'), { failureThreshold })
    await getGPHDialogMediaCell().atIndex(0).tap()
    await wait(1000)
    await expectToMatchImageSnapshot(device.takeScreenshot('Result'), { failureThreshold })

    // Reload App
    await device.terminateApp()
    await device.launchApp()
  })

  test('Dynamic Text Disabled', async () => {
    // Update settings
    await showGPHDialogSettings()
    await toggleSwitches(Object.values(GiphyContentType), [GiphyContentType.Gif, GiphyContentType.Text])
    await toggleSwitches([SETTINGS_CARD.dynamicText], [])
    await toggleSwitches([SETTINGS_CARD.suggestionsBar], [SETTINGS_CARD.suggestionsBar])
    await hideGPHDialogSettings()

    // Show GPH Dialog
    await showGPHDialog()
    await getGPHDialogSearchField().typeText(STABLE_SEARCH_TERMS.dynamicText)

    await waitFor(getSuggestionBar()).not.toBeVisible().withTimeout(5000)

    // Reload App
    await device.terminateApp()
    await device.launchApp()
  })

  /* ANDROID SPECIFIC */
  if (device.getPlatform() === 'android') {
    test('Checkered Background', async () => {
      for (const showCheckeredBg of [true, false]) {
        // Update settings
        await showGPHDialogSettings()
        await toggleSwitches(Object.values(GiphyContentType), [GiphyContentType.Sticker])
        await toggleSwitches(
          [SETTINGS_CARD.checkeredBackground],
          showCheckeredBg ? [SETTINGS_CARD.checkeredBackground] : []
        )
        await hideGPHDialogSettings()

        // Show GPH Dialog
        await showGPHDialog()
        await getGPHDialogSearchField().typeText(STABLE_SEARCH_TERMS.sticker)
        await waitFor(getGPHDialogMediaCell().atIndex(0)).toBeVisible()
        await expectToMatchImageSnapshot(device.takeScreenshot('Dialog'))

        // Reload App
        await device.terminateApp()
        await device.launchApp()
      }
    })

    test('Suggestions Bar', async () => {
      for (const showSuggestionsBar of [true, false]) {
        // Update settings
        await showGPHDialogSettings()
        await toggleSwitches([SETTINGS_CARD.suggestionsBar], showSuggestionsBar ? [SETTINGS_CARD.suggestionsBar] : [])
        await hideGPHDialogSettings()

        // Show GPH Dialog
        await showGPHDialog()
        if (showSuggestionsBar) {
          await waitFor(getSuggestionBar()).toBeVisible().withTimeout(5000)
        } else {
          await waitFor(getSuggestionBar()).not.toBeVisible().withTimeout(5000)
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
        await setTextFieldValue(SETTINGS_CARD.trayHeight, heightMultiplier)
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
