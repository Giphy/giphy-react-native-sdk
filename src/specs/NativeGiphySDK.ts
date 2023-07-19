import { type TurboModule, TurboModuleRegistry } from 'react-native'
import type { Int32 } from 'react-native/Libraries/Types/CodegenTypes'

export interface Spec extends TurboModule {
  configure(apiKey: string, verificationMode: boolean, videoCacheMaxBytes: Int32): void
}

export default TurboModuleRegistry.getEnforcing<Spec>('RTNGiphySDKModule')
