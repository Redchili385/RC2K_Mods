import { DefaultGameRepository, GameRepository } from "@/providers/game/GameRepository"
import { stringToUtf8ByteArray } from "@/util/auxiliarFunctions"

describe("GameRepository", () => {

    describe("getExe", () => {

        it(`should retrieve the exe used on repository creation`, () => {
            //Given
            const expectedExe = new Uint8Array([1, 2, 37])
            const gameRepository: GameRepository = new DefaultGameRepository(expectedExe, "")

            //When
            const exe = gameRepository.getExe()

            //Then
            expect(exe).toStrictEqual(expectedExe)
        })

    })

    describe("setExe", () => {

        it("should change the exe that getExe will return", () => {
            //Given
            const initialExe =  new Uint8Array([3, 5, 7])
            const expectedExe = new Uint8Array([1, 2, 37])
            const gameRepository: GameRepository = new DefaultGameRepository(initialExe, "")

            //When
            gameRepository.setExe(expectedExe)

            //Then
            expect(gameRepository.getExe()).toStrictEqual(expectedExe)
        })

    })

    describe("getByte", () => {

        it("should get the byte of the exe on the desired position", () => {
            //Given
            const exe = new Uint8Array([1,3])
            const gameRepository: GameRepository = new DefaultGameRepository(exe, "")

            //When
            const byte = gameRepository.getByte(1)

            //Then
            expect(byte).toStrictEqual(3)
        })

        it("should return null if the index is out of bounds of the exe", () => {
            //Given
            const exe = new Uint8Array([1,3])
            const gameRepository: GameRepository = new DefaultGameRepository(exe, "")

            //When
            const byte = gameRepository.getByte(2)

            //Then
            expect(byte).toStrictEqual(null)
        })
        
    })

    describe("setByte", () => {

        it("should change the byte on exe on the desired position to the desired value", () => {
            //Given
            const exe = new Uint8Array([1, 3])
            const gameRepository: GameRepository = new DefaultGameRepository(exe, "")

            //When
            gameRepository.setByte(1, 5)

            //Then
            expect(gameRepository.getByte(1)).toStrictEqual(5)
        })

    })

    describe("getStringFromExe", () => {

        it("should get the ASCII representation of the string on the desired location and length", () => {
            //Given
            const expectedString = "xyz"
            const expectedStringBytes = stringToUtf8ByteArray(expectedString)
            const exe = new Uint8Array([1, 0, 0, 0])
            exe.set(expectedStringBytes, 1)
            const gameRepository: GameRepository = new DefaultGameRepository(exe, "")

            //When
            const string = gameRepository.getStringFromExe(1, 3)

            //Then
            expect(string).toStrictEqual(expectedString)
        })

        it("should get the available string even though the length requested is not fullified", () => {
            //Given
            const expectedString = "xyz"
            const expectedStringBytes = stringToUtf8ByteArray(expectedString)
            const exe = new Uint8Array([1, 0, 0, 0])
            exe.set(expectedStringBytes, 1)
            const gameRepository: GameRepository = new DefaultGameRepository(exe, "")

            //When
            const string = gameRepository.getStringFromExe(1, 5)

            //Then
            expect(string).toStrictEqual(expectedString)
        })

        it("should return an empty string if the index is out of bounds of the exe", () => {
            //Given
            const insertedString = "xyz"
            const stringBytes = stringToUtf8ByteArray(insertedString)
            const exe = new Uint8Array([1, 0, 0, 0])
            exe.set(stringBytes, 1)
            const gameRepository: GameRepository = new DefaultGameRepository(exe, "")
            const expectedString = ""

            //When
            const string = gameRepository.getStringFromExe(6, 3)

            //Then
            expect(string).toStrictEqual(expectedString)
        })

    })

    describe("setStringOnExe", () => {

        it("should set the ASCII representation on the exe", () => {
            //Given
            const exe = new Uint8Array([1, 0, 0, 0])
            const gameRepository: GameRepository = new DefaultGameRepository(exe, "")
            const inputString = "xyz"
            
            //When
            gameRepository.setStringOnExe(1, inputString)

            //Then
            expect(gameRepository.getStringFromExe(1, 3)).toBe(inputString)
        })

        it("should set the ASCII considering the exe limits", () => {
            //Given
            const exe = new Uint8Array([1, 0, 0, 0])
            const gameRepository: GameRepository = new DefaultGameRepository(exe, "")
            const inputString = "xyzaa"
            const expectedString = "xyz"
            
            //When
            gameRepository.setStringOnExe(1, inputString)

            //Then
            expect(gameRepository.getStringFromExe(1, 5)).toBe(expectedString)
        })

        it("should make no changes to the exe if the start index is out of bounds", () => {
            //Given
            const exe = new Uint8Array([1, 0, 0, 0])
            const gameRepository: GameRepository = new DefaultGameRepository(exe, "")

            //When
            gameRepository.setStringOnExe(4, "xyz")

            //Then
            expect(gameRepository.getExe()).toStrictEqual(exe)
        })

    })

    describe("getLocaleValueByToken", () => {

        it("should extract the value corresponding to the token with name", () => {
            //Given
            const localeStageNames = `----------------
            token1	value2

            token2		value3
            --------------------
            token3	value4
            ===========================================`
            const gameRepository: GameRepository = new DefaultGameRepository(
                new Uint8Array(), 
                localeStageNames
            )
            const expectedValue = "value3"

            //When
            const value = gameRepository.getLocaleValueByToken("token2")

            //Then
            expect(value).toStrictEqual(expectedValue)
        })

        it("should return null when the token is not found", () => {
            //Given
            const localeStageNames = ""
            const gameRepository: GameRepository = new DefaultGameRepository(
                new Uint8Array(), 
                localeStageNames
            )
            const expectedValue = null

            //When
            const value = gameRepository.getLocaleValueByToken("token2")

            //Then
            expect(value).toStrictEqual(expectedValue)
        })

        it("should load key values near end of string", () => {
            //Given
            const localeStageNames = `token1	value2`
            const gameRepository: GameRepository = new DefaultGameRepository(
                new Uint8Array(), 
                localeStageNames
            )
            const expectedValue = "value2"

            //When
            const value = gameRepository.getLocaleValueByToken("token1")

            //Then
            expect(value).toStrictEqual(expectedValue)

        })

        it("should return null if there is no whitespace after token", () => {
            //Given
            const localeStageNames = `token1`
            const gameRepository: GameRepository = new DefaultGameRepository(
                new Uint8Array(), 
                localeStageNames
            )
            const expectedValue = null

            //When
            const value = gameRepository.getLocaleValueByToken("token1")

            //Then
            expect(value).toStrictEqual(expectedValue)
        })

        it("should capture all the values after the first whitespace, including spaces and special characters", () => {
            //Given
            const localeStageNames = `token1	value2 '?:^+]-`
            const gameRepository: GameRepository = new DefaultGameRepository(
                new Uint8Array(), 
                localeStageNames
            )
            const expectedValue = "value2 '?:^+]-"

            //When
            const value = gameRepository.getLocaleValueByToken("token1")

            //Then
            expect(value).toStrictEqual(expectedValue)
        })

    })

})