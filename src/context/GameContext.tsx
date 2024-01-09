import StageService from "@/core/service/StageService";
import { createContext } from "react";

export const GameContext = createContext({
    stageService: new StageService()
})

