import { BasicMod } from "@/core/entity/BasicMod"
import { BasicModGateway } from "@/core/gateway/BasicModGateway"
import { GetBasicMods, GetBasicModsOutput } from "@/core/usecase/GetBasicMods"
import { DefaultGetBasicMods } from "@/core/usecase/implementation/DefaultGetBasicMods"

describe("invoke", () => {

    it("should get all available basic mods from the gateway with their ids and isEnabled info", () => {
        //Given
        const basicMods: BasicMod[] = [
            {id: "1", isEnabled: true},
            {id: "2", isEnabled: false}
        ]
        const expectedBasicModsBTO: GetBasicModsOutput = {
            basicMods
        }
        const basicModGateway = {
            getBasicMods: jest.fn(() => basicMods)
        } as Pick<BasicModGateway, "getBasicMods"> as BasicModGateway
        const getBasicMods: GetBasicMods = new DefaultGetBasicMods(basicModGateway)

        //When
        const basicModsDTO = getBasicMods.invoke()

        //Then
        expect(basicModsDTO).toStrictEqual(expectedBasicModsBTO)
    })

})