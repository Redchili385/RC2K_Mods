import { BasicMod } from "./BasicMod";

export default class NoCD implements BasicMod{

    readonly exe: Uint8Array

    constructor(exe: Uint8Array){
        this.exe = exe
    }

    checkEnabled(): boolean{
        if(
            this.exe[0x14848] == 0x90 &&
            this.exe[0x14849] == 0x90 &&
            this.exe[0x1484A] == 0x90 &&
            this.exe[0x1484B] == 0x90 &&
            this.exe[0x1484C] == 0x90 &&
            this.exe[0x1484D] == 0x90 &&
            this.exe[0x1484E] == 0x90 &&
            this.exe[0x1484F] == 0x90 &&
            this.exe[0x14850] == 0x90
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
        this.exe[0x14848] = 0x90
        this.exe[0x14849] = 0x90
        this.exe[0x1484A] = 0x90
        this.exe[0x1484B] = 0x90
        this.exe[0x1484C] = 0x90
        this.exe[0x1484D] = 0x90
        this.exe[0x1484E] = 0x90
        this.exe[0x1484F] = 0x90
        this.exe[0x14850] = 0x90
    }

    private disable(){
        this.exe[0x14848] = 0x75
        this.exe[0x14849] = 0x47
        this.exe[0x1484A] = 0xE8
        this.exe[0x1484B] = 0xEC
        this.exe[0x1484C] = 0x0A
        this.exe[0x1484D] = 0x00
        this.exe[0x1484E] = 0x00
        this.exe[0x1484F] = 0x75
        this.exe[0x14850] = 0x52
    }
    
}