import { useDataMutation } from '@dhis2/app-runtime'

export const REPLACE_SMS_COMMAND_MUTATION = {
    resource: 'smsCommands',
    type: 'update',
    id: ({ commandId }) => commandId,

    // @TODO(non-critical):
    //   Make this produce static object structures
    // eslint-disable-next-line no-unused-vars
    data: ({ commandId, ...params }) => params,
}

export const UPDATE_SMS_COMMAND_MUTATION = {
    resource: 'smsCommands',
    type: 'update',
    partial: true,
    id: ({ commandId }) => commandId,

    // @TODO(non-critical):
    //   Make this produce static object structures
    // eslint-disable-next-line no-unused-vars
    data: ({ commandId, ...params }) => params,
}

export const useUpdateSmsCommandMutation = () =>
    useDataMutation(REPLACE_SMS_COMMAND_MUTATION)
