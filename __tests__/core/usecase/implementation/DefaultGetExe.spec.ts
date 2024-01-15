import { GameGateway } from "@/core/gateway/GameGateway";
import { GetExe } from "@/core/usecase/GetExe";
import { DefaultGetExe } from "@/core/usecase/implementation/DefaultGetExe";
import { describe } from "node:test";


describe("invoke", () => {

    it("should retrieve the exe from the repository", () => {
        //Given
        const expectedExe = new Uint8Array([2, 3, 5])
        const GetExe: GetExe = new DefaultGetExe({
            getExe: jest.fn(() => expectedExe)
        } as Pick<GameGateway, "getExe"> as GameGateway)

        //When
        const exe = GetExe.invoke().exe

        //Then
        expect(exe).toStrictEqual(expectedExe)
    })


})