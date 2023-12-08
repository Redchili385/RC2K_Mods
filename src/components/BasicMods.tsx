import { BasicMod } from "@/core/basic-mod/BasicMod";
import RegistryFix from "@/core/basic-mod/RegistryFix";
import UIBasicMod from "./UIBasicMod";
import ParticleGuruFix from "@/core/basic-mod/ParticleGuruFix";
import FastLoading from "@/core/basic-mod/FastLoading";
import NoCD from "@/core/basic-mod/NoCD";
import ExtendedCameraModes from "@/core/basic-mod/ExtendedCameraModes";

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