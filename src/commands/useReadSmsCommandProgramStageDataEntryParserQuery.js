import { useDataQuery } from '@dhis2/app-runtime'

const READ_SMS_COMMAND_PROGRAM_STAGE_DATA_ENTRY_PARSER_QUERY = {
    smsCommand: {
        resource: 'smsCommands',
        id: ({ id }) => id,
        params: {
            fields: [
                '*',
                'program[id,displayName]',
                'programStage[id,displayName,programStageDataElements[dataElement[id,displayName]]]',
            ],
            paging: 'false',
        },
    },
}

export const useReadSmsCommandProgramStageDataEntryParserQuery = programStageId =>
    useDataQuery(READ_SMS_COMMAND_PROGRAM_STAGE_DATA_ENTRY_PARSER_QUERY, {
        variables: {
            id: programStageId,
        },
    })
