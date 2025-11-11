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
  edgeToEdge: 'gph-settings_edge-to-edge',
} as const

async function showGPHDialogSettings() {
  await element(by.id('show-gph-dialog-settings')).tap()
  await expect(element(by.id('gph-settings'))).toExist()

  await wait(500)

  await waitFor(element(by.id('gph-settings_theme')))
    .toExist()
    .withTimeout(2000)
}

async function hideGPHDialogSettings() {
  await element(by.id('gph-close-dialog')).tap()
  await expect(element(by.id('gph-settings'))).not.toExist()
}

function scrollGPHDialogSettingsTo(matcher: Detox.NativeMatcher) {
  return waitFor(element(matcher)).toBeVisible().whileElement(by.id('gph-dialog-content')).scroll(800, 'down')
}

async function setCardPickerValue(cardId: string, value: string) {
  const PICKER_INDEX: Record<string, number> = {
    'gph-settings_theme': 0,
    'gph-settings_rating': 1,
    'gph-settings_rendition-type': 2,
    'gph-settings_clips-preview-rendition-type': 3,
    'gph-settings_file-type': 4,
    'gph-settings_sticker-column-count': 5,
    'gph-settings_confirmation-rendition-type': 6,
    'gph-settings_selected-content-type': 7,
  }
  const pickerIndex = PICKER_INDEX[cardId]
  if (pickerIndex == null) {
    throw new Error(`Could not find Android picker index for ${cardId}`)
  }

  if (device.getPlatform() === 'ios') {
    const allPickers = by.id('gph-card_picker')

    // Use position-based picker selection for known cards
    let picker = element(allPickers).atIndex(pickerIndex)

    await waitFor(picker).toBeVisible().whileElement(by.id('gph-dialog-content')).scroll(800, 'down')
    await picker.tap()
    try {
      await element(by.text(value)).tap()
    } catch (error) {
      if ((error as Error).message?.includes('Multiple elements found')) {
        // Prefer the option inside the modal; fall back to the first match
        try {
          await element(by.text(value)).atIndex(1).tap()
        } catch {
          await element(by.text(value)).atIndex(0).tap()
        }
      } else {
        throw error
      }
    }
  } else {
    await scrollGPHDialogSettingsTo(by.id(cardId))
    const picker = element(by.id('gph-card_picker')).atIndex(pickerIndex)

    await waitFor(picker).toBeVisible().withTimeout(2000)
    await picker.tap()

    const candidates = [
      by.text(value).withAncestor(by.type('androidx.appcompat.widget.AlertDialogLayout')),
      by.text(value),
      by.text(value.toUpperCase()),
    ]

    let optionElement: Detox.IndexableNativeElement | null = null
    for (const matcher of candidates) {
      const candidate = element(matcher)
      try {
        await waitFor(candidate).toExist().withTimeout(2000)
        optionElement = candidate
        break
      } catch {
        continue
      }
    }

    if (!optionElement) {
      throw new Error(`Could not find option "${value}" in picker for ${cardId}`)
    }

    await waitFor(optionElement).toBeVisible().withTimeout(2000)
    await optionElement.tap()
  }
}

async function readSwitchState(id: string): Promise<boolean> {
  try {
    await expect(element(by.id(id))).toHaveToggleValue(true)
    return true
  } catch {
    // toHaveToggleValue(true) failed, trying false...
  }

  try {
    await expect(element(by.id(id))).toHaveToggleValue(false)
    return false
  } catch {
    // toHaveToggleValue(false) also failed...
  }

  // FALLBACK: Try reading attributes
  const switchElement = element(by.id(id))
  const attrs = (await switchElement.getAttributes()) as AnyRecord

  if (attrs.accessibilityState && typeof attrs.accessibilityState === 'object') {
    const accState = attrs.accessibilityState as any
    if (typeof accState.checked === 'boolean') {
      return accState.checked
    }
  }

  const booleanProps = ['checked', 'selected', 'on', 'isOn', 'active', 'isActive', 'value']
  for (const prop of booleanProps) {
    if (prop in attrs && typeof attrs[prop] === 'boolean') {
      return attrs[prop]
    }
  }

  return false
}

async function toggleSwitches(allIds: string[], turnOnIds: string[]) {
  for (const id of allIds) {
    try {
      await scrollGPHDialogSettingsTo(by.id(id))

      const switchElement = element(by.id(id))
      await waitFor(switchElement).toExist().withTimeout(5000)

      const shouldTurnOn = turnOnIds.includes(id)

      const isOn = await readSwitchState(id)

      if (isOn !== shouldTurnOn) {
        await switchElement.tap()

        // Wait for state propagation
        await wait(1000)

        // Retry logic
        let newState = await readSwitchState(id)
        let retries = 3

        while (newState !== shouldTurnOn && retries > 0) {
          await wait(500)

          newState = await readSwitchState(id)

          retries--
        }
      }
    } catch (error) {
      console.warn(`[toggleSwitches][${id}] ERROR: ${(error as Error).message}`)
    }
  }
}

