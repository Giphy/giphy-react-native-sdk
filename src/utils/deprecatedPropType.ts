import type { Validator } from 'prop-types'

let warned: Record<string, boolean> = {}

type DeprecatedPropTypeOptions<T> = {
  propType?: Validator<T>
  explanation?: string
}

const noopValidator: Validator<any> = () => null

export default function deprecatedPropType<T = any>(options: DeprecatedPropTypeOptions<T> = {}): Validator<T> {
  const { propType = noopValidator, explanation = '' } = options

  return ((props: any, propName: string, componentName: string, location?: string, propFullName?: string) => {
    if (process.env.NODE_ENV === 'production') {
      return null
    }

    if (props[propName] != null) {
      const message = `"${propName}" property of "${componentName}" has been deprecated. ${explanation}`
      if (!warned[message]) {
        console.warn(message)
        warned[message] = true
      }
    }

    return propType(props, propName, componentName, location || '', propFullName || '')
  }) as Validator<T>
}
