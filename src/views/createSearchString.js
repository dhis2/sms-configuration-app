export default query => {
    const queryString = Object.keys(query)
        .reduce((acc, paramKey) => {
            const paramValue = query[paramKey]
            const isDefaultStatus =
                paramKey === 'status' && paramValue === 'ALL'

            if (paramValue && !isDefaultStatus) {
                acc.push(`${paramKey}=${encodeURIComponent(paramValue)}`)
            }
            return acc
        }, [])
        .join('&')

    return `?${queryString}`
}
