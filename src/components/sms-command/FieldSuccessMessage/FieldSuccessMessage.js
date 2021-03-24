import { TextAreaFieldFF, ReactFinalForm } from '@dhis2/ui'
import React from 'react'
import i18n from '../../../locales'
import { dataTest } from '../../../utils'

const { Field } = ReactFinalForm

export const FIELD_SUCCESS_MESSAGE_NAME = 'successMessage'

export const FieldSuccessMessage = () => (
    <Field
        dataTest={dataTest('forms-fieldcommandsuccessmessage')}
        name={FIELD_SUCCESS_MESSAGE_NAME}
        label={i18n.t('Success message')}
        component={TextAreaFieldFF}
    />
)
