import { BasicModGateway } from "@/core/gateway/BasicModGateway"
import { SetEnabledBasicModById, SetEnabledBasicModByIdInput } from "@/core/usecase/SetEnabledBasicModById"
import { DefaultSetEnabledBasicModById } from "@/core/usecase/implementation/DefaultSetEnabledBasicModById"

describe("invoke", () => {

    it("should send the id and the isEnabled value to the basic mod gateway", () => {
        //Given
        const input: SetEnabledBasicModByIdInput = {
            id: "1",
            value: true
        }
        const setEnabledBasicModByIdSpy = jest.fn()
        const basicModGateway = {
            setEnabledBasicModById: setEnabledBasicModByIdSpy
        } as Pick<BasicModGateway, "setEnabledBasicModById"> as BasicModGateway
        const setEnabledBasicModById: SetEnabledBasicModById = new DefaultSetEnabledBasicModById(basicModGateway)

        //When
        setEnabledBasicModById.invoke(input)

        //Then
        expect(setEnabledBasicModByIdSpy).toHaveBeenCalledWith(input.id, input.value)
    })

})