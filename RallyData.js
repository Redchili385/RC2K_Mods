class RallyData{
    constructor(arrayBuffer, fileName){
        this.fileName = fileName;
        this.buffer = arrayBuffer;
        this.array = new Uint8Array(this.buffer)  //8 bit standard
        this.constants = {}
    }
    getArcadeTimes(){
        const arcadeIndex = this.getArcadeIndex();
        const array = this.array
        let i = arcadeIndex
        for(; i < array.length; i++){
            if(array[i] === 10 && array[i+1] === 10){
                break;
            }
        }
        const arcadeTimesData = array.slice(arcadeIndex, i-1)
        console.log(arcadeTimesData)
        const arcadeString = utf8ByteArrayToString(arcadeTimesData)
        console.log(arcadeString)
        const levelTimes = arcadeString.split(/\r?\n/).filter(str => str.length > 0);
        const levelTimesDict = {}
        levelTimes.forEach(levelString => {
            const levelTimesArr = levelString.split(' ');
            levelTimesDict[levelTimesArr[0]] = levelTimesArr.slice(1).map(str => parseInt(str))
        })
        return levelTimesDict
    }
    setArcadeTimes(levelTimesDict){
        const levelTimes = []
        for(let levelName in levelTimesDict){
            let times = levelTimesDict[levelName].map(value =>intTo3CharString(value))
            times.unshift(levelName)
            levelTimes.push(times.join(' '))
        }
        const arcadeString = levelTimes.join("\r\n")
        console.log(arcadeString)
        const arcadeTimesData = stringToUtf8ByteArray(arcadeString)
        console.log(arcadeTimesData)
        this.array.set(arcadeTimesData, this.getArcadeIndex())
        return this.array
    }
    getArcadeIndex(){
        if("arcadeIndex" in this.constants){
            return this.constants.arcadeIndex
        }
        let arcadeIndex = 0;
        let array = this.array
        while(!(
            array[arcadeIndex+0] === "L".charCodeAt(0) &&
            array[arcadeIndex+1] === "2".charCodeAt(0) &&
            array[arcadeIndex+2] === "1".charCodeAt(0)
        ) && arcadeIndex < array.length
        ){
            arcadeIndex++;
        }
        this.constants.arcadeIndex = arcadeIndex;
        return this.constants.arcadeIndex
    }
}