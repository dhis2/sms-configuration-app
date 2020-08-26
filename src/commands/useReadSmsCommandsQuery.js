import { useDataQuery } from '@dhis2/app-runtime'

export const SMS_COMMANDS_QUERY = {
    smsCommands: {
        resource: 'smsCommands',
        pager: false,
        params: ({ ids } = {}) => ({
            // @TODO: Why is `paging: false` not working?
            paging: 'false',
            fields: '*',
            filter: ids ? `ids:in:[${ids.join(',')}]` : undefined,
        }),
    },
}

export const useReadSmsCommandsQuery = () => useDataQuery(SMS_COMMANDS_QUERY)
