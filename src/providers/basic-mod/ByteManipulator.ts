export interface ByteManipulator {
    getByte: (index: number) => number
    setByte: (index: number, value: number) => void
}