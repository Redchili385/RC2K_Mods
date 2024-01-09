import { Stage } from "../entity/Stage";

export interface StageGateway{

    getStageById(id: number): Stage | null

}