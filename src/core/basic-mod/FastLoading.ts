import { BasicModsService } from "../service/BasicModsService";
import { BasicMod } from "./BasicMod";

export default class FastLoading implements BasicMod {

    private readonly getByte: (index: number) => number
    private readonly setByte: (index: number, value: number) => void

    constructor(basicModsService: BasicModsService){
        this.getByte = basicModsService.getByte
        this.setByte = basicModsService.setByte
    }

    checkEnabled(): boolean{
        if(this.getByte(0x45BCF) == 0x84){
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
        this.setByte(0x45BCF, 0x84)
    }

    private disable(){
        this.setByte(0x45BCF, 0x85)
    }
    
}