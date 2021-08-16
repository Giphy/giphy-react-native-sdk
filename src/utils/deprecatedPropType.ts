import type { Validator } from 'react'

import { noop } from './noop'

let warned: Record<string, boolean> = {}

type DeprecatedPropTypeOptions<T> = {
  propType?: Validator<T>
  explanation?: string
}

export default function deprecatedPropType<T = any>(options: DeprecatedPropTypeOptions<T> = {}): Validator<T> {
  const { propType = noop, explanation = '' } = options

  return ((props, propName, componentName, ...rest) => {
    if (process.env.NODE_ENV === 'production') {
      return () => null
    }

    if (props[propName] != null) {
      const message = `"${propName}" property of "${componentName}" has been deprecated. ${explanation}`
      if (!warned[message]) {
        console.warn(message)
        warned[message] = true
      }
    }

    return propType(props, propName, componentName, ...rest)
  }) as Validator<T>
}
