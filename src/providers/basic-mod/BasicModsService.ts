import { BasicMod } from "../../core/entity/BasicMod"
import { ByteManipulator } from "./ByteManipulator"
import { CoreBasicMod } from "./CoreBasicMod"
import ExtendedCameraModes from "./implementation/ExtendedCameraModes"
import FastLoading from "./implementation/FastLoading"
import NoCD from "./implementation/NoCD"
import ParticleGuruFix from "./implementation/ParticleGuruFix"
import RegistryFix from "./implementation/RegistryFix"
import { BasicModGateway } from "@/core/gateway/BasicModGateway"

export class BasicModService implements BasicModGateway{

    private readonly coreBasicMods: Map<string, CoreBasicMod>
    private byteManipulator: ByteManipulator

    constructor(byteManipulator: ByteManipulator){
        this.coreBasicMods = new Map<string, BasicMod>();
        this.byteManipulator = byteManipulator
        this.fillBasicMods()
    }

    getBasicModById(id: string): BasicMod | null {
        const coreBasicMod = this.coreBasicMods.get(id)
        if(coreBasicMod == null){
            return null
        }
        return {
            id: id,
            checkEnabled: coreBasicMod.checkEnabled,
            setEnabled: coreBasicMod.setEnabled
        }
    }

    getBasicMods(): BasicMod[]{
        const basicMods: BasicMod[] = []
        this.coreBasicMods.forEach((coreBasicMod, id) => {
            basicMods.push({
                id,
                checkEnabled: coreBasicMod.checkEnabled,
                setEnabled: coreBasicMod.setEnabled
            })
        })
        return basicMods
    }

    private fillBasicMods(){
        this.coreBasicMods.set("No CD", new NoCD(this.byteManipulator));
        this.coreBasicMods.set("Registry Fix", new RegistryFix(this.byteManipulator));
        this.coreBasicMods.set("Particle Guru Fix", new ParticleGuruFix(this.byteManipulator));
        this.coreBasicMods.set("Fast Loading Screen", new FastLoading(this.byteManipulator));
        this.coreBasicMods.set("Extended Camera Modes", new ExtendedCameraModes(this.byteManipulator));
    }

}