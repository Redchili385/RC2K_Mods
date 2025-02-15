import { ByteManipulator } from "../ByteManipulator";
import { CoreBasicMod } from "../CoreBasicMod";
import createBotCar from "../../../asm/mods/createBotCar/createBotCar"
import createBotCarV2 from "../../../asm/mods/createBotCar/createBotCarV2"
import { parameters, previousParameters } from "./data/insane-bots/0.5.0"
import { int32ToBytes } from "@/util/function/int32ToBytes";
import { int8ToBytes } from "@/util/function/int8ToBytes";
import { uint8ToBytes } from "@/util/function/uint8ToBytes";
import { float32ToBytes } from "@/util/function/float32ToBytes";
import { serializeMap } from "@/util/function/serializeMap";
import { deserializeNumberMap } from "@/util/function/deserializeNumberMap";

export default class InsaneBots implements CoreBasicMod {

    private readonly getByte: (index: number) => number
    private readonly setByte: (index: number, value: number) => void
    private readonly baseAddress = 0x400C00  //.text section
    private readonly dataBaseAddress = 0x401C00 //.data section
    private readonly createBotCar: Uint8Array
    private readonly createBotCarV2: Uint8Array
    private readonly previousParameters: Map<number, number>

    constructor(byteManipulator: ByteManipulator){
        this.getByte = byteManipulator.getByte
        this.setByte = byteManipulator.setByte
        this.createBotCar = createBotCar
        this.createBotCarV2 = createBotCarV2
        this.previousParameters = deserializeNumberMap(previousParameters)
    }

    checkEnabled(): boolean{
        for(let index = 0; index < this.createBotCarV2.length; index++){  //Give bots the right number of completed squares on spawn
            if(this.getByte(0x437613 - this.baseAddress + index) != this.createBotCarV2[index]){
                return false
            }
        }
        if ((
            this.getByte(0x3E3C1) == 0x90 &&  //Allow Bots to reset car automatically after turning over
            this.getByte(0x3E3C2) == 0x90 &&

            this.getByte(0x6210C) == 0x90 &&  //Removing the desiredDoublePlaneSpeed calculation condition
            this.getByte(0x6210D) == 0x90 &&

            this.getByte(0x62114) == 0x90 &&   //Removing the sub
            this.getByte(0x62115) == 0x90 &&  
            this.getByte(0x62116) == 0x90 &&
            this.getByte(0x62117) == 0x90 &&
            this.getByte(0x62118) == 0x90 &&
            this.getByte(0x62119) == 0x90 &&

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
            this.getByte(0x3B6C4) == 0x90 &&

            this.getByte(0x46289E - this.baseAddress) == 0x6C &&  //Make bot go to the next valid position to prevent invalid cutting
            this.getByte(0x462935 - this.baseAddress) == 0x6C &&
            this.getByte(0x462BC8 - this.baseAddress) == 0x6C &&
            this.getByte(0x462BF2 - this.baseAddress) == 0x6C &&
            this.getByte(0x462C17 - this.baseAddress) == 0x6C &&
            this.getByte(0x462C6F - this.baseAddress) == 0x6C &&
            this.getByte(0x462D6A - this.baseAddress) == 0x6C &&
            this.getByte(0x462D86 - this.baseAddress) == 0x6C &&

            this.getByte(0x437185 - this.baseAddress) == 0x94 &&  //Handle bot creation using new validTrackPosition to not spawn bots on the other side on invalid shortcuts
            this.getByte(0x43718B - this.baseAddress) == 0x80 &&
            this.getByte(0x43719C - this.baseAddress) == 0x80 &&
            this.getByte(0x437268 - this.baseAddress) == 0x80 &&
            this.getByte(0x43726E - this.baseAddress) == 0x94 &&
            this.getByte(0x43727F - this.baseAddress) == 0x80 &&
            this.getByte(0x43733A - this.baseAddress) == 0x80 &&
            this.getByte(0x437353 - this.baseAddress) == 0x94 &&
            this.getByte(0x43737F - this.baseAddress) == 0x94 &&
            this.getByte(0x4373A6 - this.baseAddress) == 0x94 &&
            this.getByte(0x4373AC - this.baseAddress) == 0x80 &&
            this.getByte(0x4373C2 - this.baseAddress) == 0x80 &&
            this.getByte(0x4373C8 - this.baseAddress) == 0x94 &&
            this.getByte(0x43752A - this.baseAddress) == 0x94 &&
            this.getByte(0x437530 - this.baseAddress) == 0x94 &&
            this.getByte(0x4375FD - this.baseAddress) == 0x94 &&
            this.getByte(0x43773E - this.baseAddress) == 0x6C &&
            this.getByte(0x437744 - this.baseAddress) == 0x80
        ) == false){
            return false;
        }
        if(!this.checkLoadedParameters()){
            return false
        }
        return true
    }

