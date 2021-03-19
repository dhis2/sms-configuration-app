import { TextAreaFieldFF, ReactFinalForm } from '@dhis2/ui'
import React from 'react'
import i18n from '../../locales'
import { dataTest } from '../../utils'
import { FIELD_COMMAND_DEFAULT_MESSAGE_NAME } from './fieldNames'

const { Field } = ReactFinalForm

export const FieldCommandDefaultMessage = () => (
    <Field
        dataTest={dataTest('forms-fieldcommanddefaultmessage')}
        name={FIELD_COMMAND_DEFAULT_MESSAGE_NAME}
        label={i18n.t('Reply message if no codes are sent (only the command)')}
        component={TextAreaFieldFF}
    />
)
