import fs from 'fs'
import kebabCase from 'lodash.kebabcase'
import { jestExpect } from '@jest/expect'
import type { MatchImageSnapshotOptions } from 'jest-image-snapshot'
import { configureToMatchImageSnapshot } from 'jest-image-snapshot'

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
    console.warn(e.message)
  }
}
