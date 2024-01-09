import { RallyGateway } from "@/core/gateways/RallyGateway"
import { GameRepository } from "../game/GameRepository"
import { Rally } from "@/core/entity/Rally"
import { notEmpty } from "@/util/functions/notNull"

export class RallyService implements RallyGateway {

    readonly gameRepository: GameRepository

    constructor(gameRepository: GameRepository){
        this.gameRepository = gameRepository
    }

    getRallyById(id: number): Rally | null {
        const rallyLocaleId = RallyService.getRallyLocaleIdByRallyId(id);
        if(rallyLocaleId == null){
            return null;
        }
        const token = `tokRT_Champ${rallyLocaleId}`
        const rallyName = this.gameRepository.getLocaleValueByToken(token)
        const vanillaStageIds = RallyService.getVanillaStageIdsByRallyId(id)
        if(rallyName == null){
            return null;
        }
        return{
            id: id,
            name: rallyName,
            vanillaStageIds,
        }
    }

    getRallies(): Rally[] {
        return [0, 1, 2, 3, 4, 5].map(rallyId => this.getRallyById(rallyId)).filter(notEmpty)
    }

    private static getRallyLocaleIdByRallyId(id: number): string | null {
        const rallyIdToRallyLocaleId = ["One", "Two", "Three", "Four", "Five", "Six"]
        return rallyIdToRallyLocaleId[id] ?? null
    }

    private static getVanillaStageIdsByRallyId(id: number): number[]{
        return [0, 1, 2, 3, 4, 5].map(stageIndex => RallyService.getStageIdByChampionshipOrderIndex(
            id * 6 + stageIndex
        ))
    }

    private static getStageIdByChampionshipOrderIndex(championshipOrderIndex: number){
        const indexInRally = championshipOrderIndex % 6
        const rallyIndex = (championshipOrderIndex - indexInRally) / 6
        const rallyIdByIndex = [4, 6, 3, 7, 5, 2]
        return 10 * rallyIdByIndex[rallyIndex] + indexInRally + 1
    }

}