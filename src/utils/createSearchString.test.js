import { createSearchString } from './createSearchString'

describe('createSearchString', () => {
    it('returns a query string given a query', () => {
        const actual = createSearchString({
            param: 'value',
            otherParam: 'otherValue',
        })
        const expected = '?param=value&otherParam=otherValue'
        expect(actual).toBe(expected)
    })

    it('encodes values with special characters', () => {
        const actual = createSearchString({ param: '+&' })
        const expected = '?param=%2B%26'
        expect(actual).toBe(expected)
    })

    it('ignores the parameter "status" if its value is "ALL"', () => {
        const actual = createSearchString({ status: 'ALL' })
        const expected = '?'
        expect(actual).toBe(expected)
    })

    it('does not ignore other parameters with values of "ALL"', () => {
        const actual = createSearchString({ someParam: 'ALL' })
        const expected = '?someParam=ALL'
        expect(actual).toBe(expected)
    })
})
