import { BasicMod } from "./BasicMod";

export default class ParticleGuruFix implements BasicMod{

    readonly exe: Uint8Array

    constructor(exe: Uint8Array){
        this.exe = exe
    }

    checkEnabled(): boolean{
        if(
            this.exe[0xC9485] == 0xC3 &&
            this.exe[0xC9486] == 0x90 && 
            this.exe[0xC9487] == 0x90
        ){
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
        this.exe[0xC9485] = 0xC3
        this.exe[0xC9486] = 0x90
        this.exe[0xC9487] = 0x90
    }

    private disable(){
        this.exe[0xC9485] = 0xD9
        this.exe[0xC9486] = 0x47
        this.exe[0xC9487] = 0x34
    }
    
}