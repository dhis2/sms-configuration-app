import { TextAreaFieldFF, ReactFinalForm } from '@dhis2/ui'
import React from 'react'

import { FIELD_COMMAND_NO_USER_MESSAGE_NAME } from './fieldNames'
import { dataTest } from '../dataTest'
import i18n from '../locales'

const { Field } = ReactFinalForm

export const FieldCommandNoUserMessage = () => (
    <Field
        dataTest={dataTest('forms-fieldcommandnousermessage')}
        name={FIELD_COMMAND_NO_USER_MESSAGE_NAME}
        label={i18n.t('No user message')}
        component={TextAreaFieldFF}
    />
)
