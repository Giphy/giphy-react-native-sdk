import { expectToMatchImageSnapshot, STABLE_SEARCH_TERMS, wait } from './utils'

function getGPHGridView() {
  return element(by.id('gph-grid-view'))
}

function getGPHGridSearchInput() {
  return element(by.id('gph-grid_search-input'))
}

async function showGiphyGrid() {
  await element(by.id('gph-grid_search-stub')).tap()
  await waitFor(getGPHGridView()).toExist().withTimeout(5000)
  // Give a moment for the modal animation to complete
  await wait(500)
}

async function hideGiphyGrid() {
  await element(by.id('gph-close-dialog')).tap()
  await expect(getGPHGridView()).not.toBeVisible()
}

describe('Giphy Grid View', () => {
  beforeAll(async () => {
    await device.launchApp()
  })

  beforeEach(async () => {
    await device.reloadReactNative()
  })

  test('should select a gif from the search results', async () => {
    await showGiphyGrid()
    wait(1000)
    await expectToMatchImageSnapshot(device.takeScreenshot('Default'))

    // Search sticker
    await getGPHGridSearchInput().replaceText(STABLE_SEARCH_TERMS.sticker)
    await getGPHGridSearchInput().tapReturnKey()
    wait(1000)
    await expectToMatchImageSnapshot(device.takeScreenshot('Search Result'), {
      failureThreshold: 0.03,
    })

    // Select sticker
    await getGPHGridView().tap({ x: 50, y: 50 })
    await expect(getGPHGridView()).not.toBeVisible()
    await expectToMatchImageSnapshot(device.takeScreenshot('Sticker'), {
      failureThreshold: 0.03,
    })
  })

  it('should be displayed a message if no gifs are found', async () => {
    await showGiphyGrid()
    await expectToMatchImageSnapshot(device.takeScreenshot('Default'))

    // Search stickers
    await getGPHGridSearchInput().replaceText(STABLE_SEARCH_TERMS.noContent)
    await getGPHGridSearchInput().tapReturnKey()
    await expectToMatchImageSnapshot(device.takeScreenshot('Search Result'))

    // Hide Grid
    await hideGiphyGrid()
    await expectToMatchImageSnapshot(device.takeScreenshot('Main Screen'))
  })
})
