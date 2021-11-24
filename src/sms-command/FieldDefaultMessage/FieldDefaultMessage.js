import { TextAreaFieldFF, ReactFinalForm } from '@dhis2/ui'
import React from 'react'
import i18n from '../../locales/index.js'
import { dataTest } from '../../shared/index.js'

const { Field } = ReactFinalForm

export const FIELD_DEFAULT_MESSAGE_NAME = 'defaultMessage'

export const FieldDefaultMessage = () => (
    <Field
        dataTest={dataTest('smscommand-fielddefaultmessage')}
        name={FIELD_DEFAULT_MESSAGE_NAME}
        label={i18n.t('Reply message if no codes are sent (only the command)')}
        component={TextAreaFieldFF}
    />
)
