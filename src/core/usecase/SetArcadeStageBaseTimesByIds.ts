export interface SetArcadeStageBaseTimesByIdsInput {
    arcadeId: number,
    stageId: number,
    baseTimes: number[]
}

export interface SetArcadeStageBaseTimesByIds {
    invoke(input: SetArcadeStageBaseTimesByIdsInput): void
}

