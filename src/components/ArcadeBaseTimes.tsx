import { useCoreContext } from "@/context/CoreContext"
import ArcadeStageBaseTimes from "./ArcadeStageBaseTimes"
import React from "react"

export function ArcadeBaseTimes(){
    const { getArcadeStages } = useCoreContext()
    const arcadeStages = getArcadeStages.invoke().arcadeStages
    console.log(arcadeStages)
  
    return (<>
        {arcadeStages.map((arcadeStage, index) =>
            <React.Fragment key={index}>
                <span className="inline-block box-content bg-blue-800 h-7 text-white font-bold p-0.5 my-0.5">
                    <ArcadeStageBaseTimes
                        arcadeStage={arcadeStage}
                    />
                </span>
                <br/>
            </React.Fragment>
        )}
    </>)
}