import fs from 'fs'
import kebabCase from 'lodash.kebabcase'
import { jestExpect } from '@jest/expect'
import { configureToMatchImageSnapshot } from 'jest-image-snapshot'
import type { MatchImageSnapshotOptions } from 'jest-image-snapshot'

const ERROR_MESSAGE = `
Image differences are saved in "e2e/__image_snapshots__/__diff_output__".
If the snapshot test does not work due to an intentional change in implementation, you can delete the old snapshot image from "e2e/__image_snapshots__" and rerun the tests.
`

const toMatchImageSnapshot = configureToMatchImageSnapshot({
  comparisonMethod: 'ssim',
  dumpDiffToConsole: false,
  dumpInlineDiffToConsole: false,
  failureThreshold: 0.01,
  failureThresholdType: 'percent',
  customSnapshotIdentifier: ({ currentTestName, counter }: Record<string, any>) =>
    // prettier-ignore
    `${kebabCase(`${currentTestName}-${counter}`)}.${require('detox').device.getPlatform()}`,
})
jestExpect.extend({ toMatchImageSnapshot })

export async function expectToMatchImageSnapshot(
  imagePath: string | Promise<string>,
  options?: MatchImageSnapshotOptions
) {
  const image = await fs.promises.readFile(await imagePath)

  try {
    ;(jestExpect(image) as any).toMatchImageSnapshot(options)
  } catch (e: any) {
    e.message += ERROR_MESSAGE
    throw e
  }
}
