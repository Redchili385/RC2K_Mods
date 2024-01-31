import { ByteManipulator } from "../ByteManipulator";
import { CoreBasicMod } from "../CoreBasicMod";

export class TimeTenTimesFaster implements CoreBasicMod{

    private readonly getByte: (index: number) => number
    private readonly setByte: (index: number, value: number) => void

    constructor(byteManipulator: ByteManipulator){
        this.getByte = byteManipulator.getByte
        this.setByte = byteManipulator.setByte
    }

    checkEnabled(): boolean{
        if(
            this.getByte(0x44999) == 0x90 &&  //Tick jumping removed
            this.getByte(0x4499A) == 0x90 &&
            this.getByte(0x449A0) == 0x90 &&
            this.getByte(0x449A1) == 0x90
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
        this.setByte(0x44999, 0x90)
        this.setByte(0x4499A, 0x90)
        this.setByte(0x449A0, 0x90)
        this.setByte(0x449A1, 0x90)
    }

    private disable(){
        this.setByte(0x44999, 0xF7)
        this.setByte(0x4499A, 0xF3)
        this.setByte(0x449A0, 0xF7)
        this.setByte(0x449A1, 0xE3)
    }
    
}