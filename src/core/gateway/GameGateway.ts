export interface GameGateway{

    getExe(): Uint8Array

    setExe(exe: Uint8Array): void 

}