import { Rally } from "@/core/entity/Rally"
import { RallyGateway } from "@/core/gateway/RallyGateway"
import { GameRepository } from "@/providers/game/GameRepository"
import { RallyService } from "@/providers/rally/RallyService"

describe("RallyService", () => {

    describe("getRallyById", () => {
        
        it("should get all the rally info by id, getting the name from the tokens of the game repository", () => {
            //Given
            const id = 1
            const name = "RallyNameB"
            const gameRepository = {
                getLocaleValueByToken: jest.fn(token => {
                    if(token == "tokRT_ChampTwo"){
                        return name
                    }
                    fail("failed to meet input expectations")
                })
            } as Pick<GameRepository, "getLocaleValueByToken"> as GameRepository
            const RallyGateway: RallyGateway = new RallyService(gameRepository)
            const expectedRally: Rally = {
                id,
                name,
                stageIds: [61, 62, 63, 64, 65, 66]
            }

            //When
            const rally = RallyGateway.getRallyById(id)

            //Then
            expect(rally).toStrictEqual(expectedRally)
        })

        it("should return null if the id doesn't exist in vanilla game", () => {
            //Given
            const gameRepository = {} as GameRepository
            const RallyGateway: RallyGateway = new RallyService(gameRepository)

            //When
            const rally = RallyGateway.getRallyById(7)

            //Then
            expect(rally).toStrictEqual(null)
        })

        it("should return null if the locale token corresponding to the rally does not exist", () => {
            //Given
            const gameRepository = {
                getLocaleValueByToken: jest.fn(() => null)
            } as Pick<GameRepository, "getLocaleValueByToken"> as GameRepository
            const RallyGateway: RallyGateway = new RallyService(gameRepository)

            //When
            const rally = RallyGateway.getRallyById(1)

            //Then
            expect(rally).toStrictEqual(null)
        })

    })

    describe("getRallies", () => {

        it("should list all rallies available on vanilla game and available on the locale list", () => {
            //Given
            const idA = 0
            const idB = 1
            const nameA = "RallyNameA"
            const nameB = "RallyNameB"
            const gameRepository = {
                getLocaleValueByToken: jest.fn(token => {
                    if(token == "tokRT_ChampOne"){
                        return nameA
                    }
                    if(token == "tokRT_ChampTwo"){
                        return nameB
                    }
                    return null
                })
            } as Pick<GameRepository, "getLocaleValueByToken"> as GameRepository
            const RallyGateway: RallyGateway = new RallyService(gameRepository)
            const expectedRallies: Rally[] = [
                {
                    id: idA,
                    name: nameA,
                    stageIds: [41, 42, 43, 44, 45, 46]
                },
                {
                    id: idB,
                    name: nameB,
                    stageIds: [61, 62, 63, 64, 65, 66]
                }
            ]

            //When
            const rallies = RallyGateway.getRallies()

            //Then
            expect(rallies).toStrictEqual(expectedRallies)
        })

    })
    
})