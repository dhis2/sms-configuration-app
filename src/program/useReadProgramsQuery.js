import { useDataQuery } from '@dhis2/app-runtime'

export const PROGRAMS_QUERY = {
    programs: {
        resource: 'programs',
        params: ({ registration }) => {
            const params = { paging: 'false' }

            if (typeof registration !== 'undefined') {
                const filter = registration
                    ? 'programType:eq:WITH_REGISTRATION'
                    : 'programType:eq:WITHOUT_REGISTRATION'

                params.filter = filter
            }

            return params
        },
    },
}

export const useReadProgramsQuery = registration =>
    useDataQuery(PROGRAMS_QUERY, { variables: { registration } })
