import { useDataQuery } from '@dhis2/app-runtime'

// @TODO(non-critical):
//   The response for key value parser
//   does contain the information for "Data element category combination".
//   But it does not contain the id of the category option combo,
//   only the data element and a code.
export const READ_SMS_COMMAND_KEY_VALUE_PARSER_QUERY = {
    smsCommand: {
        resource: 'smsCommands',
        id: ({ id }) => id,
        params: {
            fields: [
                '*',
                'dataset[id,displayName,dataSetElements[dataElement[id,displayName,categoryCombo[categoryOptionCombos[id,displayName,code]]]]',
            ],
            paging: 'false',
        },
    },
}

export const useReadSmsCommandKeyValueParserQuery = id =>
    useDataQuery(READ_SMS_COMMAND_KEY_VALUE_PARSER_QUERY, { variables: { id } })
