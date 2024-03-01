import { InputComponent } from "./InputComponent";
import { TitleLayout } from "./TitleLayout";

const NumberInput: InputComponent<number> = ({ setting, onChange }) => {
    const { id, value, label, description } = setting
    return (
        <TitleLayout id={id} title={label} description={description}>
            <input id={id} type="number" value={value} onChange={(e) => onChange(+e.target.value)} />
        </TitleLayout>
    )
}

export default NumberInput
