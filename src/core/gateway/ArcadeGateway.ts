import { Arcade } from "../entity/Arcade";

export interface ArcadeGateway{

    getArcadeById(id: number): Arcade | null

    getArcades(): Arcade[]

    getArcadeStageByIds(arcadeId: number, stageId: number): ArcadeStage | null

    setArcadeBaseTimesByIds(arcadeId: number, stageId: number, arcadeStageBaseTimes: number[]): void

}