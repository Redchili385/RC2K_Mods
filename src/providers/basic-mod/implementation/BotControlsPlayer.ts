import { ByteManipulator } from "../ByteManipulator";
import { CoreBasicMod } from "../CoreBasicMod";

export class BotControlsPlayer implements CoreBasicMod{

    private readonly getByte: (index: number) => number
    private readonly setByte: (index: number, value: number) => void

    constructor(byteManipulator: ByteManipulator){
        this.getByte = byteManipulator.getByte
        this.setByte = byteManipulator.setByte
    }

    checkEnabled(): boolean{
        if(
            this.getByte(0x359AE) == 0x02 &&  //Configuring Players with control type 2 (Bot)
            this.getByte(0x39869) == 0x90 &&  //Allow bot controls on all modes
            this.getByte(0x3986A) == 0x90 &&
            this.getByte(0x3986B) == 0x90 &&
            this.getByte(0x3986C) == 0x90 &&
            this.getByte(0x3986D) == 0x90 &&
            this.getByte(0x3986E) == 0x90
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
        this.setByte(0x359AE, 0x02)
        this.setByte(0x39869, 0x90)
        this.setByte(0x3986A, 0x90)
        this.setByte(0x3986B, 0x90)
        this.setByte(0x3986C, 0x90)
        this.setByte(0x3986D, 0x90)
        this.setByte(0x3986E, 0x90)
    }

    private disable(){
        this.setByte(0x359AE, 0x01)
        this.setByte(0x39869, 0x0f)
        this.setByte(0x3986A, 0x85)
        this.setByte(0x3986B, 0xD6)
        this.setByte(0x3986C, 0x00)
        this.setByte(0x3986D, 0x00)
        this.setByte(0x3986E, 0x00)
    }
    
}