import { useDataEngine } from '@dhis2/app-runtime'
import { useSubmit } from '../../shared/index.js'
import { FIELD_SMS_CODES_NAME } from '../FieldSmsCode/index.js'

export const REPLACE_SMS_COMMAND_MUTATION = {
    resource: 'smsCommands',
    type: 'update',
    id: ({ commandId }) => commandId,

    // @TODO(non-critical):
    //   Make this produce static object structures
    // eslint-disable-next-line no-unused-vars
    data: ({ commandId, ...params }) => ({
        ...params,
        [FIELD_SMS_CODES_NAME]: Object.values(params[FIELD_SMS_CODES_NAME]),
    }),
}

export const UPDATE_SMS_COMMAND_MUTATION = {
    ...REPLACE_SMS_COMMAND_MUTATION,
    partial: true,
}

export const useUpdateCommandMutation = ({ onAfterChange, commandId }) => {
    const engine = useDataEngine()
    const onSubmit = (values) => {
        const variables = { ...values, commandId }
        return engine
            .mutate(REPLACE_SMS_COMMAND_MUTATION, { variables })
            .then(onAfterChange)
    }

    return useSubmit(onSubmit)
}
