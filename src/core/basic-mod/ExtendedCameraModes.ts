import { BasicMod } from "./BasicMod";

export default class ExtendedCameraModes implements BasicMod {

    readonly exe: Uint8Array

    constructor(exe: Uint8Array){
        this.exe = exe
    }

    checkEnabled(): boolean{
        if(this.exe[0x39E7D] == 0x34){
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
        this.exe[0x39E7D] = 0x34
    }

    private disable(){
        this.exe[0x39E7D] = 0x07
    }
    
}