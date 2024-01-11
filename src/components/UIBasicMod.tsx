import { useCoreContext } from "@/context/CoreContext";
import { useState } from "react"

interface UIBasicModProps{
    basicModId: string,
    isEnabled: boolean
}

export default function UIBasicMod(props: UIBasicModProps){
    const { basicModId } = props
    const { setEnabledBasicModById } = useCoreContext()
    const [isEnabled, setIsEnabled] = useState<boolean>(props.isEnabled)

    function onCheckboxClicked(newState: boolean){
        if(isEnabled == newState){
            return;
        }
        setEnabledBasicModById.invoke({
            id: basicModId, 
            value: newState,
        });
        setIsEnabled(newState)
    }

    return <span className="inline-block px-2">
        <span className="inline-block font-bold w-52">{basicModId}</span>
        <input
            className="inline-block scale-125 w-8" 
            type="checkbox" 
            checked={isEnabled} 
            onChange={e => onCheckboxClicked(e.currentTarget.checked)}>
        </input>
    </span>
}