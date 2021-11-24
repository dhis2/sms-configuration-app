import { useDataQuery } from '@dhis2/app-runtime'
import { programTypes } from './programTypes.js'

const PROGRAMS_QUERY = {
    programs: {
        resource: 'programs',
        params: ({ registration }) => {
            const params = { paging: 'false' }

            if (registration === programTypes.PROGRAMS_WITH_REGISTRATION) {
                params.filter = 'programType:eq:WITH_REGISTRATION'
            } else if (
                registration === programTypes.PROGRAMS_WITHOUT_REGISTRATION
            ) {
                params.filter = 'programType:eq:WITHOUT_REGISTRATION'
            }

            return params
        },
    },
}

export const useReadProgramsQuery = (registration) =>
    useDataQuery(PROGRAMS_QUERY, { variables: { registration } })
