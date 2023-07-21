import { type TurboModule, TurboModuleRegistry } from 'react-native'

export interface Spec extends TurboModule {
  muteAll(): void

  pauseAll(): void

  resume(): void
}

export default TurboModuleRegistry.getEnforcing<Spec>('RTNGiphyVideoManager')
