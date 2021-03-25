import { TextAreaFieldFF, ReactFinalForm } from '@dhis2/ui'
import React from 'react'
import i18n from '../../../locales'
import { dataTest } from '../../../shared/utils'

const { Field } = ReactFinalForm

export const FIELD_DEFAULT_MESSAGE_NAME = 'defaultMessage'

export const FieldDefaultMessage = () => (
    <Field
        dataTest={dataTest('forms-fieldcommanddefaultmessage')}
        name={FIELD_DEFAULT_MESSAGE_NAME}
        label={i18n.t('Reply message if no codes are sent (only the command)')}
        component={TextAreaFieldFF}
    />
)
