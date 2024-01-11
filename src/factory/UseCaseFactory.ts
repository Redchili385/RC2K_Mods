import { GetArcadeStages } from "@/core/usecase/GetArcadeStages"
import { GetBasicMods } from "@/core/usecase/GetBasicMods"
import { GetExe } from "@/core/usecase/GetExe"
import { SetArcadeStageBaseTimesByIds } from "@/core/usecase/SetArcadeStageBaseTimesByIds"
import { SetEnabledBasicModById } from "@/core/usecase/SetEnabledBasicModById"
import { SetExe } from "@/core/usecase/SetExe"

export interface UseCaseFactoryOutput{
    getExe: GetExe
    setExe: SetExe
    getBasicMods: GetBasicMods
    setEnabledBasicModById: SetEnabledBasicModById
    getArcadeStages: GetArcadeStages
    setArcadeStageBaseTimesByIds: SetArcadeStageBaseTimesByIds
}

export interface UseCaseFactory{
    create(): UseCaseFactoryOutput
}