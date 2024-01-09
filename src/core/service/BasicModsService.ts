import { BasicMod } from "../basic-mod/BasicMod"
import ExtendedCameraModes from "../basic-mod/ExtendedCameraModes"
import FastLoading from "../basic-mod/FastLoading"
import NoCD from "../basic-mod/NoCD"
import ParticleGuruFix from "../basic-mod/ParticleGuruFix"
import RegistryFix from "../basic-mod/RegistryFix"
import { GameService } from "./GameService"

export interface BasicModsService{
    getBasicMods: () => BasicMod[]
    getByte: (index: number) => number
    setByte: (index: number, value: number) => void
}

export class DefaultBasicModsService implements BasicModsService{

    private readonly gameService: GameService
    private readonly basicMods: Map<string, BasicMod>

    constructor(gameService: GameService){
        this.gameService = gameService
        this.basicMods = new Map<string, BasicMod>();
        this.fillBasicMods()
    }

    getBasicMods(): BasicMod[]{
        return Array.from(this.basicMods.values())
    }

    getByte(index: number): number{
        return this.gameService.getExe()[index]
    }

    setByte(index: number, value: number){
        this.gameService.getExe()[index] = value;
        this.gameService.sendExeUpdateSignal()
    }

    private fillBasicMods(){
        this.basicMods.set("No CD", new NoCD(this));
        this.basicMods.set("Registry Fix", new RegistryFix(this));
        this.basicMods.set("Particle Guru Fix", new ParticleGuruFix(this));
        this.basicMods.set("Fast Loading Screen", new FastLoading(this));
        this.basicMods.set("Extended Camera Modes", new ExtendedCameraModes(this));
    }

}