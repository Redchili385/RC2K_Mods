import { GameGateway } from "@/core/gateway/GameGateway"
import { DefaultSetExe } from "@/core/usecase/implementation/DefaultSetExe"

describe("invoke", () => {

    it("should send the set object to the repository", () => {
        //Given
        const setExeSpy = jest.fn(() => undefined)
        const gameGateway = {
            setExe: setExeSpy
        } as Pick<GameGateway, "setExe"> as GameGateway
        const setExe = new DefaultSetExe(gameGateway)
        const exe = new Uint8Array([2, 3, 5, 7])

        //When
        setExe.invoke({exe})

        //Then
        expect(setExeSpy).toHaveBeenCalledWith(exe)
    })

})