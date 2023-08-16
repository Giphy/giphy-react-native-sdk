import { type TurboModule, TurboModuleRegistry } from 'react-native'
import type { UnsafeObject } from 'react-native/Libraries/Types/CodegenTypes'

export interface Spec extends TurboModule {
  configure(options: UnsafeObject): void

  show(): void

  hide(): void

  addListener: (eventType: string) => void

  removeListeners: (count: number) => void
}

export default TurboModuleRegistry.getEnforcing<Spec>('RTNGiphyDialogModule')
