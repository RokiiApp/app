import StringInput from "./StringInput"
import NumberInput from "./NumberInput"
import BooleanInput from "./BooleanInput"
import { SelectInput } from "./SelectInput"

type InputFabricProps<T = any> = {
    id: string
    value: T
    onChange: (value: T) => void
    options?: { value: string, label: string }[]
}

export function InputComponentFabric({ id, value, onChange, options }: InputFabricProps) {
    if (options) {
        return <SelectInput id={id} value={value} onChange={onChange} options={options} />
    }

    if (typeof value === "string") {
        return <StringInput id={id} value={value} onChange={onChange} />
    }

    if (typeof value === "number") {
        return <NumberInput id={id} value={value} onChange={onChange} />
    }

    if (typeof value === "boolean") {
        return <BooleanInput id={id} value={value} onChange={onChange} />
    }

    return null
}
