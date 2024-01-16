import { Stage } from "@/core/entity/Stage"
import { StageGateway } from "@/core/gateway/StageGateway"
import { GameRepository } from "@/providers/game/GameRepository"
import { StageService } from "@/providers/stage/StageService"

describe("StageService", () => {

    describe("getStages", () => {
        
        it("should retrieve all the vanilla stages mapped as stage tokens with vanilla ids", () => {
            //Given
            const gameRepository = {
                getLocaleValueByToken: jest.fn(s => {
                    if(s == "tokSS_Stage000"){  //id = 41
                        return "c"
                    }
                    if(s == "tokSS_Stage009"){  //id = 64
                        return "p"
                    }
                    return null
                })                
            } as Pick<GameRepository, "getLocaleValueByToken"> as GameRepository
            const stageGateway: StageGateway = new StageService(gameRepository)
            const expectedStages: Stage[] = [
                {id: 41, name: "c"},
                {id: 64, name: "p"}
            ]

            //When
            const stages = stageGateway.getStages()

            //Then
            expect(stages).toStrictEqual(expectedStages)
        })

    })

    describe("getStageById", () => {

        it("should retrieve an stage by its id, calling the right token", () => {
            //Given
            const gameRepository = {
                getLocaleValueByToken: jest.fn(s => {
                    if(s == "tokSS_Stage009"){  //id = 64
                        return "p"
                    }
                    return null
                })                
            } as Pick<GameRepository, "getLocaleValueByToken"> as GameRepository
            const stageGateway: StageGateway = new StageService(gameRepository)
            const expectedStage: Stage = {
                id: 64,
                name: "p"
            }

            //When
            const stage = stageGateway.getStageById(64)

            //Then
            expect(stage).toStrictEqual(expectedStage)
        })

        it("should return null if the token for the stage id is not found", () => {
            //Given
            const gameRepository = {
                getLocaleValueByToken: jest.fn(() => null)                
            } as Pick<GameRepository, "getLocaleValueByToken"> as GameRepository
            const stageGateway: StageGateway = new StageService(gameRepository)
            //When
            const stage = stageGateway.getStageById(64)

            //Then
            expect(stage).toStrictEqual(null)
        })

        it("should return null for stageids with an invalid last digit, incompatible with vanilla tokens", () => {
            //Given
            const gameRepository = {} as GameRepository
            const stageGateway: StageGateway = new StageService(gameRepository)
            //When
            const stage = stageGateway.getStageById(27)

            //Then
            expect(stage).toStrictEqual(null)
        })

        it("should return null for stageids with an invalid first digit, incompatible with vanilla tokens", () => {
            //Given
            const gameRepository = {} as GameRepository
            const stageGateway: StageGateway = new StageService(gameRepository)
            //When
            const stage = stageGateway.getStageById(12)

            //Then
            expect(stage).toStrictEqual(null)
        })

    })



})