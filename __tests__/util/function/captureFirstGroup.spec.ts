import { captureFirstGroup } from "@/util/function/captureFirstGroup"

describe("captureFirstGroup", () => {

    it("should capture the first regex group from the string", () => {
        //Given
        const regExp = new RegExp(/(.)a/)
        const string = "ba"
        const expectedCapturedString = "b"

        //When
        const capturedString = captureFirstGroup(regExp, string)

        //Then
        expect(capturedString).toStrictEqual(expectedCapturedString)
    })

    it("should return null if the RegExp fails to match", () => {
        //Given
        const regExp = new RegExp(/(.)a/)
        const string = "bb"

        //When
        const capturedString = captureFirstGroup(regExp, string)

        //Then
        expect(capturedString).toStrictEqual(null)
    })

    it("should return null if the RegExp matches but fails to capture the first group string", () => {
        //Given
        const regExp = new RegExp(/.a/)
        const string = "ba"

        //When
        const capturedString = captureFirstGroup(regExp, string)

        //Then
        expect(capturedString).toStrictEqual(null)
    })

})