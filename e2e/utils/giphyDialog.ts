const DIALOG_TIMEOUT = 30_000

export function getGPHDialogSearchField() {
  if (device.getPlatform() === 'ios') {
    return element(by.type('GiphyUISDK.GPHTextField'))
  }
  return element(by.type('androidx.appcompat.widget.AppCompatEditText'))
}

export async function showGPHDialog() {
  await element(by.id('show-gph-dialog')).tap()
  await waitFor(getGPHDialogSearchField())
    .toBeVisible()
    .withTimeout(DIALOG_TIMEOUT)
}
