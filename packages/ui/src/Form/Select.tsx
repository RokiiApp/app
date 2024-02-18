import ReactSelect, { MultiValue, SingleValue } from 'react-select'
import Creatable from 'react-select/creatable'
import { Wrapper } from './Wrapper'

interface Option {
  value: string
  label: string
}

type ConditionalProps = {
  multi?: false
  onChange: (newValue: SingleValue<Option>) => void
} | {
  multi: true
  onChange: (newValue: MultiValue<Option>) => void
}

type SelectProps = ConditionalProps & {
  label?: string
  value?: Option
  description?: string
  options: readonly Option[] | Option[]
  clearable?: boolean
  creatable?: boolean
}

export const Select = ({ label, value, onChange, description, options, multi, clearable, creatable }: SelectProps) => {
  const Component = creatable ? Creatable : ReactSelect
  return (
    <Wrapper label={label} description={description}>
      <Component
      styles={{
        singleValue: (provided) => ({
          ...provided,
          color: 'var(--preview-input-color)'
        }),
        control: (provided) => ({
          ...provided,
          backgroundColor: 'var(--preview-input-background)',
          color: 'var(--main-font-color)'
        }),
        option: (provided, state) => ({
          ...provided,
          backgroundColor: state.isFocused ? 'var(--selected-result-background)' : 'var(--preview-input-background)',
          color: 'var(--preview-input-color)'
        })
      }}
        className=''
        isMulti={multi}
        value={value}
        isClearable={clearable}
        options={options}
        onChange={(newValue) => {
          if (multi) {
            onChange(newValue as MultiValue<Option>)
          } else {
            if (newValue == null) return
            onChange(newValue as SingleValue<Option>)
          }
        }}
      />
    </Wrapper>
  )
}
