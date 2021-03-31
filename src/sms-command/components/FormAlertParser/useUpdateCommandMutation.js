import { useDataEngine } from '@dhis2/app-runtime'
import { useSubmit } from '../../../shared/utils'

const updateAlertParserMutation = {
    resource: 'smsCommands',
    type: 'update',
    id: ({ id }) => id,
    partial: true,
    data: ({ name, parserType, receivedMessage, userGroup }) => ({
        name,
        parserType,
        receivedMessage,
        userGroup,
    }),
}

export const useUpdateCommandMutation = ({ id, onAfterChange }) => {
    const engine = useDataEngine()
    const onSubmit = values => {
        const variables = { ...values, id }
        return engine
            .mutate(updateAlertParserMutation, { variables })
            .then(onAfterChange)
    }

    return useSubmit(onSubmit)
}
