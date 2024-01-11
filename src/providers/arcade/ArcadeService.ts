import { Arcade } from "@/core/entity/Arcade";
import { ArcadeGateway } from "@/core/gateway/ArcadeGateway";
import { GameRepository } from "../game/GameRepository";
import { notEmpty } from "@/util/functions/notNull";
import { intTo3CharString, stringToUtf8ByteArray, utf8ByteArrayToString } from "@/util/auxiliarFunctions";

export class ArcadeService implements ArcadeGateway{

    readonly gameRepository: GameRepository
    readonly arcadeTimesSourceStartIndex = 0x202BB8
    readonly arcadeTimesSourceEndIndex = 0x2032BE

    constructor(
        gameRepository: GameRepository
    ){
        this.gameRepository = gameRepository
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
        const bytes = this.gameRepository.getExe()
        const arcadeTimesBytes = bytes.subarray(
            this.arcadeTimesSourceStartIndex, 
            this.arcadeTimesSourceEndIndex,
        )
        return utf8ByteArrayToString(arcadeTimesBytes)
    }

    private setArcadeTimesSourceString(arcadeTimesSourceString: string){
        const bytes = this.gameRepository.getExe()
        const arcadeTimesBytes = bytes.subarray(
            this.arcadeTimesSourceStartIndex, 
            this.arcadeTimesSourceEndIndex,
        )
        const newArcadeTimesBytes = stringToUtf8ByteArray(arcadeTimesSourceString)
        newArcadeTimesBytes.forEach((newArcadeTimeByte, index) => {
            arcadeTimesBytes[index] = newArcadeTimeByte
        })
    }

    private getArcadeStageTimesSourceStringByStageId(stageId: number): string {
        const arcadeTimesSourceString = this.getArcadeTimesSourceString()
        const arcadeStageTimesSourceStringStartIndex = arcadeTimesSourceString.indexOf(`L${stageId}`)
        const arcadeStageTimesSourceStringEndIndex = arcadeTimesSourceString.indexOf(`\r\n`, arcadeStageTimesSourceStringStartIndex)
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
            + arcadeTimesSourceString.slice(0, arcadeStageTimesSourceStringEndIndex);
        this.setArcadeTimesSourceString(newArcadeTimesSourceString)
    }

    private getArcadeStageBaseTimesByStageId(stageId: number): number[]{
        return this.getArcadeStageTimesSourceStringByStageId(stageId)
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