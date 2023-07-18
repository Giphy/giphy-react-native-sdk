import type { TurboModule } from 'react-native'
import { TurboModuleRegistry } from 'react-native'
import { Int32, WithDefault } from 'react-native/Libraries/Types/CodegenTypes'

export interface Spec extends TurboModule {
  configure(
    apiKey: string,
    verificationMode?: WithDefault<boolean, false>,
    videoCacheMaxBytes?: WithDefault<Int32, null>
  ): void
}

export default TurboModuleRegistry.getEnforcing<Spec>('GiphySDKModule')
