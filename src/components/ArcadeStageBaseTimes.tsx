import { useState } from "react"
import { useCoreContext } from "@/context/CoreContext"
import { ArcadeStageDTO } from "@/core/usecase/GetArcadeStages"

interface ArcadeStageBaseTimeProps{
    arcadeStage: ArcadeStageDTO
}

export default function ArcadeStageBaseTimes(props: ArcadeStageBaseTimeProps){
    const { arcadeStage } = props
    const { setArcadeStageBaseTimesByIds } = useCoreContext()
    const [baseTimes, setBaseTimes] = useState<number[]>(arcadeStage.baseTimes)

    const stageName = arcadeStage.name
  
    function updateTime(index: number, newTimeString: string){
        const newTime = parseInt(newTimeString)
        if(isNaN(newTime) || newTime < 0){
            return;
        }
        const newBaseTimes = baseTimes.slice()
        newBaseTimes[index] = newTime
        setArcadeStageBaseTimesByIds.invoke({
            arcadeId: arcadeStage.arcadeId,
            stageId: arcadeStage.stageId,
            baseTimes: newBaseTimes
        })
        setBaseTimes(newBaseTimes)
    }

    return (<>
        <span className="inline-block box-content h-full px-2 w-36">
            {stageName}
        </span>
        {baseTimes.map((baseTime, index) => 
            <input
                className="w-12 bg-green-300 border-r-4 border-l-4 border-blue-800 text-center text-black"
                key={index} 
                size={3}
                type="number"
                value={baseTime} 
                onChange={(e) => updateTime(index, e.target.value)} 
            />
        )}
        <br></br>
    </>)
}