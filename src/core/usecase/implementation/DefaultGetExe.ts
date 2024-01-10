import { GameGateway } from "@/core/gateway/GameGateway";
import { GetExe, GetExeOutput } from "../GetExe";

export class DefaultGetExe implements GetExe{

    readonly gameGateway: GameGateway

    constructor(
        gameGateway: GameGateway
    ){
        this.gameGateway = gameGateway
    }

    invoke(): GetExeOutput {
        return {
            exe: this.gameGateway.getExe()
        }
    }
    
}