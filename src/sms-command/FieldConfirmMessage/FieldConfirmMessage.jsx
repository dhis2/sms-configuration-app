import { TextAreaFieldFF, ReactFinalForm } from '@dhis2/ui'
import React from 'react'
import i18n from '../../locales/index.js'
import { dataTest } from '../../shared/index.js'

const { Field } = ReactFinalForm

export const FIELD_CONFIRM_MESSAGE_NAME = 'receivedMessage'

export const FieldConfirmMessage = () => (
    <Field
        dataTest={dataTest('smscommand-fieldconfirmmessage')}
        name={FIELD_CONFIRM_MESSAGE_NAME}
        label={i18n.t('Confirm message')}
        component={TextAreaFieldFF}
    />
)
