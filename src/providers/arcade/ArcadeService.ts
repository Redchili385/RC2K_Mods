import { Arcade } from "@/core/entity/Arcade";
import { ArcadeGateway } from "@/core/gateway/ArcadeGateway";
import { GameRepository } from "../game/GameRepository";
import { notEmpty } from "@/util/function/notNull";
import { intTo3CharString } from "@/util/function/intTo3CharString";

export interface ArcadeServiceInput{
    gameRepository: GameRepository
    arcadeTimesSourceStartIndex: number
    arcadeTimesSourceEndIndex: number
}

export class ArcadeService implements ArcadeGateway{

    readonly gameRepository: GameRepository
    readonly arcadeTimesSourceStartIndex/// = 0x202BB8
    readonly arcadeTimesSourceEndIndex //= 0x2032BE

    constructor(input: ArcadeServiceInput){
        this.gameRepository = input.gameRepository
        this.arcadeTimesSourceStartIndex = input.arcadeTimesSourceStartIndex
        this.arcadeTimesSourceEndIndex = input.arcadeTimesSourceEndIndex
    }

    getArcadeById(id: number): Arcade | null {
        const stageIds = ArcadeService.getVanillaStageIdsById(id)
        if(stageIds == null){
            return null;
        }
        return {
            id,
            stageIds
        }
    }

    getArcades(): Arcade[] {
        return [1, 2, 3, 4, 5, 6].map(id => this.getArcadeById(id)).filter(notEmpty)
    }

    getArcadeStageByIds(arcadeId: number, stageId: number): ArcadeStage | null {
        const baseTimes = this.getArcadeStageBaseTimesByStageId(stageId)
        if(baseTimes == null){
            return null;
        }
        return{
            arcadeId,
            stageId,
            baseTimes,
        }
    }

    setArcadeBaseTimesByIds(arcadeId: number, stageId: number, arcadeStageBaseTimes: number[]): void {
        this.setArcadeStageBaseTimesByStageId(stageId, arcadeStageBaseTimes);
    }

    private static getVanillaStageIdsById(id: number): number[] | null {
        const vanillaStageIdDividedBy10ById = [undefined, 2, 5, 7, 3, 6, 4]
        const vanillaStageIdDividedBy10 = vanillaStageIdDividedBy10ById[id]
        if(vanillaStageIdDividedBy10 == null){
            return null
        }
        const vanillaFirstStageId = 10 * vanillaStageIdDividedBy10
        return [0, 1, 2, 3, 4, 5].map(stageIndex => vanillaFirstStageId + stageIndex + 1)
    }

    private getArcadeTimesSourceString(): string {
        return this.gameRepository.getStringFromExe(
            this.arcadeTimesSourceStartIndex,
            this.arcadeTimesSourceEndIndex - this.arcadeTimesSourceStartIndex
        )
    }

    private setArcadeTimesSourceString(arcadeTimesSourceString: string){
        this.gameRepository.setStringOnExe(
            this.arcadeTimesSourceStartIndex,
            arcadeTimesSourceString
        )
    }

    private getArcadeStageTimesSourceStringByStageId(stageId: number): string | null {
        const arcadeTimesSourceString = this.getArcadeTimesSourceString()
        const arcadeStageTimesSourceStringStartIndex = arcadeTimesSourceString.indexOf(`L${stageId}`)
        if(arcadeStageTimesSourceStringStartIndex == -1){
            return null;
        }
        const nextNewLineIndex = arcadeTimesSourceString.indexOf(`\r\n`, arcadeStageTimesSourceStringStartIndex)
        const arcadeStageTimesSourceStringEndIndex = nextNewLineIndex == -1 
            ? arcadeTimesSourceString.length
            : nextNewLineIndex
        return arcadeTimesSourceString.slice(
            arcadeStageTimesSourceStringStartIndex,
            arcadeStageTimesSourceStringEndIndex
        )
    }

    private setArcadeStageTimesSourceStringByStageId(stageId: number, arcadeStageTimesSourceString: string){
        const arcadeTimesSourceString = this.getArcadeTimesSourceString()
        const arcadeStageTimesSourceStringStartIndex = arcadeTimesSourceString.indexOf(`L${stageId}`)
        const arcadeStageTimesSourceStringEndIndex = arcadeStageTimesSourceStringStartIndex 
            + arcadeStageTimesSourceString.length
        const newArcadeTimesSourceString = arcadeTimesSourceString.slice(0, arcadeStageTimesSourceStringStartIndex) 
            + arcadeStageTimesSourceString
            + arcadeTimesSourceString.slice(arcadeStageTimesSourceStringEndIndex);
        this.setArcadeTimesSourceString(newArcadeTimesSourceString)
    }

    private getArcadeStageBaseTimesByStageId(stageId: number): number[] | null{
        const arcadeStageTimesSourceString = this.getArcadeStageTimesSourceStringByStageId(stageId)
        if(arcadeStageTimesSourceString == null){
            return null
        }
        return arcadeStageTimesSourceString
            .split(" ")
            .slice(1)
            .map(stringTime => parseInt(stringTime))
    }

    private setArcadeStageBaseTimesByStageId(stageId: number, arcadeStageBaseTimes: number[]){
        this.setArcadeStageTimesSourceStringByStageId(stageId, `L${stageId} ${arcadeStageBaseTimes
            .map(arcadeStageBaseTime => intTo3CharString(arcadeStageBaseTime))
            .join(" ")
        }`)
    }

}