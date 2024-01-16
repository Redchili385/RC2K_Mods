import { GameGateway } from "@/core/gateway/GameGateway"
import { GameRepository } from "@/providers/game/GameRepository"
import { GameService } from "@/providers/game/GameService"

describe("GameService", () => {

    describe("getExe", () => {

        it("should get the exe from the repository", () => {
            //Given
            const expectedExe = new Uint8Array([2, 3, 5])
            const gameRepository = {
                getExe: jest.fn(() => expectedExe)
            } as Pick<GameRepository, "getExe"> as GameRepository
            const gameGateway: GameGateway = new GameService(gameRepository)

            //When
            const exe = gameGateway.getExe()

            //Then
            expect(exe).toStrictEqual(expectedExe)
        })

    })

    describe("setExe", () => {

        it("should send the exe received to the repository", () => {
            //Given
            const setExeSpy = jest.fn()
            const exe = new Uint8Array([2, 3, 5])
            const gameRepository = {
                setExe: setExeSpy
            } as Pick<GameRepository, "setExe"> as GameRepository
            const gameGateway: GameGateway = new GameService(gameRepository)

            //When
            gameGateway.setExe(exe)

            //Then
            expect(setExeSpy).toHaveBeenCalledWith(exe)
        })

    })

})