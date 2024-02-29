import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/main/components/ui/select"
import { InputComponentProps } from "./InputComponent"

type SelectInputProps = InputComponentProps<string> & {
    options: { value: string, label: string }[]
}

type SelectInputComponent = React.FC<SelectInputProps>

export const SelectInputComponent: SelectInputComponent = ({ value, options, onChange }) => {
    return <Select onValueChange={onChange} defaultValue={value}>
        <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
            {
                options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                        {option.label}
                    </SelectItem>
                ))
            }

        </SelectContent>
    </Select>
}

