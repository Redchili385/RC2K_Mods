import { BasicMod } from "../../../core/entity/BasicMod";
import { ByteManipulator } from "../ByteManipulator";

export default class ExtendedCameraModes implements BasicMod {

    private readonly getByte: (index: number) => number
    private readonly setByte: (index: number, value: number) => void

    constructor(byteManipulator: ByteManipulator){
        this.getByte = byteManipulator.getByte
        this.setByte = byteManipulator.setByte
    }

    checkEnabled(): boolean{
        if(this.getByte(0x39E7D) == 0x34){
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
        this.setByte(0x39E7D, 0x34)
    }

    private disable(){
        this.setByte(0x39E7D, 0x07)
    }
    
}