const fs = require("node:fs")
const { globSync } = require("glob")

const paths = globSync('**/src/asm/**/*.bin', {})
paths.forEach(path => {
    const pathArray = path.split("\\")
    const folder = pathArray.slice(0, -1).join("\\")
    const filename = pathArray[pathArray.length - 1]
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