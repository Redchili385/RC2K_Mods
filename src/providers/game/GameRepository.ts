import { GameGateway } from "@/core/gateway/GameGateway";
import { localeStageNames } from "./data/localeStageNames";

export interface GameRepository {
    getExe(): Uint8Array
    setExe(exe: Uint8Array): void
    getByte(index: number): number
    setByte(index: number, value: number): void
    getLocaleValueByToken(token: string): string | null
}

export class DefaultGameRepository implements GameGateway {

    exe: Uint8Array;

    constructor(initialExe: Uint8Array){
        this.exe = initialExe
    }

    getExe(): Uint8Array {
        return this.exe
    }
    setExe(exe: Uint8Array): void {
        this.exe = exe
    }

    getByte(index: number): number {
        return this.exe[index]
    };

    setByte(index: number, value: number): void {
        this.exe[index] = value
    };

    getLocaleValueByToken(token: string): string | null{
        const tokenIndex = localeStageNames.indexOf(token)
        if(tokenIndex == -1){
            return null
        }
        const valueStartIndex = tokenIndex + token.length + 2
        const valueEndIndex = localeStageNames.indexOf("\n", valueStartIndex)
        return localeStageNames.slice(valueStartIndex, valueEndIndex)
    }

}