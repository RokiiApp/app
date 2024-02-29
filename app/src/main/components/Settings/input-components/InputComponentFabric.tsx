import StringInput from "./StringInput"
import NumberInput from "./NumberInput"
import BooleanInput from "./BooleanInput"

type InputFabricProps<T = any> = {
    id: string
    value: T
    onChange: (value: T) => void
}

export function InputComponentFabric({ id, value, onChange }: InputFabricProps) {
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
