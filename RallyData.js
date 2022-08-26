class RallyData{
    constructor(arrayBuffer, fileName){
        this.fileName = fileName;
        this.buffer = arrayBuffer;
        this.array = new Uint8Array(this.buffer)  //8 bit standard
        this.constants = {
            arcadeCarCountIndex: 2108012,
            arcadeStageCarConfigIndex: 2107388
        }
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
    getArcadeCarCount(){  //{1: 50, 2: 55...}
        const startIndex = this.constants.arcadeCarCountIndex
        const arcadeCarCount = {}
        for(let i = 0; i < 6; i++){
            arcadeCarCount[`${i+1}`] = this.array[startIndex + 4*i]
        }
        return arcadeCarCount
    }
    getArcadeStageCarConfig(){
        const arcadeOrder = [1,4,6,2,5,3]
        const startIndex = this.constants.arcadeStageCarConfigIndex
        const arcades = {}
        let currentIndex = startIndex
        for(let arcadeOrderIndex = 0; arcadeOrderIndex < 6; arcadeOrderIndex++){
            const arcadeLevel = arcadeOrder[arcadeOrderIndex]
            arcades[arcadeLevel] = {}
            for(let stageLevelIndex = 0; stageLevelIndex < 6; stageLevelIndex++){
                const stageLevel = stageLevelIndex + 1
                arcades[arcadeLevel][stageLevel] = {
                    unknownConfig1: this.array[currentIndex],
                    unknownConfig2: this.array[currentIndex + 4],
                    tyreType: this.array[currentIndex + 8],
                    gearbox: this.array[currentIndex + 12] 
                }
                currentIndex += 16
            }
        }
        console.log(arcades)
        return arcades
    }
    setArcadeStageCarConfig(arcadeDict){
        const arcadeOrder = [1,4,6,2,5,3]
        const startIndex = this.constants.arcadeStageCarConfigIndex
        let currentIndex = startIndex
        for(let arcadeOrderIndex = 0; arcadeOrderIndex < 6; arcadeOrderIndex++){
            const arcadeLevel = arcadeOrder[arcadeOrderIndex]
            for(let stageLevelIndex = 0; stageLevelIndex < 6; stageLevelIndex++){
                const stageLevel = stageLevelIndex + 1
                const stageConfig = arcadeDict[arcadeLevel][stageLevel]
                this.array[currentIndex]      = stageConfig.unknownConfig1
                this.array[currentIndex + 4]  = stageConfig.unknownConfig2
                this.array[currentIndex + 8]  = stageConfig.tyreType
                this.array[currentIndex + 12] = stageConfig.gearbox
                currentIndex += 16
            }
        }
        return this.array
    }
    getTransposedArcadeStageCarConfig(){
        const arcades = this.getArcadeStageCarConfig()
        const trasposedArcades = {
            1: {}, 2: {}, 3: {}, 4:{}, 5:{}, 6:{}
        }
        for(let arcadeLevel in arcades){
            for(let stageLevel in arcades[arcadeLevel]){
                const config = arcades[arcadeLevel][stageLevel]
                trasposedArcades[stageLevel][arcadeLevel] = config
            }
        }
        return trasposedArcades
    }
    setArcadeCarCount(arcadeCarCount){
        const startIndex = this.constants.arcadeCarCountIndex
        for(const arcadeLevel in arcadeCarCount){
            this.array[startIndex + 4*(parseInt(arcadeLevel)-1)] = arcadeCarCount[arcadeLevel]
        }
        return this.array
    }
    getTransposedCarCount(){
        const arcadeTimes = this.getArcadeTimes()
        const arcadeCarCount = this.getArcadeCarCount()
        const sumArcadeTimes = {}  //{1: [125,589...], ...}
        for(let i = 0; i < 6; i++){
            sumArcadeTimes[`${i+1}`] = []
        }
        for(let levelKey in arcadeTimes){
            const sumLevelTimes = arcadeTimes[levelKey].reduce((acc,value) => acc + value, 0)
            const arcadeLevel = this.getArcadeDictFromLevelKey(levelKey).arcadeLevel
            sumArcadeTimes[arcadeLevel].push(sumLevelTimes)
        }
        const arcadeCarDifficulty = {}
        for(let arcadeLevel in sumArcadeTimes){
            arcadeCarDifficulty[arcadeLevel] = arcadeCarCount[arcadeLevel]/sumArcadeTimes[arcadeLevel].reduce((acc,value) => acc + value, 0)
        }
        const transposedSumArcadeTimes = {}
        for(let arcadeLevel in sumArcadeTimes){
            transposedSumArcadeTimes[arcadeLevel] = []
            for(let i = 0; i < 6; i++){
                transposedSumArcadeTimes[arcadeLevel][i] = sumArcadeTimes[`${i+1}`][parseInt(arcadeLevel)-1]
            }
        }
        const transposedCarCount = {}
        for(let arcadeLevel in arcadeCarCount){
            transposedCarCount[arcadeLevel] = Math.round(
                transposedSumArcadeTimes[arcadeLevel].reduce((acc,value) => acc + value, 0) * 
                arcadeCarDifficulty[arcadeLevel]
            )
        }
        return transposedCarCount
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
    getArcadeDictFromLevelKey(name){  //L21 to {"arcadelevel": 1, "stageLevel": 1}
        if(name.length != 3){
            throw new Error("Name must have length 3")
        }
        return {
            arcadeLevel: arcadeOriginalIndexToActual[name[1]],
            stageLevel: parseInt(name[2])
        }
    }
    getLevelKeyFromArcadeDict(dict){
        return `L${arcadeActualIndexToOriginal[dict.arcadeLevel]}${dict.stageLevel}`
    }
    getTransposedLevels(arcadeTimes){
        const newArcadeTimes = {}
        for(const levelKey in arcadeTimes){
            const times = arcadeTimes[levelKey]
            const dict = this.getArcadeDictFromLevelKey(levelKey)
            const newDict = {
                arcadeLevel: dict.stageLevel,
                stageLevel: dict.arcadeLevel
            }
            const newLevelKey = this.getLevelKeyFromArcadeDict(newDict)
            newArcadeTimes[newLevelKey] = times
        }
        return newArcadeTimes
    }
    downloadTransposedLevels(){
        const arcadeTimes = this.getArcadeTimes()
        const newArcadeTimes = this.getTransposedLevels(arcadeTimes)
        this.setArcadeCarCount(this.getTransposedCarCount())
        this.setArcadeStageCarConfig(this.getTransposedArcadeStageCarConfig())
        downloadArcadeState(newArcadeTimes)
    }
}

arcadeOriginalIndexToActual = {
    2: 1,
    5: 2,
    7: 3,
    3: 4,
    6: 5,
    4: 6,
}

arcadeActualIndexToOriginal = {
    1: 2,
    2: 5,
    3: 7,
    4: 3,
    5: 6,
    6: 4,
}