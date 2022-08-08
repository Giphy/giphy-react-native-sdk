describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp()
  })

  beforeEach(async () => {
    await device.reloadReactNative()
  })

  it('should have default screen', async () => {
    await expect(element(by.id('app'))).toBeVisible()
  })
})
