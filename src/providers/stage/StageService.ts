import { Stage } from "@/core/entity/Stage";
import { StageGateway } from "@/core/gateway/StageGateway";
import { GameRepository } from "../game/GameRepository";
import { intTo3CharString } from "@/util/auxiliarFunctions";

export class StageService implements StageGateway {

    readonly gameRepository: GameRepository

    constructor(
        gameRepository: GameRepository,
    ){
        this.gameRepository = gameRepository
    }

    getStages(): Stage[] {
        const numberOfStages = 36
        const stages: Stage[] = []
        for(let localeStageNumber = 0; localeStageNumber < numberOfStages; localeStageNumber++){
            const id = StageService.getIdByLocaleStageNumber(localeStageNumber);
            if(id == null){
                continue;
            }
            const stage = this.getStageById(id)
            if(stage == null){
                continue;
            }
            stages.push(stage);
        }
        return stages;
    }

    getStageById(id: number): Stage | null {
        const localeStageNumber = StageService.getLocaleStageNumberById(id)
        if(localeStageNumber == null){
            return null;
        }
        const token = `tokSS_Stage${intTo3CharString(localeStageNumber)}`
        const stageName = this.gameRepository.getLocaleValueByToken(token)
        if(stageName == null){
            return null
        }
        return {
            id,
            name: stageName,
        }
    }

    private getStageByLocaleStageNumber(localeStageNumber: number): Stage | null {
        const id = StageService.getIdByLocaleStageNumber(localeStageNumber)
        if(id == null){
            return null;
        }
        const token = `tokSS_Stage${intTo3CharString(localeStageNumber)}`
        const stageName = this.gameRepository.getLocaleValueByToken(token)
        if(stageName == null){
            return null
        }
        return {
            id,
            name: stageName,
        }
    }

    private static getLocaleStageNumberById(stageId: number): number | null {
        const idDividedBy10 = Math.floor(stageId/10)
        const vanillaRallyStageIndex = (stageId % 10) - 1
        if(vanillaRallyStageIndex >= 6){
            return null
        }
        const vanillaRallyIndexByIdDividedBy10 = [undefined, undefined, 5, 2, 0, 4, 1, 3]
        const vanillaRallyIndex = vanillaRallyIndexByIdDividedBy10[idDividedBy10]
        if(vanillaRallyIndex == null){
            return null
        }
        return vanillaRallyIndex * 6 + vanillaRallyStageIndex
    }
    
    private static getIdByLocaleStageNumber(localeStageNumber: number): number | null {
        const indexInRally = localeStageNumber % 6
        const vanillaRallyIndex = (localeStageNumber - indexInRally) / 6
        const rallyIdByVanillaRallyIndex = [4, 6, 3, 7, 5, 2]
        return 10 * rallyIdByVanillaRallyIndex[vanillaRallyIndex] + indexInRally+ 1
    }

}