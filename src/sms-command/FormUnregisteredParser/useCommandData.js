import { useDataQuery } from '@dhis2/app-runtime'

const query = {
    smsCommand: {
        resource: 'smsCommands',
        id: ({ commandId }) => commandId,
        params: {
            fields: [
                'name',
                'parserType',
                'receivedMessage',
                'userGroup[name,id]',
            ],
        },
    },
}

export const useCommandData = commandId => {
    const variables = { commandId }
    return useDataQuery(query, { variables })
}
