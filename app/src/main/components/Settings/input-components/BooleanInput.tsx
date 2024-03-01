import { InputComponent } from "./InputComponent";
import { Checkbox } from "@/main/components/ui/checkbox"

const BooleanInput: InputComponent<boolean> = ({ setting, onChange }) => {
    const { label, id, description, value } = setting

    return (
        <div className="items-top flex space-x-2">
            <Checkbox id={id} onCheckedChange={onChange} checked={value} />

            <div className="grid gap-1.5 leading-none">
                <label
                    htmlFor={id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    {label}
                </label>
                {
                    description &&
                    <p className="text-sm text-muted-foreground">
                        {description}
                    </p>
                }
            </div>
        </div>
    )
}

export default BooleanInput
