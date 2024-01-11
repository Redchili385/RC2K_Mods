import { DefaultGameRepository } from "@/providers/game/GameRepository";
import { UseCaseFactory, UseCaseFactoryOutput } from "../UseCaseFactory";
import { StageService } from "@/providers/stage/StageService";
import { GameService } from "@/providers/game/GameService";
import { RallyService } from "@/providers/rally/RallyService";
import { ArcadeService } from "@/providers/arcade/ArcadeService";
import { DefaultGetExe } from "@/core/usecase/implementation/DefaultGetExe";
import { DefaultSetExe } from "@/core/usecase/implementation/DefaultSetExe";
import { DefaultGetBasicMods } from "@/core/usecase/implementation/DefaultGetBasicMods";
import { BasicModService } from "@/providers/basic-mod/BasicModsService";
import { ByteManipulator } from "@/providers/basic-mod/ByteManipulator";
import { DefaultSetEnabledBasicModById } from "@/core/usecase/implementation/DefaultSetEnabledBasicModById";
import { DefaultGetArcadeStages } from "@/core/usecase/implementation/DefaultGetArcadeStages";
import { DefaultSetArcadeStageBaseTimesByIds } from "@/core/usecase/implementation/DefaultSetArcadeStageBaseTimesByIds";

export class DefaultUseCaseFactory implements UseCaseFactory {

    readonly initialExe: Uint8Array

    constructor(initialExe: Uint8Array){
        this.initialExe = initialExe
    }

    create(): UseCaseFactoryOutput {
        const gameRepository = new DefaultGameRepository(this.initialExe)

        const gameGateway = new GameService(gameRepository)
        const basicModGateway = new BasicModService(gameRepository)
        const stageGateway = new StageService(gameRepository)
        const rallyGateway = new RallyService(gameRepository)
        const arcadeGateway = new ArcadeService(gameRepository)

        const getExe = new DefaultGetExe(gameGateway)
        const setExe = new DefaultSetExe(gameGateway)
        const getBasicMods = new DefaultGetBasicMods(basicModGateway)
        const setEnabledBasicModById = new DefaultSetEnabledBasicModById(basicModGateway)
        const getArcadeStages = new DefaultGetArcadeStages(arcadeGateway, stageGateway)
        const setArcadeStageBaseTimesByIds = new DefaultSetArcadeStageBaseTimesByIds(arcadeGateway)

        return {
            getExe,
            setExe,
            getBasicMods,
            setEnabledBasicModById,
            getArcadeStages,
            setArcadeStageBaseTimesByIds,
        }
    }

}