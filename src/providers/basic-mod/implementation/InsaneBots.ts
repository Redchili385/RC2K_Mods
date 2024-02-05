import { ByteManipulator } from "../ByteManipulator";
import { CoreBasicMod } from "../CoreBasicMod";

export default class InsaneBots implements CoreBasicMod {

    private readonly getByte: (index: number) => number
    private readonly setByte: (index: number, value: number) => void

    constructor(byteManipulator: ByteManipulator){
        this.getByte = byteManipulator.getByte
        this.setByte = byteManipulator.setByte
    }

    checkEnabled(): boolean{
        if(
            this.getByte(0x3E3C1) == 0x90 &&  //Allow Bots to reset car automatically after turning over
            this.getByte(0x3E3C2) == 0x90 &&

            this.getByte(0x6210C) == 0x90 &&  //Removing the desiredDoublePlaneSpeed calculation condition
            this.getByte(0x6210D) == 0x90 &&

            this.getByte(0x62115) == 0x0D &&  //Removing the sub and multiplying the botStrength by constant float 2.5
            this.getByte(0x62116) == 0x28 &&
            this.getByte(0x62117) == 0x10 &&

            this.getByte(0x2032CA) == 0x00 &&  //Changing the bias of the bot desired speed linear function to 0
            this.getByte(0x2032CB) == 0x00 &&

            this.getByte(0x61C46) == 0xC7 &&   //Fixing bot reversing segregation and ensuring semi-automatic transmission to them
            this.getByte(0x61C47) == 0x05 &&
            this.getByte(0x61C48) == 0x10 &&
            this.getByte(0x61C49) == 0xA0 &&
            this.getByte(0x61C4A) == 0x71 &&
            this.getByte(0x61C4B) == 0x00 &&
            this.getByte(0x61C4C) == 0x01 &&
            this.getByte(0x61C4D) == 0x00 &&
            this.getByte(0x61C4E) == 0x00 &&
            this.getByte(0x61C4F) == 0x00 &&

            this.getByte(0x36BAF) == 0x90 && //Maxing out BotStrength calculation.

            this.getByte(0x6263C) == 0x8B && //Changing reversing logic to use absolute doublePlaneSpeed less than to 2
            this.getByte(0x6263D) == 0x05 &&
            this.getByte(0x6263E) == 0x0C &&
            this.getByte(0x6263F) == 0xC0 &&
            this.getByte(0x62640) == 0x71 &&
            this.getByte(0x62641) == 0x00 &&
            this.getByte(0x62642) == 0x83 &&
            this.getByte(0x62643) == 0xF8 &&
            this.getByte(0x62644) == 0x02 &&
            this.getByte(0x62645) == 0x90 &&

            this.getByte(0x3B6BF) == 0x90 && //Removing exclusive gear rule of bots to fix them braking after receiving collisions 
            this.getByte(0x3B6C0) == 0x90 &&
            this.getByte(0x3B6C1) == 0x90 &&
            this.getByte(0x3B6C2) == 0x90 &&
            this.getByte(0x3B6C3) == 0x90 &&
            this.getByte(0x3B6C4) == 0x90
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
        this.setByte(0x3E3C1, 0x90)
        this.setByte(0x3E3C2, 0x90)

        this.setByte(0x6210C, 0x90)
        this.setByte(0x6210D, 0x90)

        this.setByte(0x62115, 0x0D)
        this.setByte(0x62116, 0x28)
        this.setByte(0x62117, 0x10)

        this.setByte(0x2032CA, 0x00)
        this.setByte(0x2032CB, 0x00)

        this.setByte(0x61C46, 0xC7)  //Fixing bot reversing segregation and ensuring semi-automatic transmission to them
        this.setByte(0x61C47, 0x05)
        this.setByte(0x61C48, 0x10)
        this.setByte(0x61C49, 0xA0)
        this.setByte(0x61C4A, 0x71)
        this.setByte(0x61C4B, 0x00)
        this.setByte(0x61C4C, 0x01)
        this.setByte(0x61C4D, 0x00)
        this.setByte(0x61C4E, 0x00)
        this.setByte(0x61C4F, 0x00)

        this.setByte(0x36BAF, 0x90)

        this.setByte(0x6263C, 0x8B)
        this.setByte(0x6263D, 0x05)
        this.setByte(0x6263E, 0x0C)
        this.setByte(0x6263F, 0xC0)
        this.setByte(0x62640, 0x71)
        this.setByte(0x62641, 0x00)
        this.setByte(0x62642, 0x83)
        this.setByte(0x62643, 0xF8)
        this.setByte(0x62644, 0x02)
        this.setByte(0x62645, 0x90)

        this.setByte(0x3B6BF, 0x90)
        this.setByte(0x3B6C0, 0x90)
        this.setByte(0x3B6C1, 0x90)
        this.setByte(0x3B6C2, 0x90)
        this.setByte(0x3B6C3, 0x90)
        this.setByte(0x3B6C4, 0x90)
    }

    private disable(){
        this.setByte(0x3E3C1, 0x74)
        this.setByte(0x3E3C2, 0x21)

        this.setByte(0x6210C, 0x72)
        this.setByte(0x6210D, 0x1E)

        this.setByte(0x62115, 0x25)
        this.setByte(0x62116, 0xC8)
        this.setByte(0x62117, 0x4E)

        this.setByte(0x2032CA, 0xF0)
        this.setByte(0x2032CB, 0x41)

        this.setByte(0x61C46, 0xC7)
        this.setByte(0x61C47, 0x05)
        this.setByte(0x61C48, 0xCC)
        this.setByte(0x61C49, 0xC0)
        this.setByte(0x61C4A, 0x71)
        this.setByte(0x61C4B, 0x00)
        this.setByte(0x61C4C, 0x00)
        this.setByte(0x61C4D, 0x00)
        this.setByte(0x61C4E, 0x00)
        this.setByte(0x61C4F, 0x00)

        this.setByte(0x36BAF, 0x38)

        this.setByte(0x6263C, 0xA3)
        this.setByte(0x6263D, 0xF8)
        this.setByte(0x6263E, 0xBF)
        this.setByte(0x6263F, 0x71)
        this.setByte(0x62640, 0x00)
        this.setByte(0x62641, 0x3D)
        this.setByte(0x62642, 0x00)
        this.setByte(0x62643, 0x80)
        this.setByte(0x62644, 0x00)
        this.setByte(0x62645, 0x00)

        this.setByte(0x3B6BF, 0x0F)
        this.setByte(0x3B6C0, 0x84)
        this.setByte(0x3B6C1, 0xCA)
        this.setByte(0x3B6C2, 0x01)
        this.setByte(0x3B6C3, 0x00)
        this.setByte(0x3B6C4, 0x00)
    }

}