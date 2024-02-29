export type InputComponentProps<T = any> = {
    id: string
    value: T
    onChange: (value: T) => void
}

export type InputComponent<T> = React.FC<InputComponentProps<T>>
