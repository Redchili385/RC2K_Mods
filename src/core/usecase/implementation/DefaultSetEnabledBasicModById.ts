import { BasicModGateway } from "@/core/gateway/BasicModGateway";
import { SetEnabledBasicModById, SetEnabledBasicModByIdInput } from "../SetEnabledBasicModById";
import { BasicModNotFoundException } from "@/core/exception/BasicModNotFoundException";

export class DefaultSetEnabledBasicModById implements SetEnabledBasicModById{

    readonly basicModGateway: BasicModGateway

    constructor(
        basicModGateway: BasicModGateway
    ){
        this.basicModGateway = basicModGateway
    }

    invoke(input: SetEnabledBasicModByIdInput): void {
        const basicMod = this.basicModGateway.getBasicModById(input.id);
        if(basicMod == null){
            throw new BasicModNotFoundException();
        }
        basicMod.setEnabled(input.value);
        return;
    }

}