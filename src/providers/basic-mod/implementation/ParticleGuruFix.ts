import { ByteManipulator } from "../ByteManipulator";
import { CoreBasicMod } from "../CoreBasicMod";

export default class ParticleGuruFix implements CoreBasicMod{

    private readonly getByte: (index: number) => number
    private readonly setByte: (index: number, value: number) => void

    constructor(byteManipulator: ByteManipulator){
        this.getByte = byteManipulator.getByte
        this.setByte = byteManipulator.setByte
    }

    checkEnabled(): boolean{
        if(
            this.getByte(0xC9485) == 0xC3 &&
            this.getByte(0xC9486) == 0x90 && 
            this.getByte(0xC9487) == 0x90
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
        this.setByte(0xC9485, 0xC3)
        this.setByte(0xC9486, 0x90)
        this.setByte(0xC9487, 0x90)
    }

    private disable(){
        this.setByte(0xC9485, 0xD9)
        this.setByte(0xC9486, 0x47)
        this.setByte(0xC9487, 0x34)
    }
    
}