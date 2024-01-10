export interface GetExeOutput{
    exe: Uint8Array
}

export interface GetExe{
    invoke(): GetExeOutput
}