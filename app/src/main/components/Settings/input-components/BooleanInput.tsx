import { InputComponent } from "./InputComponent";
import { Checkbox } from "@/main/components/ui/checkbox"

const BooleanInput: InputComponent<boolean> = ({ id, value, onChange }) => {
    return <Checkbox id={id} onCheckedChange={onChange} checked={value} />
}

export default BooleanInput
