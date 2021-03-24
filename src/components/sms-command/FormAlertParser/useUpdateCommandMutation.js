import { useDataEngine } from '@dhis2/app-runtime'
import { useSubmit } from '../../../utils'

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
    const onSubmit = variables =>
        engine
            .mutate(updateAlertParserMutation, {
                variables: {
                    ...variables,
                    id,
                },
            })
            .then(onAfterChange)

    return useSubmit(onSubmit)
}
