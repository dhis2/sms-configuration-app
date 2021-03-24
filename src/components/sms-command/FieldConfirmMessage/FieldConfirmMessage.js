import { TextAreaFieldFF, ReactFinalForm } from '@dhis2/ui'
import React from 'react'
import i18n from '../../../locales'
import { dataTest } from '../../../utils'

const { Field } = ReactFinalForm

export const FIELD_CONFIRM_MESSAGE_NAME = 'receivedMessage'

export const FieldConfirmMessage = () => (
    <Field
        dataTest={dataTest('commands-fieldcommandconfirmmessage')}
        name={FIELD_CONFIRM_MESSAGE_NAME}
        label={i18n.t('Confirm message')}
        component={TextAreaFieldFF}
    />
)
