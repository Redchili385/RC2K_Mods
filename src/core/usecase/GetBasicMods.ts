export interface BasicModDTO {
    id: string,
    isEnabled: boolean,
}

export interface GetBasicModsOutput{
    basicMods: BasicModDTO[]
}

export interface GetBasicMods{
    invoke(): GetBasicModsOutput
}