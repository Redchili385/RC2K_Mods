import { intTo3CharString } from "@/util/function/intTo3CharString"

describe("intTo3CharString", () => {

    it("should return the same number if it has tree digits and it is positive", () => {
        //Given + When
        const threeCharString = intTo3CharString(123)

        //Then
        expect(threeCharString).toStrictEqual("123")
    })

    it("should return the number with one padding zero if it has two digits and it is positive", () => {
        //Given + When
        const threeCharString = intTo3CharString(12)

        //Then
        expect(threeCharString).toStrictEqual("012")
    })

    it("should return the number with two padding zeroes if it has one digit and it is positive", () => {
        //Given + When
        const threeCharString = intTo3CharString(1)

        //Then
        expect(threeCharString).toStrictEqual("001")
    })

    it("should return 999 if the number has more than three digits and it is positive", () => {
        //Given + When
        const threeCharString = intTo3CharString(1234)

        //Then
        expect(threeCharString).toStrictEqual("999")
    })

    it("should return 000 if the number is less than or equal to zero", () => {
        //Given + When
        const threeCharString = intTo3CharString(-123)

        //Then
        expect(threeCharString).toStrictEqual("000")
    })

})