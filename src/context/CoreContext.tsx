import { UseCaseFactoryOutput } from "@/factory/UseCaseFactory";
import { createContext, useContext } from "react";

export const CoreContext = createContext<UseCaseFactoryOutput | null>(null)

export function useCoreContext(): UseCaseFactoryOutput {
    const coreContext = useContext(CoreContext)
    if(coreContext == null){
        throw new Error("useCoreContext must be within CoreContext.Provider")
    }
    return coreContext
}