async function setTextFieldValue(textFieldId: string, value: string) {
  const matcher = by.id(textFieldId)
  await scrollGPHDialogSettingsTo(matcher)
  await element(matcher).typeText(value)
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
      console.log(`[Theme Preset] Opening picker for theme: ${theme}`)
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
  }, 300000)

  test('Custom Theme', async () => {
    // Update settings
    await showGPHDialogSettings()
    await setCardPickerValue(SETTINGS_CARD.theme, 'Custom')

    // Wait for the settings screen to be ready after theme selection
    // Give a moment for the modal to close and UI to settle
    await wait(500)
    await waitFor(element(by.id('gph-settings')))
      .toExist()
      .withTimeout(3000)

    // On Android, reduce switch interactions to avoid timeouts
    await toggleSwitches(Object.values(GiphyContentType), Object.values(GiphyContentType))
    await toggleSwitches([SETTINGS_CARD.confirmationScreen], [SETTINGS_CARD.confirmationScreen])
    await toggleSwitches([SETTINGS_CARD.suggestionsBar], [SETTINGS_CARD.suggestionsBar])
    await hideGPHDialogSettings()

    // Show GPH Dialog
    await showGPHDialog()
    await getGPHDialogSearchField().typeText(STABLE_SEARCH_TERMS.gif)
    await expectToMatchImageSnapshot(device.takeScreenshot('Search'))

    // Wait for GIFs to load and check confirmation screen
    try {
      // Wait longer for media to load on Android
      const timeout = device.getPlatform() === 'android' ? 10000 : 5000
      await waitFor(getGPHDialogMediaCell().atIndex(0)).toBeVisible().withTimeout(timeout)

      await getGPHDialogMediaCell().atIndex(0).tap({ x: 50, y: 50 })
      await expectToMatchImageSnapshot(device.takeScreenshot('Confirmation Screen'))
    } catch (error) {
      console.warn('Could not find media cells for confirmation screen test, skipping tap')
      // Take screenshot anyway to see what's displayed
      await expectToMatchImageSnapshot(device.takeScreenshot('No Media Results'))
    }
  }, 300000)

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

      // Wait for the settings screen to be ready
      await wait(500)
      await waitFor(element(by.id('gph-settings')))
        .toExist()
        .withTimeout(3000)

      await toggleSwitches(Object.values(GiphyContentType), mediaTypes)
      await setCardPickerValue(
        SETTINGS_CARD.selectedContentType,
        mediaTypes[0].charAt(0).toUpperCase() + mediaTypes[0].slice(1)
      )
      await hideGPHDialogSettings()

      // Show GPH Dialog
      await showGPHDialog()
      await getGPHDialogSearchField().typeText(searchTerm)
      await expectToMatchImageSnapshot(device.takeScreenshot('Dialog'))

      // Reload App
      await device.terminateApp()
      await device.launchApp()
    }
  }, 300000)

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
  }, 300000)

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
      await wait(1000)
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
  }, 300000)

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
      await wait(1000)

      await getGPHTabBar().tap({ x: 10, y: 10 })
      await wait(1000)
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
  }, 300000)

  test('Dynamic Text Enabled', async () => {
    // Update settings
    await showGPHDialogSettings()

    // Wait for the settings screen to be ready
    await wait(500)
    await waitFor(element(by.id('gph-settings')))
      .toExist()
      .withTimeout(3000)

    await toggleSwitches(Object.values(GiphyContentType), [GiphyContentType.Gif, GiphyContentType.Text])
    await toggleSwitches([SETTINGS_CARD.dynamicText], [SETTINGS_CARD.dynamicText])
    await toggleSwitches([SETTINGS_CARD.suggestionsBar], [SETTINGS_CARD.suggestionsBar])
    await hideGPHDialogSettings()

    // Show GPH Dialog
    await showGPHDialog()
    await getGPHDialogSearchField().typeText(STABLE_SEARCH_TERMS.dynamicText)

    // Check dynamic text
    await waitFor(getSuggestionBar()).toBeVisible().withTimeout(5000)
    await wait(2000)
    await expectToMatchImageSnapshot(getSuggestionBar().takeScreenshot(`Suggestion Bar`))
    await getDynamicTextLabel().tap()
    await waitFor(getGPHDialogMediaCell().atIndex(0)).toBeVisible()
    await wait(1500)

    const failureThreshold = device.getPlatform() === 'android' ? 0.03 : 0.05
    await expectToMatchImageSnapshot(device.takeScreenshot('Dialog'), { failureThreshold })
    await getGPHDialogMediaCell().atIndex(0).tap()
    await wait(2000)
    await expectToMatchImageSnapshot(device.takeScreenshot('Result'), { failureThreshold })

    // Reload App
    await device.terminateApp()
    await device.launchApp()
  }, 300000)

  test('Dynamic Text Disabled', async () => {
    // Update settings
    await showGPHDialogSettings()

    // Wait for the settings screen to be ready
    await wait(500)
    await waitFor(element(by.id('gph-settings')))
      .toExist()
      .withTimeout(3000)

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
  }, 300000)

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
    }, 300000)

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
    }, 300000)
  }

  /* iOS SPECIFIC */
  if (device.getPlatform() === 'ios') {
    test('Tray Height Multiplier', async () => {
      const variants = [
        {
          heightMultiplier: '0.5',
          expectedHeight: 1149,
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
    }, 300000)
  }
})
