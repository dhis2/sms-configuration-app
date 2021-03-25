import { useDataEngine } from '@dhis2/app-runtime'
import { useSubmit } from '../../../shared/utils'
import { formatSmsCodes } from './formatSmsCodes'

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
    ...REPLACE_SMS_COMMAND_MUTATION,
    partial: true,
}

export const useUpdateCommandMutation = ({ onAfterChange, commandId }) => {
    const engine = useDataEngine()
    const onSubmit = vars => {
        const variables = {
            ...formatSmsCodes(vars),
            commandId,
        }

        return engine
            .mutate(REPLACE_SMS_COMMAND_MUTATION, { variables })
            .then(onAfterChange)
    }

    return useSubmit(onSubmit)
}
