import { TextAreaFieldFF, ReactFinalForm } from '@dhis2/ui'
import React from 'react'
import i18n from '../../locales/index.js'
import { dataTest } from '../../shared/index.js'

const { Field } = ReactFinalForm

export const FIELD_NO_USER_MESSAGE_NAME = 'noUserMessage'

export const FieldNoUserMessage = () => (
    <Field
        dataTest={dataTest('smscommand-fieldnousermessage')}
        name={FIELD_NO_USER_MESSAGE_NAME}
        label={i18n.t('No user message')}
        component={TextAreaFieldFF}
    />
)
