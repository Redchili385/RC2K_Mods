import { localeStageNames } from "./data/localeStageNames";

export interface Rally{
    index: number,
    name: string,
    arcadeNumber: number,
    stages: Stage[],
}

export interface Arcade{
    index: number
    number: number
    stages: Stage[]
}

export interface Stage{
    id: number,
    championshipOrderIndex: number,
    indexInRally: number,
    name: string,
}

export default class StageService{

    readonly rallies: Rally[];
    readonly arcades: Arcade[];
    readonly stageById: Map<number, Stage>;

    constructor(){
        this.rallies = localeStageNames.split("; ").slice(1).map((localeRallyStageNames, index) => 
            StageService.localeRallyStageNamesToRally(localeRallyStageNames, index)
        )
        this.arcades = this.rallies.reduceRight((arcades, rally, index) => {
            arcades.push({
                index,
                number: index + 1,
                stages: rally.stages,
            })
            return arcades
        }, [] as Arcade[])
        this.stageById = StageService.getStagesByIdMapByRallies(this.rallies)
    }

    getStageById(id: number): Stage | null{
        return this.stageById.get(id) ?? null
    }

    private static localeRallyStageNamesToRally(localeRallyStageNames: string, index: number): Rally{
        const [name, stageNameLines] = localeRallyStageNames.split("\n\n")
        const stages = stageNameLines.split("\n").map((stageNameLine, indexInRally) => 
            StageService.localeStageNameLineToStage(stageNameLine, indexInRally)
        )
        const arcadeNumber = 6 - index
        return{
            index,
            name,
            arcadeNumber,
            stages
        }
    }

    private static localeStageNameLineToStage(localeStageNameLine: string, indexInRally: number): Stage{
        const [key, name] = localeStageNameLine.split("		")
        const championshipOrderIndex = parseInt(key.slice(-3))
        const id = StageService.getStageIdByChampionshipOrderIndex(championshipOrderIndex)
        return {
            id,
            championshipOrderIndex,
            indexInRally,
            name
        }
    }

    private static getStageIdByChampionshipOrderIndex(championshipOrderIndex: number){
        const indexInRally = championshipOrderIndex%6
        const rallyIndex = (championshipOrderIndex - indexInRally) / 6
        const rallyIdByIndex = [4, 6, 3, 7, 5, 2]
        return 10 * rallyIdByIndex[rallyIndex] + indexInRally + 1
    }

    private static getStagesByIdMapByRallies(rallies: Rally[]){
        const stageById = new Map<number, Stage>()
        const stages = rallies.flatMap(rally => rally.stages)
        stages.forEach(stage => {
            stageById.set(stage.id, stage)
        })
        return stageById
    }

}