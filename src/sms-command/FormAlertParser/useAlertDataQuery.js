import { useDataQuery } from '@dhis2/app-runtime'

const ALERT_DATA_QUERY = {
    smsCommand: {
        resource: 'smsCommands',
        type: 'update',
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

export const useAlertDataQuery = (commandId) => {
    const variables = { commandId }
    return useDataQuery(ALERT_DATA_QUERY, { variables })
}
