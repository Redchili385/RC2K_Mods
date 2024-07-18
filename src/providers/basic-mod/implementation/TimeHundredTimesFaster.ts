import { ByteManipulator } from "../ByteManipulator";
import { CoreBasicMod } from "../CoreBasicMod";

export class TimeHundredTimesFaster implements CoreBasicMod{

    private readonly getByte: (index: number) => number
    private readonly setByte: (index: number, value: number) => void
    private readonly baseAddress = 0x400C00  //.text section

    constructor(byteManipulator: ByteManipulator){
        this.getByte = byteManipulator.getByte
        this.setByte = byteManipulator.setByte
    }

    checkEnabled(): boolean{
        if(
            this.getByte(0x445599 - this.baseAddress) == 0xF7 &&  //Tick jumping removed
            this.getByte(0x44559A - this.baseAddress) == 0xE3 &&
            this.getByte(0x4455A0 - this.baseAddress) == 0xF7 &&
            this.getByte(0x4455A1 - this.baseAddress) == 0xF3
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
        this.setByte(0x445599 - this.baseAddress, 0xF7)
        this.setByte(0x44559A - this.baseAddress, 0xE3)
        this.setByte(0x4455A0 - this.baseAddress, 0xF7)
        this.setByte(0x4455A1 - this.baseAddress, 0xF3)
    }

    private disable(){
        this.setByte(0x445599 - this.baseAddress, 0xF7)
        this.setByte(0x44559A - this.baseAddress, 0xF3)
        this.setByte(0x4455A0 - this.baseAddress, 0xF7)
        this.setByte(0x4455A1 - this.baseAddress, 0xE3)
    }
    
}