import { Stage } from "@/core/entity/Stage";
import { StageGateway } from "@/core/gateways/StageGateway";
import { GameRepository } from "../game/GameRepository";
import { intTo3CharString } from "@/util/auxiliarFunctions";

export class StageService implements StageGateway {

    readonly gameRepository: GameRepository

    constructor(gameRepository: GameRepository){
        this.gameRepository = gameRepository
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

    private static getLocaleStageNumberById(id: number): number | null {
        const idDividedBy10 = Math.floor(id/10)
        const vanillaRallyStageIndex = (id % 10) - 1
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

}