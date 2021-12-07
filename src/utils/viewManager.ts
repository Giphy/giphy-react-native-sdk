import { UIManager } from 'react-native'

export type ViewManager = ReturnType<typeof UIManager['getViewManagerConfig']>

export function getViewManagerConfig(moduleName: string): ViewManager {
  if (UIManager.getViewManagerConfig) {
    // RN >= 0.58
    return UIManager.getViewManagerConfig(moduleName)
  }
  // RN < 0.58
  return (UIManager as any)[moduleName]
}

export type RunViewManagerCommandOptions<T = unknown> = {
  args?: T[]
  command: string
  moduleName: string
  nodeHandle: number | null
}

export function runViewManagerCommand<T = unknown>(options: RunViewManagerCommandOptions<T>) {
  const { args = [], command, moduleName, nodeHandle } = options
  if (!nodeHandle) {
    return null
  }

  const viewManagerConfig = getViewManagerConfig(moduleName)
  return UIManager.dispatchViewManagerCommand(nodeHandle, viewManagerConfig.Commands[command], args)
}
