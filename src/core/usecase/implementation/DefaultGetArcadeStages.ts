import { ArcadeGateway } from "@/core/gateway/ArcadeGateway";
import { ArcadeStageDTO, GetArcadeStages, GetArcadeStagesOutput } from "../GetArcadeStages";
import { StageGateway } from "@/core/gateway/StageGateway";

export class DefaultGetArcadeStages implements GetArcadeStages{

    readonly arcadeGateway: ArcadeGateway
    readonly stageGateway: StageGateway

    constructor(
        arcadeGateway: ArcadeGateway,
        stageGateway: StageGateway
    ){
        this.arcadeGateway = arcadeGateway
        this.stageGateway = stageGateway
    }

    invoke(): GetArcadeStagesOutput {
        const arcades = this.arcadeGateway.getArcades()
        const arcadeStageDTOs: ArcadeStageDTO[] = []
        arcades.forEach(arcade => {
            arcade.stageIds.forEach(stageId => {
                const arcadeStage = this.arcadeGateway.getArcadeStageByIds(arcade.id, stageId)
                if(arcadeStage == null){
                    return;
                }
                const stage = this.stageGateway.getStageById(stageId)
                if(stage == null){
                    return;
                }
                const baseTimes = arcadeStage.baseTimes
                arcadeStageDTOs.push({
                    arcadeId: arcade.id,
                    stageId,
                    baseTimes,
                    name: stage.name
                })
            })
        })
        return {
            arcadeStages: arcadeStageDTOs
        }
    }
    
}