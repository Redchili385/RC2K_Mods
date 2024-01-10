export interface ArcadeStageDTO{
    arcadeId: number,
    stageId: number,
    name: string,
    baseTimes: number[]
}

export interface GetArcadeStagesOutput{
    arcadeStages: ArcadeStageDTO[]
}

export interface GetArcadeStages{
    invoke(): GetArcadeStagesOutput
}