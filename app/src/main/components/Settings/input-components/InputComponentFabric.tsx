import StringInput from "./StringInput"
import NumberInput from "./NumberInput"
import BooleanInput from "./BooleanInput"
import { SelectInput } from "./SelectInput"
import { StoredSetting } from "@/stores/extension-settings"
import { InputComponent } from "./InputComponent"

type InputFabricProps<T = any> = {
    setting: StoredSetting<T>
    onChange: (value: T) => void
}

const ComponentTypes = {
    string: StringInput,
    number: NumberInput,
    boolean: BooleanInput
} as const;

const isValidComponentType = (type: string): type is keyof typeof ComponentTypes => {
    return type in ComponentTypes
}

export function InputComponentFabric({ setting, onChange }: InputFabricProps) {
    const { value, options } = setting

    if (options) {
        return <SelectInput setting={setting} onChange={onChange} />
    }

    const componentType = typeof value

    if (isValidComponentType(componentType)) {
        const GenericInput = ComponentTypes[componentType] as InputComponent<any>

        return <GenericInput setting={setting} onChange={onChange} />
    }

    return null
}
