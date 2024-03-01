import type { InputComponent } from "./InputComponent"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/main/components/ui/select"
import { TitleLayout } from "./TitleLayout"

export const SelectInput: InputComponent<string> = ({ setting, onChange }) => {
    const { value, options, id, label, description } = setting

    return (
        <TitleLayout id={id} title={label} description={description}>
            <Select onValueChange={onChange} defaultValue={value}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                    {
                        options?.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))
                    }
                </SelectContent>
            </Select>
        </TitleLayout>
    )

}

