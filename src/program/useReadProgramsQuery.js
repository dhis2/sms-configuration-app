import { useDataQuery } from '@dhis2/app-runtime'

export const PROGRAMS_QUERY = {
    programs: {
        resource: 'programs',
        params: ({ registration }) => ({
            paging: 'false',
            filter: registration ? 'registration:eq:true' : undefined,
        }),
    },
}

export const useReadProgramsQuery = registration =>
    useDataQuery(PROGRAMS_QUERY, { variables: { registration } })
