import { RallyGateway } from "@/core/gateway/RallyGateway"
import { GameRepository } from "../game/GameRepository"
import { Rally } from "@/core/entity/Rally"
import { notEmpty } from "@/util/functions/notNull"

export class RallyService implements RallyGateway {

    readonly gameRepository: GameRepository

    constructor(gameRepository: GameRepository){
        this.gameRepository = gameRepository
    }

    getRallyById(id: number): Rally | null {
        const rallyLocaleId = RallyService.getRallyLocaleIdById(id);
        if(rallyLocaleId == null){
            return null;
        }
        const token = `tokRT_Champ${rallyLocaleId}`
        const rallyName = this.gameRepository.getLocaleValueByToken(token)
        const stageIds = RallyService.getVanillaStageIdsById(id)
        if(stageIds == null){
            return null;
        }
        if(rallyName == null){
            return null;
        }
        return{
            id: id,
            name: rallyName,
            stageIds,
        }
    }

    getRallies(): Rally[] {
        return [0, 1, 2, 3, 4, 5].map(rallyId => this.getRallyById(rallyId)).filter(notEmpty)
    }

    private static getRallyLocaleIdById(id: number): string | null {
        const rallyLocaleIdById = ["One", "Two", "Three", "Four", "Five", "Six"]
        return rallyLocaleIdById[id] ?? null
    }

    private static getVanillaStageIdsById(id: number): number[] | null{
        const vanillaStageIdDividedBy10ById = [4, 6, 3, 7, 5, 2]
        const vanillaStageIdDividedBy10 = vanillaStageIdDividedBy10ById[id]
        if(vanillaStageIdDividedBy10 == null){
            return null
        }
        const vanillaFirstStageId = 10 * vanillaStageIdDividedBy10
        return [0, 1, 2, 3, 4, 5].map(stageIndex => vanillaFirstStageId + stageIndex)
    }

}