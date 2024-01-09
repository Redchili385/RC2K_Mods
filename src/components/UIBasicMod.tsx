import { BasicMod } from "@/core/entity/BasicMod"
import { useState } from "react"

interface UIBasicModProps{
    name: string,
    mod: BasicMod,
    onChange: () => void
}

export default function UIBasicMod(props: UIBasicModProps){
    const {name, mod, onChange} = props
    const [enabled, setEnabled] = useState<boolean>(mod.checkEnabled())

    function onCheckboxClicked(newState: boolean){
        if(enabled == newState){
            return;
        }
        mod.setEnabled(newState);
        setEnabled(newState);
        onChange()
    }

    return <span className="inline-block px-2">
        <span className="inline-block font-bold w-52">{name}</span>
        <input
            className="inline-block scale-125 w-8" 
            type="checkbox" 
            checked={enabled} 
            onClick={e => onCheckboxClicked(e.currentTarget.checked)}>
        </input>
    </span>
}