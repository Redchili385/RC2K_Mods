import { useContext } from "react"
import { intTo3CharString } from "../util/auxiliarFunctions"
import { GameContext } from "@/context/GameContext"

interface ArcadeStageBaseTimeProps{
    arcadeStageTimesString: string,
    updateArcadeStageTimesString: (arcadeStageTimesString: string) => void
}

export default function ArcadeStageBaseTimes(props: ArcadeStageBaseTimeProps){
    const {arcadeStageTimesString, updateArcadeStageTimesString } = props
    const arcadeStageComponents = arcadeStageTimesString.split(" ")
    const arcadeStageLevelString = arcadeStageComponents[0]
    const stageId = parseInt(arcadeStageLevelString.slice(-2))
    const arcadeStageTimes = arcadeStageComponents.slice(1)
    const gameContext = useContext(GameContext)
    const stageService = gameContext.stageService
    const stageName = stageService.getStageById(stageId)?.name ?? ""
  
    function updateTime(timeString: string, index: number){
        const time = parseInt(timeString)
        if(isNaN(time) || time < 0){
            return;
        }
        arcadeStageTimes[index] = intTo3CharString(time)
        const newArcadeStageTimesString = [arcadeStageLevelString].concat(arcadeStageTimes).join(" ") 
        updateArcadeStageTimesString(newArcadeStageTimesString)
    }

    return (<>
        <span className="inline-block h-full px-2">
            {stageName}
        </span>
        {arcadeStageTimes.map((arcadeTimesStage, index) => 
            <input
                className="w-12 bg-green-300 border-r-4 border-l-4 border-blue-800 text-center text-black"
                key={index} 
                size={3}
                type="number"
                value={arcadeTimesStage} 
                onChange={(e) => updateTime(e.target.value, index)} 
            />
        )}
        <br></br>
    </>)
}