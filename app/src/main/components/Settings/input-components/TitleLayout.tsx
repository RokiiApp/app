import { FC, PropsWithChildren } from "react"

type TitleLayoutProps = PropsWithChildren<{
    id: string,
    title: string,
    description?: string
}>

export const TitleLayout: FC<TitleLayoutProps> = ({ id, title, description, children }) => {
    return (
        <div>
            <label
                htmlFor={id}
                className="text-input block mb-2 text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
                {title}
            </label>
            {children}
            {
                description &&
                <p className="mt-1 text-sm text-input-autocomplete">{description}</p>
            }
        </div>
    )

}
