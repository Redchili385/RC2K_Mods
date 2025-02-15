import { Arcade } from "../entity/Arcade";
import { ArcadeStage } from "../entity/ArcadeStage";

export interface ArcadeGateway{

    getArcadeById(id: number): Arcade | null

    getArcades(): Arcade[]

    getArcadeStageByIds(arcadeId: number, stageId: number): ArcadeStage | null

    setArcadeBaseTimesByIds(arcadeId: number, stageId: number, arcadeStageBaseTimes: number[]): void

}
