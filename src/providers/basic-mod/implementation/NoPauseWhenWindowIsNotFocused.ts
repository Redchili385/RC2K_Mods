import { ByteManipulator } from "../ByteManipulator";
import { CoreBasicMod } from "../CoreBasicMod";

export class NoPauseWhenWindowIsNotFocused implements CoreBasicMod{

    private readonly getByte: (index: number) => number
    private readonly setByte: (index: number, value: number) => void
    private readonly baseAddress = 0x400C00  //.text section

    constructor(byteManipulator: ByteManipulator){
        this.getByte = byteManipulator.getByte
        this.setByte = byteManipulator.setByte
    }

    checkEnabled(): boolean{
        if(
            this.getByte(0x4105D4 - this.baseAddress) == 0xC7 &&
            this.getByte(0x4105D5 - this.baseAddress) == 0x05 &&
            this.getByte(0x4105D6 - this.baseAddress) == 0x74 &&
            this.getByte(0x4105D7 - this.baseAddress) == 0x83 &&
            this.getByte(0x4105D8 - this.baseAddress) == 0x51 &&
            this.getByte(0x4105D9 - this.baseAddress) == 0x00 &&
            this.getByte(0x4105DA - this.baseAddress) == 0x01 &&
            this.getByte(0x4105DB - this.baseAddress) == 0x00 &&
            this.getByte(0x4105DC - this.baseAddress) == 0x00 &&
            this.getByte(0x4105DD - this.baseAddress) == 0x00 &&
            this.getByte(0x4105DE - this.baseAddress) == 0x90 &&
            this.getByte(0x4105DF - this.baseAddress) == 0x90 &&
            this.getByte(0x4105E0 - this.baseAddress) == 0x90 &&
            this.getByte(0x4105E1 - this.baseAddress) == 0x90 &&
            this.getByte(0x4105E2 - this.baseAddress) == 0x90 &&
            this.getByte(0x4105E3 - this.baseAddress) == 0x90 &&
            this.getByte(0x4105E4 - this.baseAddress) == 0x90 &&
            this.getByte(0x4105E5 - this.baseAddress) == 0x90
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
        this.setByte(0x4105D4 - this.baseAddress, 0xC7)
        this.setByte(0x4105D5 - this.baseAddress, 0x05)
        this.setByte(0x4105D6 - this.baseAddress, 0x74)
        this.setByte(0x4105D7 - this.baseAddress, 0x83)
        this.setByte(0x4105D8 - this.baseAddress, 0x51)
        this.setByte(0x4105D9 - this.baseAddress, 0x00)
        this.setByte(0x4105DA - this.baseAddress, 0x01)
        this.setByte(0x4105DB - this.baseAddress, 0x00)
        this.setByte(0x4105DC - this.baseAddress, 0x00)
        this.setByte(0x4105DD - this.baseAddress, 0x00)
        this.setByte(0x4105DE - this.baseAddress, 0x90)
        this.setByte(0x4105DF - this.baseAddress, 0x90)
        this.setByte(0x4105E0 - this.baseAddress, 0x90)
        this.setByte(0x4105E1 - this.baseAddress, 0x90)
        this.setByte(0x4105E2 - this.baseAddress, 0x90)
        this.setByte(0x4105E3 - this.baseAddress, 0x90)
        this.setByte(0x4105E4 - this.baseAddress, 0x90)
        this.setByte(0x4105E5 - this.baseAddress, 0x90)
    }

    private disable(){
        this.setByte(0x4105D4 - this.baseAddress, 0x83)
        this.setByte(0x4105D5 - this.baseAddress, 0xF8)
        this.setByte(0x4105D6 - this.baseAddress, 0x1C)
        this.setByte(0x4105D7 - this.baseAddress, 0x75)
        this.setByte(0x4105D8 - this.baseAddress, 0x0D)
        this.setByte(0x4105D9 - this.baseAddress, 0x8B)
        this.setByte(0x4105DA - this.baseAddress, 0x45)
        this.setByte(0x4105DB - this.baseAddress, 0x10)
        this.setByte(0x4105DC - this.baseAddress, 0xA3)
        this.setByte(0x4105DD - this.baseAddress, 0x74)
        this.setByte(0x4105DE - this.baseAddress, 0x83)
        this.setByte(0x4105DF - this.baseAddress, 0x51)
        this.setByte(0x4105E0 - this.baseAddress, 0x00)
        this.setByte(0x4105E1 - this.baseAddress, 0xE9)
        this.setByte(0x4105E2 - this.baseAddress, 0x95)
        this.setByte(0x4105E3 - this.baseAddress, 0x00)
        this.setByte(0x4105E4 - this.baseAddress, 0x00)
        this.setByte(0x4105E5 - this.baseAddress, 0x00)
    }
}