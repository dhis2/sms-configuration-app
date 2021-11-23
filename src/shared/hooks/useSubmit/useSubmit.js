import { FinalForm } from '@dhis2/ui'
import { useContext } from 'react'
import i18n from '../../../locales/index.js'
import { AlertContext } from '../../components/index.js'

const { FORM_ERROR } = FinalForm

export const useSubmit = (onSubmit) => {
    const { addAlert } = useContext(AlertContext)

    return (...args) =>
        onSubmit(...args).catch((e) => {
            const message = e.message || i18n.t('No error message was provided')

            // Notify on unexpected errors
            addAlert({ type: 'critical', message: e.message })

            return {
                [FORM_ERROR]: message,
            }
        })
}
