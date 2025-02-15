import { CoreBasicMod } from "../CoreBasicMod";

export default class MergedBasicMod implements CoreBasicMod{

  private readonly coreBasicMods: CoreBasicMod[]

  constructor(coreBasicMods: CoreBasicMod[]){
    this.coreBasicMods = coreBasicMods
  }

  checkEnabled(): boolean {
    return this.coreBasicMods.every(coreBasicMod => coreBasicMod.checkEnabled())
  }

  setEnabled(value: boolean): void {
    this.coreBasicMods.forEach(coreBasicMod => coreBasicMod.setEnabled(value))
  }
}
