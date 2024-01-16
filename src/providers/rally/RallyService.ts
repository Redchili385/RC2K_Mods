import { RallyGateway } from "@/core/gateway/RallyGateway"
import { GameRepository } from "../game/GameRepository"
import { Rally } from "@/core/entity/Rally"
import { notEmpty } from "@/util/function/notNull"

interface VanillaInfo {
    localeToken: string,
    vanillaStageIdDividedBy10: number
}

export class RallyService implements RallyGateway {

    readonly gameRepository: GameRepository

    constructor(gameRepository: GameRepository){
        this.gameRepository = gameRepository
    }

    getRallyById(id: number): Rally | null {
        const vanillaInfo = RallyService.getVanillaInfoById(id);
        if(vanillaInfo == null){
            return null;
        }
        const token = `tokRT_Champ${vanillaInfo.localeToken}`
        const stageIds = RallyService.getVanillaStageIdsFromVanillaStageIdDividedBy10(
            vanillaInfo.vanillaStageIdDividedBy10
        )
        const rallyName = this.gameRepository.getLocaleValueByToken(token)
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

    private static getVanillaInfoById(id: number): VanillaInfo | null {
        const vanillaInfoArr: VanillaInfo[] = [
            { localeToken: "One",   vanillaStageIdDividedBy10: 4},
            { localeToken: "Two",   vanillaStageIdDividedBy10: 6},
            { localeToken: "Three", vanillaStageIdDividedBy10: 3},
            { localeToken: "Four",  vanillaStageIdDividedBy10: 7},
            { localeToken: "Five",  vanillaStageIdDividedBy10: 5},
            { localeToken: "Six",   vanillaStageIdDividedBy10: 2},
        ]
        return vanillaInfoArr[id] ?? null
    }

    private static getVanillaStageIdsFromVanillaStageIdDividedBy10(vanillaStageIdDividedBy10: number): number[] {
        const vanillaFirstStageId = 10 * vanillaStageIdDividedBy10
        return [0, 1, 2, 3, 4, 5].map(stageIndex => vanillaFirstStageId + stageIndex + 1)
    }

}