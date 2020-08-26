import { useDataQuery } from '@dhis2/app-runtime'

export const READ_SMS_COMMAND_PARSER_TYPE_QUERY = {
    smsCommand: {
        resource: 'smsCommands',
        id: ({ id }) => id,
        params: {
            fields: 'parserType',
            paging: 'false',
        },
    },
}

export const useReadSmsCommandParserTypeQuery = id =>
    useDataQuery(READ_SMS_COMMAND_PARSER_TYPE_QUERY, { variables: { id } })
