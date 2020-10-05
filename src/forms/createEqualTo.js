import i18n from '@dhis2/d2-i18n'

const isEmpty = value =>
    typeof value === 'undefined' || value === null || value === ''

export const requiredArgumentErrorMessage =
    'Incorrect arguments provided when creating validator'

export const requireArgument = (value, type) => {
    if (isEmpty(value) || typeof value !== type) {
        throw new Error(requiredArgumentErrorMessage)
    }
}

const arrayIndexRegex = /\[(\d+)\]$/
const delimiter = '.'
const getByPath = (path, object) => {
    const segments = path.split(delimiter)
    const value = segments.reduce((curValue, segment) => {
        if (!curValue) return curValue

        if (segment.match(arrayIndexRegex)) {
            const arraySegment = segment.replace(arrayIndexRegex, '')
            const arrayIndex = parseInt(segment.match(arrayIndexRegex)[1], 10)

            if (!curValue[arraySegment]) return curValue[arraySegment]
            return curValue[arraySegment][arrayIndex]
        }

        const segmentValue = curValue[segment]
        if (!segmentValue) return null
        return segmentValue
    }, object)

    return value
}

export const createEqualTo = (key, description) => {
    requireArgument(key, 'string')

    const errorMessage = i18n.t(
        'Please make sure the value of this input matches the value in "{{otherField}}".',
        { otherField: description || key }
    )

    return (value, allValues) => {
        const comparisonValue = getByPath(key, allValues)
        return isEmpty(value) || value === comparisonValue
            ? undefined
            : errorMessage
    }
}
