export interface GameService{
    getExe(): Uint8Array
    sendExeUpdateSignal(): void
}

export class DefaultGameService implements GameService{

    private readonly exe: Uint8Array
    private readonly setBytes: (bytes: Uint8Array) => void

    constructor(bytes: Uint8Array, setBytes: (bytes: Uint8Array) => void){
        this.exe = bytes
        this.setBytes = setBytes
    }

    getExe(): Uint8Array {
        return this.exe
    }
    sendExeUpdateSignal(): void {
        this.setBytes(this.exe.slice())
    }

}