    setEnabled(value: boolean){
        const isEnabled = this.checkEnabled()
        if(isEnabled == value){
            return;
        }
        if(value){
            this.enable()
        }
        else{
            this.disable()
        }
        const isEnabledAfter = this.checkEnabled()
        if(isEnabledAfter != value){
            console.error("Failed to change Insane Bots to " + value)
        }
    }

    private enable(){
        this.setByte(0x3E3C1, 0x90)
        this.setByte(0x3E3C2, 0x90)

        this.setByte(0x6210C, 0x90)
        this.setByte(0x6210D, 0x90)

        this.setByte(0x62114, 0x90)
        this.setByte(0x62115, 0x90)
        this.setByte(0x62116, 0x90)
        this.setByte(0x62117, 0x90)
        this.setByte(0x62118, 0x90)
        this.setByte(0x62119, 0x90)

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

        this.setByte(0x46289E - this.baseAddress, 0x6C)
        this.setByte(0x462935 - this.baseAddress, 0x6C)
        this.setByte(0x462BC8 - this.baseAddress, 0x6C)
        this.setByte(0x462BF2 - this.baseAddress, 0x6C)
        this.setByte(0x462C17 - this.baseAddress, 0x6C)
        this.setByte(0x462C6F - this.baseAddress, 0x6C)
        this.setByte(0x462D6A - this.baseAddress, 0x6C)
        this.setByte(0x462D86 - this.baseAddress, 0x6C)

        this.setByte(0x437185 - this.baseAddress, 0x94)  //Handle bot creation using new validTrackPosition to not spawn bots on the other side on invalid shortcuts
        this.setByte(0x43718B - this.baseAddress, 0x80)
        this.setByte(0x43719C - this.baseAddress, 0x80)
        this.setByte(0x437268 - this.baseAddress, 0x80)
        this.setByte(0x43726E - this.baseAddress, 0x94)
        this.setByte(0x43727F - this.baseAddress, 0x80)
        this.setByte(0x43733A - this.baseAddress, 0x80)
        this.setByte(0x437353 - this.baseAddress, 0x94)
        this.setByte(0x43737F - this.baseAddress, 0x94)
        this.setByte(0x4373A6 - this.baseAddress, 0x94)
        this.setByte(0x4373AC - this.baseAddress, 0x80)
        this.setByte(0x4373C2 - this.baseAddress, 0x80)
        this.setByte(0x4373C8 - this.baseAddress, 0x94)
        this.setByte(0x43752A - this.baseAddress, 0x94)
        this.setByte(0x437530 - this.baseAddress, 0x94)
        this.setByte(0x4375FD - this.baseAddress, 0x94)
        this.setByte(0x43773E - this.baseAddress, 0x6C)
        this.setByte(0x437744 - this.baseAddress, 0x80)

        this.createBotCarV2.forEach((value, index) => {
            this.setByte(0x437613 - this.baseAddress + index, value)
        })

        this.loadParameters()
    }

    private disable(){
        this.restoreParameters()

        this.createBotCar.forEach((value, index) => {
            this.setByte(0x437613 - this.baseAddress + index, value)
        })

        this.setByte(0x3E3C1, 0x74)
        this.setByte(0x3E3C2, 0x21)

        this.setByte(0x6210C, 0x72)
        this.setByte(0x6210D, 0x1E)

        this.setByte(0x62114, 0xD8)
        this.setByte(0x62115, 0x25)
        this.setByte(0x62116, 0xC8)
        this.setByte(0x62117, 0x4E)
        this.setByte(0x62118, 0x60)
        this.setByte(0x62119, 0x00)

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

        this.setByte(0x46289E - this.baseAddress, 0x70)
        this.setByte(0x462935 - this.baseAddress, 0x70)
        this.setByte(0x462BC8 - this.baseAddress, 0x70)
        this.setByte(0x462BF2 - this.baseAddress, 0x70)
        this.setByte(0x462C17 - this.baseAddress, 0x70)
        this.setByte(0x462C6F - this.baseAddress, 0x70)
        this.setByte(0x462D6A - this.baseAddress, 0x70)
        this.setByte(0x462D86 - this.baseAddress, 0x70)

        this.setByte(0x437185 - this.baseAddress, 0x98)  //Handle bot creation using new validTrackPosition to not spawn bots on the other side on invalid shortcuts
        this.setByte(0x43718B - this.baseAddress, 0x84)
        this.setByte(0x43719C - this.baseAddress, 0x84)
        this.setByte(0x437268 - this.baseAddress, 0x84)
        this.setByte(0x43726E - this.baseAddress, 0x98)
        this.setByte(0x43727F - this.baseAddress, 0x84)
        this.setByte(0x43733A - this.baseAddress, 0x84)
        this.setByte(0x437353 - this.baseAddress, 0x98)
        this.setByte(0x43737F - this.baseAddress, 0x98)
        this.setByte(0x4373A6 - this.baseAddress, 0x98)
        this.setByte(0x4373AC - this.baseAddress, 0x84)
        this.setByte(0x4373C2 - this.baseAddress, 0x84)
        this.setByte(0x4373C8 - this.baseAddress, 0x98)
        this.setByte(0x43752A - this.baseAddress, 0x98)
        this.setByte(0x437530 - this.baseAddress, 0x98)
        this.setByte(0x4375FD - this.baseAddress, 0x98)
        this.setByte(0x43773E - this.baseAddress, 0x70)
        this.setByte(0x437744 - this.baseAddress, 0x84)
    }

