import { useDataEngine } from '@dhis2/app-runtime'
import { useEffect, useState } from 'react'

import { queryDataElements } from '../dataElement'
import { queryDataSet } from '../dataSet'

export const queryDataElementsOfDataSet = (engine, variables) => {
    const nextVariables = { ...variables, fields: 'dataSetElements' }

    return queryDataSet(engine, nextVariables)
        .then(response => {
            const dataSets = response.dataSet
            const { dataSetElements } = dataSets
            const dataElementIds = dataSetElements.map(
                ({ dataElement }) => dataElement.id
            )

            return dataElementIds
        })
        .then(dataElementIds => {
            if (!dataElementIds.length) return []

            const dataElementVariables = { ids: dataElementIds }
            return queryDataElements(engine, dataElementVariables)
        })
}

export const useReadDataElementsOfDataSetQuery = dataSetId => {
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
        refetch({ id: dataSetId })
    }, [])

    return { loading, error, data, refetch }
}
