import { stringToUtf8ByteArray, utf8ByteArrayToString } from "../util/auxiliarFunctions"
import ArcadeStageBaseTimes from "./ArcadeStageBaseTimes"

interface ArcadeBaseTimeProps{
    fileBytes: ArrayBuffer,
    updateFileBytes: (fileBytes: ArrayBuffer) => void
}

export function ArcadeBaseTimes(props: ArcadeBaseTimeProps){
    const {fileBytes, updateFileBytes} = props
    const bytes = new Uint8Array(fileBytes)
    const arcadeTimesIndex = 0x202BB8
    const arcadeTimesEndIndex = 0x2032BE
    const arcadeTimesBytes = bytes.subarray(arcadeTimesIndex, arcadeTimesEndIndex)
    const arcadeTimes = utf8ByteArrayToString(arcadeTimesBytes)
    const arcadeTimesStages = arcadeTimes.split("\r\n")

    function updateArcadeStageTimes(arcadeStageTimes: string, index: number) {
        arcadeTimesStages[index] = arcadeStageTimes
        const arcadeTimes = arcadeTimesStages.join("\r\n");
        const newArcadeTimesBytes = stringToUtf8ByteArray(arcadeTimes)
        newArcadeTimesBytes.forEach((newArcadeTimeByte, index) => {
            arcadeTimesBytes[index] = newArcadeTimeByte
        })
        updateFileBytes(fileBytes.slice(0))
    }
  
    return (<>
        <span className="text-lg font-bold">
            Arcade Base Times
        </span>
        <br/>
        {arcadeTimesStages.map((arcadeTimesStage, index) =>
            <>
                <span className="inline-block box-content bg-blue-800 h-7 text-white font-bold p-0.5 my-0.5">
                    <ArcadeStageBaseTimes
                        key={index}
                        arcadeStageTimesString={arcadeTimesStage}
                        updateArcadeStageTimesString={(arcadeStageTimesString: string) => {
                            updateArcadeStageTimes(arcadeStageTimesString, index)
                        }}
                    />
                </span>
                <br/>
            </>
        )}
        <br></br>
    </>)
}