    private loadParameters(){
        for(const address_key in parameters){
            const address_key_split_arr = address_key.split("_")
            const address_str = address_key_split_arr[0]
            const datatype_str = address_key_split_arr[1]
            if(!address_str || !datatype_str){
                throw new Error("Invalid address key: " + address_key)
            }
            const address = this.processToFileAddress(parseInt(address_str))
            let value = parameters[address_key as keyof typeof parameters]
            let bytes_to_change: number[] = []
            if(datatype_str == "int32"){
                value = this.alignSpecialInt32Values(value)
                bytes_to_change = int32ToBytes(value)
            }
            if(datatype_str == "int8"){
                bytes_to_change = int8ToBytes(value)
            }
            if(datatype_str == "uint8"){
                bytes_to_change = uint8ToBytes(value)
            }
            if(datatype_str == "float32"){
                bytes_to_change = float32ToBytes(value)
            }
            for(let index = 0; index < bytes_to_change.length; index++){
                this.previousParameters.set(address + index, this.getByte(address + index))
                this.setByte(address + index, bytes_to_change[index]!)
            }
        }
    }

    private checkLoadedParameters(){
        for(const address_key in parameters){
            const address_key_split_arr = address_key.split("_")
            const address_str = address_key_split_arr[0]
            const datatype_str = address_key_split_arr[1]
            if(!address_str || !datatype_str){
                throw new Error("Invalid address key: " + address_key)
            }
            const address = this.processToFileAddress(parseInt(address_str))
            let value = parameters[address_key as keyof typeof parameters]
            let bytes_to_change: number[] = []
            if(datatype_str == "int32"){
                value = this.alignSpecialInt32Values(value)
                bytes_to_change = int32ToBytes(value)
            }
            if(datatype_str == "int8"){
                bytes_to_change = int8ToBytes(value)
            }
            if(datatype_str == "uint8"){
                bytes_to_change = uint8ToBytes(value)
            }
            if(datatype_str == "float32"){
                bytes_to_change = float32ToBytes(value)
            }
            for(let index = 0; index < bytes_to_change.length; index++){
                if(this.getByte(address + index) != bytes_to_change[index]){
                    return false
                }
            }
        }
        return true
    }

    private restoreParameters(){
        this.previousParameters.forEach((value, address) => {
            this.setByte(address, value)
        })
    }

    private alignSpecialInt32Values(value: number): number{
        value = Math.round(value)
        let baseAddress = 0
        const trackPolygonsAddress = 0x9e3738
        const trackPolygonsLength = 5146
        if(value >= trackPolygonsAddress && value < trackPolygonsAddress + trackPolygonsLength * 4){
            baseAddress = trackPolygonsAddress
        }
        const trackAnglesAddress = 0x9ed800
        const trackAnglesLength = 5146
        if(value >= trackAnglesAddress && value < trackAnglesAddress + trackAnglesLength * 4){
            baseAddress = trackAnglesAddress
        }
        if(baseAddress == 0){
            return value
        }
        const offset = value - baseAddress
        const alignedOffset = Math.floor(offset / 4) * 4
        return baseAddress + alignedOffset
    }

    private processToFileAddress(processAddress: number): number{
        if(processAddress > 0x4e0000){
            return processAddress - this.dataBaseAddress
        }
        return processAddress - this.baseAddress
    }
}
