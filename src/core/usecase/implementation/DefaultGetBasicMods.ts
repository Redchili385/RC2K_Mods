import { BasicModGateway } from "@/core/gateway/BasicModGateway";
import { GetBasicMods, GetBasicModsOutput } from "../GetBasicMods";

export class DefaultGetBasicMods implements GetBasicMods{
    
    readonly basicModGateway: BasicModGateway

    constructor(
        basicModGateway: BasicModGateway
    ){
        this.basicModGateway = basicModGateway
    }

    invoke(): GetBasicModsOutput {
        const basicMods = this.basicModGateway.getBasicMods()
        const basicModsDTO = basicMods.map(basicMod => ({
            id: basicMod.id,
            isEnabled: basicMod.checkEnabled()
        }))
        return {
            basicMods: basicModsDTO
        }
    }
}