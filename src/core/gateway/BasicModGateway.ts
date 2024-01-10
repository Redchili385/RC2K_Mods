import { BasicMod } from "../entity/BasicMod";

export interface BasicModGateway{

    getBasicModById(id: string): BasicMod | null

    getBasicMods(): BasicMod[]

}