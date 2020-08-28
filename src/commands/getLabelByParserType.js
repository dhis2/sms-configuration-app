import * as parserTypes from './types'

export const getLabelByParserTypes = parserType => {
    const type = Object.values(parserTypes).find(
        ({ value }) => value === parserType
    )

    return type?.label || parserType
}
