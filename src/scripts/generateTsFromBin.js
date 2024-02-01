const fs = require("node:fs")

const filenames = ["resetCar.bin", "resetCarV2.bin"]
const folder = "./src/asm/mods/resetCar"

filenames.forEach(filename => {
    const path = `${folder}/${filename}`
    const data = fs.readFileSync(path)
    const stringBytes = []
    new Uint8Array(data).forEach(byte => {
        stringBytes.push(`0x${byte.toString(16).padStart(2, "0")}`)
    })
    const arrayString = `[${stringBytes.join(", ")}]`
    const tsData = `const data = new Uint8Array(${arrayString})\nexport default data`
    const outputFilename = filename.slice(0, -3) + "ts"
    const outputPath = `${folder}/${outputFilename}`
    fs.writeFileSync(outputPath, tsData)
})