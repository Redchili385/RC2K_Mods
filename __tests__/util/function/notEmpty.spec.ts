import { notEmpty } from "@/util/function/notNull"

describe("notEmpty", () => {

    it("should return true if the value is not empty", () => {
        //Given + When
        const isEmpty = notEmpty(2)
        
        //Then
        expect(isEmpty).toStrictEqual(true)
    })

    it("should return false if the value is null", () => {
        //Given + When
        const isEmpty = notEmpty(null)
        
        //Then
        expect(isEmpty).toStrictEqual(false)
    })

    it("should return false if the value is undefined", () => {
        //Given + When
        const isEmpty = notEmpty(undefined)
        
        //Then
        expect(isEmpty).toStrictEqual(false)
    })

})