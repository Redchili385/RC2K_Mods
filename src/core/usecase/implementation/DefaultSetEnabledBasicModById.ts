import { BasicModGateway } from "@/core/gateway/BasicModGateway";
import { SetEnabledBasicModById, SetEnabledBasicModByIdInput } from "../SetEnabledBasicModById";

export class DefaultSetEnabledBasicModById implements SetEnabledBasicModById{

    readonly basicModGateway: BasicModGateway

    constructor(
        basicModGateway: BasicModGateway
    ){
        this.basicModGateway = basicModGateway
    }

    invoke(input: SetEnabledBasicModByIdInput): void {
        this.basicModGateway.setEnabledBasicModById(input.id, input.value);
    }

}