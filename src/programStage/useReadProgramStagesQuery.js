import { useDataQuery } from '@dhis2/app-runtime'

export const PROGRAM_STAGES_QUERY = {
    programStages: {
        resource: 'programStages',
        params: ({ programId }) => ({
            paging: 'false',
            filter: programId ? `program.id:eq:${programId}` : undefined,
        }),
    },
}

export const useReadProgramStagesQuery = ({ programId, lazy }) =>
    useDataQuery(PROGRAM_STAGES_QUERY, {
        variables: { programId },
        lazy,
    })
