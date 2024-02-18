import { FormComponents } from '@rokii/ui'

const { Checkbox, Select, Text } = FormComponents

const components = {
  bool: Checkbox,
  option: Select
}

interface Props {
  type: keyof typeof components
  value: any
  options: any[]
}

export const FormItem = ({ type, value, options, ...props }: Props) => {
  const Component = components[type] || Text

  let actualValue = value
  if (Component === Select) {
    // when the value is a string, we need to find the option that matches it
    if (typeof value === 'string' && options) {
      actualValue = options.find((option) => option.value === value)
    }
  }

  return (
    // @ts-expect-error Not all components have type as a prop
    // TODO: fix this
    <Component type={type} value={actualValue} options={options} {...props} />
  )
}
