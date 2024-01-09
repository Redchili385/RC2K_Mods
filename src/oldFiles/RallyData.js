class RallyData{
    constructor(arrayBuffer, fileName){
        this.fileName = fileName;
        this.buffer = arrayBuffer;
        this.array = new Uint8Array(this.buffer)  //8 bit standard
        this.constants = {
            arcadeCarCountIndex: 2108012,
            arcadeStageCarConfigIndex: 2107388,
            carsConfigIndex: 0x1C5D0C,
            carsBonusArcadeTimeIndex: 0x202B5C,
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
    getCarsConfig(){
        const cars = []
        const numberOfCars = 34
        const startIndex = this.constants.carsConfigIndex
        const configSizeInBytes = 176
        for(let i = 0; i < numberOfCars; i++){
            const currentCarStartIndex = startIndex + configSizeInBytes * i
            const carIndexNameBytes = this.array.slice(currentCarStartIndex, currentCarStartIndex + 0x18)
            const carIndexName = utf8ByteArrayToString(carIndexNameBytes)
            const carName = carIndexName.trim().split(' ').slice(1).join(' ')
            cars[i] = {}
            cars[i].name = carName
            cars[i].carIndexName = carIndexName
        }
        console.log(cars)
        return cars
    }
    getCarArcadeTimeBonusPercentage(){
        const startIndex = this.constants.carsBonusArcadeTimeIndex
        const carDataSizeInBytes = 4
        const numberOfCars = 23
        const bytes = this.array.slice(startIndex, startIndex + carDataSizeInBytes * numberOfCars)
        return new Float32Array(bytes.buffer)
    }
    buildCSVCarArcadeTimeBonus(){
        const initialString = `Rank, Car Name, Bonus Percentage Time`
        const carsConfig = this.getCarsConfig()
        const carsArcadeTimeBonus = this.getCarArcadeTimeBonusPercentage()
        const carsInfo = []
        for(let i = 0; i < carsConfig.length; i++){
            const carConfig = carsConfig[i]
            const arcadeTime = carsArcadeTimeBonus[i] ?? 1.03
            const prefixArcadeTime = arcadeTime < 1 ? "" : "+"//signForNegative
            const formattedArcadeTime = `${prefixArcadeTime}${Math.round((arcadeTime-1)*100)}%`
            carsInfo[i] = {
                carIndex: i,
                carName: carConfig.name,
                arcadeTime: arcadeTime,
                formattedArcadeTime
            }
        }
        console.log(carsInfo)
        carsInfo.sort((a, b) => a.arcadeTime - b.arcadeTime)
        carsInfo.forEach((carInfo, index) => carInfo.rank = index)
        return initialString + '\n' + carsInfo
            .map(carInfo => `${carInfo.rank+1},${carInfo.carName},${carInfo.formattedArcadeTime}`)
            .join('\n')
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
                    suspensionHeight: this.array[currentIndex],
                    suspensionStiffness: this.array[currentIndex + 4],
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
                this.array[currentIndex]      = stageConfig.suspensionHeight
                this.array[currentIndex + 4]  = stageConfig.suspensionStiffness
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
                trasposedArcades[7-parseInt(arcadeLevel)][7-parseInt(stageLevel)] = config
            }
        }
        console.log("trasposedArcades")
        console.log(trasposedArcades)
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
                transposedSumArcadeTimes[arcadeLevel][i] = sumArcadeTimes[7-parseInt(arcadeLevel)][5-i]
            }
        }
        const transposedCarCount = {}
        for(let arcadeLevel in arcadeCarCount){
            transposedCarCount[arcadeLevel] = Math.min(90, Math.round(
                transposedSumArcadeTimes[arcadeLevel].reduce((acc,value) => acc + value, 0) * 
                arcadeCarDifficulty[arcadeLevel]
            ))
        }
        console.log("sumArcadeTimes")
        console.log(sumArcadeTimes)
        console.log("transposedSumArcadeTimes")
        console.log(transposedSumArcadeTimes)
        console.log("transposedCarCount")
        console.log(transposedCarCount)
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
                arcadeLevel: 7 - parseInt(dict.arcadeLevel),
                stageLevel: 7 - parseInt(dict.stageLevel)
            }
            const newLevelKey = this.getLevelKeyFromArcadeDict(newDict)
            newArcadeTimes[newLevelKey] = times
        }
        console.log("newArcadeTimes")
        console.log(newArcadeTimes)
        return newArcadeTimes
    }
    downloadTransposedLevels(){
        const arcadeTimes = this.getArcadeTimes()
        const newArcadeTimes = this.getTransposedLevels(arcadeTimes)
        this.setArcadeCarCount(this.getTransposedCarCount())
        this.setArcadeStageCarConfig(this.getTransposedArcadeStageCarConfig())
        downloadArcadeState(newArcadeTimes)
    }
    downloadModifiedLevels(){
        const carConfigs = this.getArcadeStageCarConfig()
        for(const arcadeLevel in carConfigs){
            const arcade = carConfigs[arcadeLevel]
            for(const stageLevel in arcade){
                const stageConfigs = arcade[stageLevel]
                stageConfigs.suspensionHeight = 127
            }
        }
        this.setArcadeStageCarConfig(carConfigs)
        downloadArcadeState(this.getArcadeTimes())
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

//Constants

//1C7498: Tire Radius 3 Int32

//2027FC: Arcade Car config: Suspension height, stiffness, Tire Type, gearbox [36 stages * 4 configs (Int32)]
//202A3C: BRC+A8 Chammpionship bot times multiplier [2 championships * 6 rallies (float32)]
//202A6C: Car count for each Arcade [6 arcades (Int32)]
//202A84: Min position for each Arcade stage [6 arcade stages (Int32)]
//202AB4: Something related to bot cars difficult (willingness to accelerate) by Arcade [6 arcades (float32)]?? Capped [0.0,1.0]
//202AB4: Something unknown related to bot cars by Arcade [6 arcades (float32)]??
//202ACC: Extra stage initial time by arcade stage (Proportional to the sum of times of all squares) [36 stages (Int32)]
//202B5C: Extra proportional time by car [23 Cars - ordered By Id (float32)]
//202BB8: Base time of each square for each stage [36 stages * n squares each (ASCII)]
//2032C0: Unknown configurations (-2%, 5%, 30) [3 config (float32)]
//2035E0: Arcade bot car ranking [23 cars + 9 (int32)]

//204730 Important unknown address 204A78 Camera Settings! There are 52 of them (Data length 92)
