import { useDataQuery } from '@dhis2/app-runtime'

export const DATA_SETS_QUERY = {
    dataSets: {
        resource: 'dataSets',
        params: {
            fields: ['id', 'displayName'],
            paging: 'false',
        },
    },
}

export const useReadDataSetsQuery = () => useDataQuery(DATA_SETS_QUERY)
