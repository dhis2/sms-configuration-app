import { getTypeLabelByType } from '../getTypeLabelByType'

describe('gateways - getTypeLabelByType', () => {
    it('should return the bulksms label when called with "bulksms"', () => {
        const expected = 'BulkSMS'
        const actual = getTypeLabelByType('bulksms')
        expect(actual).toBe(expected)
    })

    it('should return the clickatell label when called with "clickatell"', () => {
        const expected = 'Clickatell'
        const actual = getTypeLabelByType('clickatell')
        expect(actual).toBe(expected)
    })

    it('should return the generic label when called with "http"', () => {
        const expected = 'Generic'
        const actual = getTypeLabelByType('http')
        expect(actual).toBe(expected)
    })

    it('should return the generic label when the type is falsy', () => {
        const expected = 'Generic'
        const actual = getTypeLabelByType('')
        expect(actual).toBe(expected)
    })

    it('should return the provided value when the value is not handled', () => {
        const expected = 'unknown'
        const actual = getTypeLabelByType('unknown')
        expect(actual).toBe(expected)
    })
})
