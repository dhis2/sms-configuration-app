import { FinalForm } from '@dhis2/ui'
import { useContext } from 'react'
import { useDataEngine } from '@dhis2/app-runtime'

import {
    REPLACE_SMS_COMMAND_MUTATION,
    UPDATE_SMS_COMMAND_MUTATION,
} from './useUpdateSmsCommandMutation'
import { AlertContext } from '../notifications'
import i18n from '../locales'

const { FORM_ERROR } = FinalForm

const identity = input => input

export const useUpdateCommand = ({
    onAfterChange,
    commandId,
    formatCommand = identity,
    replace = false,
}) => {
    const { addAlert } = useContext(AlertContext)
    const engine = useDataEngine()

    return variables => {
        const allVariables = {
            variables: {
                ...formatCommand(variables),
                commandId,
            },
        }

        const mutation = replace
            ? UPDATE_SMS_COMMAND_MUTATION
            : REPLACE_SMS_COMMAND_MUTATION

        return engine
            .mutate(mutation, allVariables)
            .then(onAfterChange)
            .catch(error => {
                const isValidationError = error.type === 'access'

                // Potential validation error, return it in a format final-form can handle
                if (isValidationError) {
                    const fallback = 'No error message was provided'
                    const message = error.message || i18n.t(fallback)

                    return {
                        [FORM_ERROR]: message,
                    }
                }

                // Notify on unexpected errors
                addAlert({ type: 'critical', message: error.message })
            })
    }
}
