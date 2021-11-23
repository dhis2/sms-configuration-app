import { useDataEngine } from '@dhis2/app-runtime'
import { useSubmit } from '../../shared'

export const UPDATE_COMMAND_MUTATION = {
    resource: 'smsCommands',
    type: 'update',
    partial: true,
    id: ({ commandId }) => commandId,

    // @TODO(non-critical):
    //   Make this produce static object structures
    // eslint-disable-next-line no-unused-vars
    data: ({ commandId, ...params }) => params,
}

export const useUpdateCommandMutation = ({ onAfterChange, commandId }) => {
    const engine = useDataEngine()

    const onSubmit = (values) => {
        const variables = { ...values, commandId }
        return engine
            .mutate(UPDATE_COMMAND_MUTATION, { variables })
            .then(onAfterChange)
    }

    return useSubmit(onSubmit)
}
