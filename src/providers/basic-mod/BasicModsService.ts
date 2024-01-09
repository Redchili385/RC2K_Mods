import { BasicMod } from "../../core/entity/BasicMod"
import { ByteManipulator } from "./ByteManipulator"
import ExtendedCameraModes from "./implementation/ExtendedCameraModes"
import FastLoading from "./implementation/FastLoading"
import NoCD from "./implementation/NoCD"
import ParticleGuruFix from "./implementation/ParticleGuruFix"
import RegistryFix from "./implementation/RegistryFix"
import { BasicModGateway } from "@/core/gateways/BasicModGateway"

export class BasicModService implements BasicModGateway{

    private readonly basicMods: Map<string, BasicMod>
    private byteManipulator: ByteManipulator

    constructor(byteManipulator: ByteManipulator){
        this.basicMods = new Map<string, BasicMod>();
        this.byteManipulator = byteManipulator
        this.fillBasicMods()
    }

    getBasicMods(): BasicMod[]{
        return Array.from(this.basicMods.values())
    }

    private fillBasicMods(){
        this.basicMods.set("No CD", new NoCD(this.byteManipulator));
        this.basicMods.set("Registry Fix", new RegistryFix(this.byteManipulator));
        this.basicMods.set("Particle Guru Fix", new ParticleGuruFix(this.byteManipulator));
        this.basicMods.set("Fast Loading Screen", new FastLoading(this.byteManipulator));
        this.basicMods.set("Extended Camera Modes", new ExtendedCameraModes(this.byteManipulator));
    }

}