import { ArcadeGateway } from "@/core/gateway/ArcadeGateway"
import { SetArcadeStageBaseTimesByIds, SetArcadeStageBaseTimesByIdsInput } from "@/core/usecase/SetArcadeStageBaseTimesByIds"
import { DefaultSetArcadeStageBaseTimesByIds } from "@/core/usecase/implementation/DefaultSetArcadeStageBaseTimesByIds"

describe("invoke", () => {

    it("should send the times to the arcade gateway with the stageId and arcadeId", () => {
        //Given
        const setArcadeBaseTimesByIdsSpy = jest.fn()
        const arcadeGateway = {
            setArcadeBaseTimesByIds: setArcadeBaseTimesByIdsSpy
        } as Pick<ArcadeGateway, "setArcadeBaseTimesByIds"> as ArcadeGateway
        const input: SetArcadeStageBaseTimesByIdsInput = {
            arcadeId: 1,
            stageId: 2,
            baseTimes: [1, 15, 74]
        }
        const setArcadeBaseTimesByIds: SetArcadeStageBaseTimesByIds = new DefaultSetArcadeStageBaseTimesByIds(
            arcadeGateway
        )
        
        //When
        setArcadeBaseTimesByIds.invoke(input)

        //Then
        expect(setArcadeBaseTimesByIdsSpy).toHaveBeenCalledWith(
            input.arcadeId,
            input.stageId,
            input.baseTimes,
        )
    })

})