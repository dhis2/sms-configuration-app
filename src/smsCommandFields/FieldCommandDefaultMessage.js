import { TextAreaFieldFF, ReactFinalForm } from '@dhis2/ui'
import React from 'react'

import { FIELD_COMMAND_DEFAULT_MESSAGE_NAME } from './fieldNames'
import { dataTest } from '../dataTest'
import i18n from '../locales'

const { Field } = ReactFinalForm

export const FieldCommandDefaultMessage = () => (
    <Field
        dataTest={dataTest('forms-fieldcommanddefaultmessage')}
        name={FIELD_COMMAND_DEFAULT_MESSAGE_NAME}
        label={i18n.t('Reply message if no codes are sent (only the command)')}
        component={TextAreaFieldFF}
    />
)
