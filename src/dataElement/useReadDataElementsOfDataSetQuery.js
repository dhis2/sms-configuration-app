import { useDataEngine } from '@dhis2/app-runtime'
import { useEffect, useState } from 'react'

export const DATA_ELEMENTS_QUERY = {
    dataSet: {
        resource: 'dataSets',
        id: ({ id }) => id,
        params: ({ filter }) => ({
            filter,
            fields: 'dataSetElements[dataElement[id,code,displayName]]',
        }),
    },
}

export const queryDataElementsOfDataSet = (engine, variables) =>
    engine.query(DATA_ELEMENTS_QUERY, { variables }).then(data => {
        const { dataSet } = data
        const { dataSetElements } = dataSet
        const formatted = dataSetElements.map(({ dataElement }) => dataElement)

        formatted.sort((left, right) => {
            const leftDisplayName = left.displayName
            const rightDisplayName = right.displayName

            if (leftDisplayName === rightDisplayName) {
                return 0
            }

            if (leftDisplayName < rightDisplayName) {
                return -1
            }

            return 1
        })

        return formatted
    })

export const useReadDataElementsOfDataSetQuery = (dataSetId, filter) => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [data, setData] = useState(null)
    const engine = useDataEngine()

    const refetch = variables => {
        setLoading(true)
        setError(null)

        return queryDataElementsOfDataSet(engine, variables)
            .then(setData)
            .catch(setError)
            .finally(() => setLoading(false))
    }

    // initial request
    useEffect(() => {
        refetch({ id: dataSetId, filter })
    }, [])

    return { loading, error, data, refetch }
}
