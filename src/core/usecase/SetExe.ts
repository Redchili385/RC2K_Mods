export interface SetExeInput{
    exe: Uint8Array
}

export interface SetExe{
    invoke(input: SetExeInput): void
}