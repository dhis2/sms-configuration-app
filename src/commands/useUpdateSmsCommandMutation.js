import { useDataMutation } from '@dhis2/app-runtime'

export const UPDATE_SMS_COMMAND_MUTATION = {
    resource: 'smsCommands',
    type: 'update',
    id: ({ id }) => id,

    // @TODO(non-critical):
    //   Make this produce static object structures
    data: params => params,
}

export const useUpdateSmsCommandMutation = () =>
    useDataMutation(UPDATE_SMS_COMMAND_MUTATION)
