import { Rally } from "../entity/Rally";

export interface RallyGateway{

    getRallyById(id: number): Rally | null

    getRallies(): Rally[]

}