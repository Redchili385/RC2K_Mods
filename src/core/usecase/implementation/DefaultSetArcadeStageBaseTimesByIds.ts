import { ArcadeGateway } from "@/core/gateway/ArcadeGateway";
import { SetArcadeStageBaseTimesByIds, SetArcadeStageBaseTimesByIdsInput } from "../SetArcadeStageBaseTimesByIds";

export class DefaultSetArcadeStageBaseTimesByIds implements SetArcadeStageBaseTimesByIds{

    readonly arcadeGateway: ArcadeGateway

    constructor(
        arcadeGateway: ArcadeGateway
    ){
        this.arcadeGateway = arcadeGateway
    }

    invoke(input: SetArcadeStageBaseTimesByIdsInput): void {
        this.arcadeGateway.setArcadeBaseTimesByIds(
            input.arcadeId,
            input.stageId,
            input.baseTimes,
        )
    }
    
}