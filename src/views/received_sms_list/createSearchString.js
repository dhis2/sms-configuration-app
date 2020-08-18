import { STATUS_ALL } from './config'

export const createSearchString = query => {
    const queryString = Object.keys(query)
        .reduce((acc, paramKey) => {
            const paramValue = query[paramKey]
            const isDefaultStatus =
                paramKey === 'status' && paramValue === STATUS_ALL

            if (paramValue && !isDefaultStatus) {
                acc.push(`${paramKey}=${paramValue}`)
            }
            return acc
        }, [])
        .join('&')

    return `?${queryString}`
}
