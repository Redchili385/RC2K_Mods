import { BasicMod } from "./BasicMod";

export default class RegistryFix implements BasicMod{

    readonly exe: Uint8Array

    constructor(exe: Uint8Array){
        this.exe = exe
    }

    checkEnabled(): boolean{
        if(this.exe[0x14812] == 0xEB){
            return true;
        }
        return false;
    }

    setEnabled(value: boolean){
        const isEnabled = this.checkEnabled()
        if(isEnabled == value){
            return;
        }
        if(!value){
            this.disable()
            return;
        }
        this.enable()
    }

    private enable(){
        this.exe[0x14812] = 0xEB
    }

    private disable(){
        this.exe[0x14812] = 0x74
    }
    
}