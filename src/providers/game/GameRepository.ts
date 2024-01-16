import { captureFirstGroup, stringToUtf8ByteArray, utf8ByteArrayToString } from "@/util/auxiliarFunctions"

export interface GameRepository {
    getExe(): Uint8Array
    setExe(exe: Uint8Array): void
    getByte(index: number): number | null
    setByte(index: number, value: number): void
    getStringFromExe(index: number, maxLength: number): string
    setStringOnExe(index: number, string: string): void 
    getLocaleValueByToken(token: string): string | null
}

export class DefaultGameRepository implements GameRepository {

    exe: Uint8Array;
    localeStageNames: string

    constructor(initialExe: Uint8Array, localeStageNames: string){
        this.exe = initialExe
        this.localeStageNames = localeStageNames
    }

    getExe(): Uint8Array {
        return this.exe
    }
    setExe(exe: Uint8Array): void {
        this.exe = exe
    }

    getByte(index: number): number | null {
        return this.exe[index] ?? null
    };

    setByte(index: number, value: number): void {
        this.exe[index] = value
    };

    getStringFromExe(index: number, length: number): string {
        const slicedExe = this.exe.subarray(index, index + length)
        return utf8ByteArrayToString(slicedExe)
    }
    setStringOnExe(index: number, string: string): void {
        const stringBytes = stringToUtf8ByteArray(string);
        const maximumStringBytesLength = this.exe.length - index
        this.exe.set(stringBytes.slice(0, maximumStringBytesLength), index)
    }

    getLocaleValueByToken(token: string): string | null{
        const tokenIndex = this.localeStageNames.indexOf(token)
        if(tokenIndex == -1){
            return null
        }
        const nextNewLineIndex = this.localeStageNames.indexOf("\n", tokenIndex)
        const valueEndIndex = nextNewLineIndex == -1 ? this.localeStageNames.length : nextNewLineIndex
        const keyValueString = this.localeStageNames.slice(tokenIndex, valueEndIndex)
        const value = captureFirstGroup(RegExp(/\w+\s+(.+)/), keyValueString)
        if(value == null){
            return null
        }
        return value
    }

}