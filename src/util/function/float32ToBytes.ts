export function float32ToBytes(value: number): number[] {
    const buffer = new ArrayBuffer(4);
    const view = new DataView(buffer);
    view.setFloat32(0, value, true);
    return Array.from(new Uint8Array(buffer));
}
