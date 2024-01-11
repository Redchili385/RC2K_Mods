import { BasicMod } from "../entity/BasicMod";

export interface BasicModGateway{

    getBasicModById(id: string): BasicMod | null

    setEnabledBasicModById(id: string, value: boolean): void

    getBasicMods(): BasicMod[]

}