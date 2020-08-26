import { useDataQuery } from '@dhis2/app-runtime'

// @TODO(non-critical):
//   The response for key value parser
//   does contain the information for "Data element category combination".
//   But it does not contain the id of the category option combo,
//   only the data element and a code.
export const REACT_SMS_COMMAND_QUERY = {
    smsCommand: {
        resource: 'smsCommands',
        id: ({ id }) => id,
        params: {
            fields: '*,dataset[id,displayName]',
            paging: 'false',
        },
    },
}

export const useReadSmsCommandQuery = id =>
    useDataQuery(REACT_SMS_COMMAND_QUERY, { variables: { id } })
