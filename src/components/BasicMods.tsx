import React from "react";
import UIBasicMod from "./UIBasicMod";
import { useCoreContext } from "@/context/CoreContext";

export default function BasicMods(){
    const { getBasicMods } = useCoreContext()
    const { basicMods } = getBasicMods.invoke()
    const numberOfMods = basicMods.length
    const lastModIndex = numberOfMods - 1

    return <>
        { basicMods.map((basicMod, index) => <React.Fragment key={index}>
            <UIBasicMod
                basicModId = {basicMod.id} 
                isEnabled = {basicMod.isEnabled}
            />
            {index != lastModIndex && <br/>}
        </React.Fragment>
        )}
    </>

}