import { useDataQuery } from '@dhis2/app-runtime'

export const DATA_SET_QUERY = {
    dataSet: {
        resource: 'dataSets',
        id: ({ id }) => id,
        params: ({ fields = ['id', 'displayName'] } = {}) => ({
            fields,
        }),
    },
}

export const queryDataSet = (engine, variables) =>
    engine.query(DATA_SET_QUERY, { variables })

export const useReadDataSetQuery = id =>
    useDataQuery(DATA_SET_QUERY, {
        variables: { id },
    })
