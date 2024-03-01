import { InputComponent } from "./InputComponent";
import { TitleLayout } from "./TitleLayout";

const StringInput: InputComponent<string> = ({ setting, onChange }) => {
    const { id, value, description, label } = setting
    return (
        <TitleLayout id={id} title={label} description={description}>
            <input
                id={id} type="text" value={value} onChange={(e) => onChange(e.target.value)}
                className={`
                    w-full text-base leading-8 px-2
                    rounded border border-[var(--border-color)]
                `}
            />
        </TitleLayout>
    )
}

export default StringInput
