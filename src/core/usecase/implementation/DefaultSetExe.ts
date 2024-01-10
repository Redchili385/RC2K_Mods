import { GameGateway } from "@/core/gateway/GameGateway";
import { SetExe, SetExeInput } from "../SetExe";

export class DefaultSetExe implements SetExe {

    readonly gameGateway: GameGateway

    constructor(
        gameGateway: GameGateway
    ){
        this.gameGateway = gameGateway
    }

    invoke(input: SetExeInput): void {
        this.gameGateway.setExe(input.exe)
    }

}