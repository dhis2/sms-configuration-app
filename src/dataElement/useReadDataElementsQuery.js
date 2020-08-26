import { useDataEngine } from '@dhis2/app-runtime'
import { useEffect, useState } from 'react'

export const DATA_ELEMENTS_QUERY = {
    dataElements: {
        resource: 'dataElements',
        params: ({ ids }) => ({
            filter: `id:in:[${ids.join(',')}]`,
            fields: 'id,code,displayName,categoryCombo',
            paging: 'false',
        }),
    },
}

export const queryDataElements = (engine, variables) =>
    engine.query(DATA_ELEMENTS_QUERY, { variables }).then(data => ({
        ...data,
        dataElements: {
            ...data.dataElements,
            dataElements: data.dataElements.dataElements.map(
                ({ code, ...rest }) => ({
                    ...rest,
                    // only the number is needed
                    code: code.replace('DE_', ''),
                })
            ),
        },
    }))

// Not using `useDataQuery` here because the
// response needs to be formatted
export const useReadDataElementsQuery = ids => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [data, setData] = useState(null)
    const engine = useDataEngine()

    const refetch = ({ ids }) => {
        setLoading(true)
        setError(null)

        return queryDataElements(engine, ids)
            .then(setData)
            .catch(setError)
            .finally(() => setLoading(false))
    }

    // initial request
    useEffect(() => {
        refetch({ ids })
    }, [])

    return { loading, error, data, refetch }
}
