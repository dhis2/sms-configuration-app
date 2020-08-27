import { useDataQuery } from '@dhis2/app-runtime'

export const READ_SMS_COMMAND_EVENT_REGISTRATION_PARSER_QUERY = {
    smsCommand: {
        resource: 'smsCommands',
        id: ({ id }) => id,
        params: {
            fields: [
                '*',
                'program[id,displayName]',
                'programStage[id,displayName,programStageDataElements[id,dataElement[id,displayName]]',
            ],
            paging: 'false',
        },
    },
}

export const useReadSmsCommandEventRegistrationParserQuery = id =>
    useDataQuery(READ_SMS_COMMAND_EVENT_REGISTRATION_PARSER_QUERY, {
        variables: { id },
    })
