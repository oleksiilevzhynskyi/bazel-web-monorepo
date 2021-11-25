import { partitionBy2 } from "../utils"

describe('Utils', () => {
    describe('#partitionBy2', () => {
        it('should partition array by number gt than 2', () => {
            expect(partitionBy2([10,20,1])).toEqual([[10, 20], [1]])
        })
    })
})