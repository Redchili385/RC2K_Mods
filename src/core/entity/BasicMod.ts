export interface BasicMod{
    id: string
    checkEnabled: () => boolean
    setEnabled: (value: boolean) => void
}