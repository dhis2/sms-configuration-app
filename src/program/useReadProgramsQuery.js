import { useDataQuery } from '@dhis2/app-runtime'

export const PROGRAMS_WITH_REGISTRATION = 'PROGRAMS_WITH_REGISTRATION'
export const PROGRAMS_WITHOUT_REGISTRATION = 'PROGRAMS_WITHOUT_REGISTRATION'
export const ALL_PROGRAMS = 'ALL_PROGRAMS'

export const PROGRAMS_QUERY = {
    programs: {
        resource: 'programs',
        params: ({ registration }) => {
            const params = { paging: 'false' }

            if (registration === PROGRAMS_WITH_REGISTRATION) {
                params.filter = 'programType:eq:WITH_REGISTRATION'
            } else if (registration === PROGRAMS_WITHOUT_REGISTRATION) {
                params.filter = 'programType:eq:WITHOUT_REGISTRATION'
            }

            return params
        },
    },
}

export const useReadProgramsQuery = registration =>
    useDataQuery(PROGRAMS_QUERY, { variables: { registration } })
