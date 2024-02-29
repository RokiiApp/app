import { InputComponent } from "./InputComponent";

const NumberInput: InputComponent<number> = ({ id, value, onChange }) => {
    return <input id={id} type="number" value={value} onChange={(e) => onChange(+e.target.value)} />
}

export default NumberInput
