import { expectToMatchImageSnapshot, getGPHDialogSearchField, showGPHDialog, STABLE_SEARCH_TERMS } from './utils'

describe('Giphy Dialog', () => {
  beforeEach(async () => {
    await device.launchApp()
  })

  afterEach(async () => {
    await device.terminateApp()
  })

  it('should show the default dialog', async () => {
    await showGPHDialog()
    await getGPHDialogSearchField().typeText(STABLE_SEARCH_TERMS.gif)
    await expectToMatchImageSnapshot(device.takeScreenshot('Default Dialog'))
  })

  it('should be displayed a message if no gifs are found', async () => {
    await showGPHDialog()
    await getGPHDialogSearchField().typeText(STABLE_SEARCH_TERMS.noContent)
    await expectToMatchImageSnapshot(device.takeScreenshot('GIFs not found'))
  })
})
