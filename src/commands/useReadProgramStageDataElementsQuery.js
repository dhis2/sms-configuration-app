import { useDataQuery } from '@dhis2/app-runtime'

const READ_PROGRAM_STAGE_DATA_ELEMENTS_QUERY = {
    programStageDataElements: {
        resource: 'programStages',
        id: ({ id }) => id,
        params: {
            fields: [
                'programStageDataElements[programStage[id,displayName],dataElement[id,displayName]]',
            ],
        },
    },
}

export const useReadProgramStageDataElementsQuery = ({ lazy, variables }) =>
    useDataQuery(READ_PROGRAM_STAGE_DATA_ELEMENTS_QUERY, { lazy, variables })
