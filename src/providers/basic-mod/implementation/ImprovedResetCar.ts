import { ByteManipulator } from "../ByteManipulator";
import { CoreBasicMod } from "../CoreBasicMod";
import resetCar from "../../../asm/mods/resetCar/resetCar"
import resetCarV2 from "../../../asm/mods/resetCar/resetCarV2"

export class ImprovedResetCar implements CoreBasicMod{

    private readonly getByte: (index: number) => number
    private readonly setByte: (index: number, value: number) => void
    private readonly oldBinaryFunction: Uint8Array
    private readonly newBinaryFunction: Uint8Array

    constructor(byteManipulator: ByteManipulator){
        this.getByte = byteManipulator.getByte
        this.setByte = byteManipulator.setByte
        this.oldBinaryFunction = resetCar
        this.newBinaryFunction = resetCarV2
    }

    checkEnabled(): boolean{
        for(let index = 0; index < this.newBinaryFunction.length; index++){
            if(this.getByte(0x3E3EF + index) != this.newBinaryFunction[index]){
                return false
            }
        }
        return this.getByte(0x3E4E5) == 0x00 && this.getByte(0x3E4E6) == 0x74;
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
        this.newBinaryFunction.forEach((value, index) => {
            this.setByte(0x3E3EF + index, value)
        })
        this.setByte(0x3E4E5, 0x00)  //Control Type to Allow Bots and Players
        this.setByte(0x3E4E6, 0x74)
    }

    private disable(){
        this.oldBinaryFunction.forEach((value, index) => {
            this.setByte(0x3E3EF + index, value)
        })
        this.setByte(0x3E4E5, 0x02)
        this.setByte(0x3E4E6, 0x75)
    }

}