import { Arcade } from "@/core/entity/Arcade"
import { ArcadeGateway } from "@/core/gateway/ArcadeGateway"
import { ArcadeService, ArcadeServiceInput } from "@/providers/arcade/ArcadeService"
import { GameRepository } from "@/providers/game/GameRepository"

function getArcadeGateway(input?: Partial<ArcadeServiceInput>): ArcadeGateway{
    return new ArcadeService({
        gameRepository: input?.gameRepository ?? {} as GameRepository,
        arcadeTimesSourceStartIndex: input?.arcadeTimesSourceStartIndex ?? 0,
        arcadeTimesSourceEndIndex: input?.arcadeTimesSourceEndIndex ?? 0,
    })
}

describe("ArcadeService", () => {

    describe("getArcadeById", () => {
        
        it("should return the id and the stage ids from the unmodified game", () => {
            //Given
            const arcadeGateway: ArcadeGateway = getArcadeGateway()
            const expectedArcade: Arcade = {
                id: 1,
                stageIds: [21, 22, 23, 24, 25, 26]
            }

            //When
            const arcade = arcadeGateway.getArcadeById(1)

            //Then
            expect(arcade).toStrictEqual(expectedArcade)
        })

        it("should return null if the arcade does not exist in unmodified game with the provided id", () => {
            //Given
            const arcadeGateway: ArcadeGateway = getArcadeGateway()

            //When
            const arcade = arcadeGateway.getArcadeById(7)

            //Then
            expect(arcade).toStrictEqual(null)
        })
        
    })

    describe("getArcades", () => {

        it("should return the arcades of the unmodified game", () => {
            //Given
            const arcadeGateway: ArcadeGateway = getArcadeGateway()
            const expectedArcades: Arcade[] = [
                {id: 1, stageIds: [21, 22, 23, 24, 25, 26]},
                {id: 2, stageIds: [51, 52, 53, 54, 55, 56]},
                {id: 3, stageIds: [71, 72, 73, 74, 75, 76]},
                {id: 4, stageIds: [31, 32, 33, 34, 35, 36]},
                {id: 5, stageIds: [61, 62, 63, 64, 65, 66]},
                {id: 6, stageIds: [41, 42, 43, 44, 45, 46]},
            ]

            //When
            const arcades = arcadeGateway.getArcades()

            //Then
            expect(arcades).toStrictEqual(expectedArcades)
        })

    })

    describe("getArcadeStageByIds", () => {

        it("should get the arcade stage info with the arcadeid and stageid provided", () => {
            //Given
            const gameRepository = {
                getStringFromExe: jest.fn(() => `L21 032 058\r\nL52 011 015`)
            } as Pick<GameRepository, "getStringFromExe"> as GameRepository
            const arcadeGateway: ArcadeGateway = getArcadeGateway({
                gameRepository
            })
            const arcadeId = 1
            const stageId = 21
            const expectedArcadeStage: ArcadeStage = {
                arcadeId,
                stageId,
                baseTimes: [32, 58]
            }

            //When
            const arcadeStage = arcadeGateway.getArcadeStageByIds(arcadeId, stageId)

            //Then
            expect(arcadeStage).toStrictEqual(expectedArcadeStage)
        })

        it("should get the arcade stage info located on the end of the string", () => {
            //Given
            const gameRepository = {
                getStringFromExe: jest.fn(() => `L21 032 058\r\nL52 011 015`)
            } as Pick<GameRepository, "getStringFromExe"> as GameRepository
            const arcadeGateway: ArcadeGateway = getArcadeGateway({
                gameRepository
            })
            const arcadeId = 1
            const stageId = 52
            const expectedArcadeStage: ArcadeStage = {
                arcadeId,
                stageId,
                baseTimes: [11, 15]
            }

            //When
            const arcadeStage = arcadeGateway.getArcadeStageByIds(arcadeId, stageId)

            //Then
            expect(arcadeStage).toStrictEqual(expectedArcadeStage)
        })

        it("should return null if the base times are not found for the provided ids", () => {
            //Given
            const gameRepository = {
                getStringFromExe: jest.fn(() => `L21 032 058`)
            } as Pick<GameRepository, "getStringFromExe"> as GameRepository
            const arcadeGateway: ArcadeGateway = getArcadeGateway({
                gameRepository
            })
            const expectedArcadeStage = null

            //When
            const arcadeStage = arcadeGateway.getArcadeStageByIds(1, 52)

            //Then
            expect(arcadeStage).toStrictEqual(expectedArcadeStage)
        })

        it("should request the arcade string using the constants provided", () => {
            //Given
            const getStringFromExeSpy = jest.fn(() => "")
            const gameRepository = {
                getStringFromExe: getStringFromExeSpy
            } as Pick<GameRepository, "getStringFromExe"> as GameRepository
            const arcadeTimesSourceStartIndex = 7
            const arcadeTimesSourceEndIndex = 31
            const arcadeGateway = getArcadeGateway({
                gameRepository,
                arcadeTimesSourceStartIndex,
                arcadeTimesSourceEndIndex
            })

            //When
            arcadeGateway.getArcadeStageByIds(1, 10)

            //Then
            expect(getStringFromExeSpy).toHaveBeenCalledWith(
                arcadeTimesSourceStartIndex,
                arcadeTimesSourceEndIndex - arcadeTimesSourceStartIndex
            )
        })

    })

    describe("setArcadeBaseTimesByIds", () => {

        it("should set the desired values and send the right string to the game repository", () => {
            //Given
            const setStringOnExeSpy = jest.fn()
            const gameRepository = {
                getStringFromExe: jest.fn(() => "L21 000 000"),
                setStringOnExe: setStringOnExeSpy
            } as Pick<GameRepository, "getStringFromExe" | "setStringOnExe"> as GameRepository
            const expectedSentString = "L21 055 158"
            const arcadeTimesSourceStartIndex = 856
            const arcadeGateway: ArcadeGateway = getArcadeGateway({
                gameRepository,
                arcadeTimesSourceStartIndex
            })

            //When
            arcadeGateway.setArcadeBaseTimesByIds(1, 21, [55, 158])

            //Then
            expect(setStringOnExeSpy).toHaveBeenCalledWith(arcadeTimesSourceStartIndex, expectedSentString)
        })

    })

})