import { ByteManipulator } from "../ByteManipulator";
import { CoreBasicMod } from "../CoreBasicMod";

export default class NoCD implements CoreBasicMod{

    private readonly getByte: (index: number) => number
    private readonly setByte: (index: number, value: number) => void

    constructor(byteManipulator: ByteManipulator){
        this.getByte = byteManipulator.getByte
        this.setByte = byteManipulator.setByte
    }

    checkEnabled(): boolean{
        if(
            this.getByte(0x14848) == 0x90 &&
            this.getByte(0x14849) == 0x90 &&
            this.getByte(0x1484A) == 0x90 &&
            this.getByte(0x1484B) == 0x90 &&
            this.getByte(0x1484C) == 0x90 &&
            this.getByte(0x1484D) == 0x90 &&
            this.getByte(0x1484E) == 0x90 &&
            this.getByte(0x1484F) == 0x90 &&
            this.getByte(0x14850) == 0x90
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
        this.setByte(0x14848, 0x90)
        this.setByte(0x14849, 0x90)
        this.setByte(0x1484A, 0x90)
        this.setByte(0x1484B, 0x90)
        this.setByte(0x1484C, 0x90)
        this.setByte(0x1484D, 0x90)
        this.setByte(0x1484E, 0x90)
        this.setByte(0x1484F, 0x90)
        this.setByte(0x14850, 0x90)
    }

    private disable(){
        this.setByte(0x14848, 0x75)
        this.setByte(0x14849, 0x47)
        this.setByte(0x1484A, 0xE8)
        this.setByte(0x1484B, 0xEC)
        this.setByte(0x1484C, 0x0A)
        this.setByte(0x1484D, 0x00)
        this.setByte(0x1484E, 0x00)
        this.setByte(0x1484F, 0x75)
        this.setByte(0x14850, 0x52)
    }
    
}