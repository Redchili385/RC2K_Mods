import { BasicMod } from "@/core/entity/BasicMod";
import RegistryFix from "@/providers/basic-mod/implementation/RegistryFix";
import UIBasicMod from "./UIBasicMod";
import ParticleGuruFix from "@/providers/basic-mod/implementation/ParticleGuruFix";
import FastLoading from "@/providers/basic-mod/implementation/FastLoading";
import NoCD from "@/providers/basic-mod/implementation/NoCD";
import ExtendedCameraModes from "@/providers/basic-mod/implementation/ExtendedCameraModes";

interface BasicModsProps{
    fileBytes: ArrayBuffer,
    updateFileBytes: (fileBytes: ArrayBuffer) => void
}

export default function BasicMods(props: BasicModsProps){
    const {fileBytes, updateFileBytes} = props
    const bytes = new Uint8Array(fileBytes) 

    function updateBytes(){
        updateFileBytes(bytes.slice())
    }

    return <>
        <UIBasicMod name="No CD" mod={new NoCD(bytes)} onChange={updateBytes}></UIBasicMod><br/>
        <UIBasicMod name="Registry Fix" mod={new RegistryFix(bytes)} onChange={updateBytes}></UIBasicMod><br/>
        <UIBasicMod name="Particle Guru Fix" mod={new ParticleGuruFix(bytes)} onChange={updateBytes}></UIBasicMod><br/>
        <UIBasicMod name="Fast Loading Screen" mod={new FastLoading(bytes)} onChange={updateBytes}></UIBasicMod><br/>
        <UIBasicMod name="Extended Camera Modes" mod={new ExtendedCameraModes(bytes)} onChange={updateBytes}></UIBasicMod>
    </>

}