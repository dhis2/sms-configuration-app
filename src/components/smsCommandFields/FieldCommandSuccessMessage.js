import { TextAreaFieldFF, ReactFinalForm } from '@dhis2/ui'
import React from 'react'
import i18n from '../../locales'
import { dataTest } from '../../utils'
import { FIELD_COMMAND_SUCCESS_MESSAGE_NAME } from './fieldNames'

const { Field } = ReactFinalForm

export const FieldCommandSuccessMessage = () => (
    <Field
        dataTest={dataTest('forms-fieldcommandsuccessmessage')}
        name={FIELD_COMMAND_SUCCESS_MESSAGE_NAME}
        label={i18n.t('Success message')}
        component={TextAreaFieldFF}
    />
)
