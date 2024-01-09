import { Stage } from "./Stage";

export interface Rally{
    index: number,
    name: string,
    arcadeNumber: number,
    stages: Stage[],
}