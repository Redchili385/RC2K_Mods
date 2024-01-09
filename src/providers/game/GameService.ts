import { GameGateway } from "@/core/gateways/GameGateway";
import { GameRepository } from "./GameRepository";

export class GameService implements GameGateway{

    readonly repository: GameRepository

    constructor(repository: GameRepository){
        this.repository = repository
    }

    getExe(): Uint8Array {
        return this.repository.getExe()
    }
    setExe(exe: Uint8Array): void {
        return this.repository.setExe(exe)
    }
    
}