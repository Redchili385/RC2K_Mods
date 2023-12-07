import StageService from "@/core/StageService";
import { createContext } from "react";

export const GameContext = createContext({
    stageService: new StageService()
})

