import { InputComponent } from "./InputComponent";

const StringInput: InputComponent<string> = ({ id, value, onChange }) => {
    return <input id={id} type="text" value={value} onChange={(e) => onChange(e.target.value)} />
}

export default StringInput
