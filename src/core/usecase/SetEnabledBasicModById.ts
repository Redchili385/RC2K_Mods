export interface SetEnabledBasicModByIdInput{
    id: string
    value: boolean
}

export interface SetEnabledBasicModById{
    invoke(input: SetEnabledBasicModByIdInput): void
}