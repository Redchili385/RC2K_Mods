import { Rally } from "../entity/Rally";
import StageService from "./StageService";

export interface RallyService{
    getRallies: () => Rally[]
}

export class DefaultRallyService{

    private readonly stageService: StageService

    constructor(stageService: StageService){
        this.stageService = stageService
    }

}