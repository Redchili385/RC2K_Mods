export interface CoreBasicMod {
    checkEnabled: () => boolean
    setEnabled: (value: boolean) => void
}