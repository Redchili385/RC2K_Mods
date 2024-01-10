import { Stage } from "../entity/Stage";

export interface StageGateway{

    getStages(): Stage[]

    getStageById(id: number): Stage | null

}