import { ArcadeGateway } from "@/core/gateway/ArcadeGateway"
import { StageGateway } from "@/core/gateway/StageGateway"
import { GetArcadeStages } from "@/core/usecase/GetArcadeStages"
import { DefaultGetArcadeStages } from "@/core/usecase/implementation/DefaultGetArcadeStages"

describe("invoke", () => {

    it("should get the list of arcade stages with all the info from the providers", () => {
        //Given
        const arcadeGateway = {
            getArcades: jest.fn(() => [
                {id: 1, stageIds: [10, 11]},
                {id: 2, stageIds: [20, 21]}
            ]),
            getArcadeStageByIds: jest.fn((arcadeId: number, stageId: number) => ({
                arcadeId,
                stageId,
                baseTimes: [arcadeId + stageId]
            }))
        } as Pick<ArcadeGateway, "getArcades" | "getArcadeStageByIds"> as ArcadeGateway
        const stageGateway = {
            getStageById: jest.fn((id: number) => ({
                id,
                name: id.toString()
            }))
        } as Pick<StageGateway, "getStageById"> as StageGateway
        const getArcadeStages: GetArcadeStages = new DefaultGetArcadeStages(arcadeGateway, stageGateway)
        const expectedArcadeStages = [
            {arcadeId: 1, stageId: 10, name: "10", baseTimes: [11]},
            {arcadeId: 1, stageId: 11, name: "11", baseTimes: [12]},
            {arcadeId: 2, stageId: 20, name: "20", baseTimes: [22]},
            {arcadeId: 2, stageId: 21, name: "21", baseTimes: [23]},
        ]

        //When
        const arcadeStages = getArcadeStages.invoke().arcadeStages

        //Then
        expect(arcadeStages).toStrictEqual(expectedArcadeStages)
    })

    it("should exclude the arcade stages not found from the list", () => {
        //Given
        const arcadeGateway = {
            getArcades: jest.fn(() => [
                {id: 1, stageIds: [10, 11]},
                {id: 2, stageIds: [20, 21]}
            ]),
            getArcadeStageByIds: jest.fn(() => null)
        } as Pick<ArcadeGateway, "getArcades" | "getArcadeStageByIds"> as ArcadeGateway
        const stageGateway = {} as StageGateway
        const getArcadeStages: GetArcadeStages = new DefaultGetArcadeStages(arcadeGateway, stageGateway)
        const expectedArcadeStages: ArcadeStage[] = []
 
        //When
        const arcadeStages = getArcadeStages.invoke().arcadeStages
 
        //Then
        expect(arcadeStages).toStrictEqual(expectedArcadeStages)
    })

    it("should exclude the stages not found from the list", () => {
        //Given
        const arcadeGateway = {
            getArcades: jest.fn(() => [
                {id: 1, stageIds: [10, 11]},
                {id: 2, stageIds: [20, 21]}
            ]),
            getArcadeStageByIds: jest.fn((arcadeId: number, stageId: number) => ({
                arcadeId,
                stageId,
                baseTimes: [arcadeId + stageId]
            }))
        } as Pick<ArcadeGateway, "getArcades" | "getArcadeStageByIds"> as ArcadeGateway
        const stageGateway = {
            getStageById: jest.fn(() => null)
        } as Pick<StageGateway, "getStageById"> as StageGateway
        const getArcadeStages: GetArcadeStages = new DefaultGetArcadeStages(arcadeGateway, stageGateway)
        const expectedArcadeStages: ArcadeStage[] = []

        //When
        const arcadeStages = getArcadeStages.invoke().arcadeStages

        //Then
        expect(arcadeStages).toStrictEqual(expectedArcadeStages)
   })

})