export interface BasicMod{
    checkEnabled: () => boolean
    setEnabled: (value: boolean) => void
}