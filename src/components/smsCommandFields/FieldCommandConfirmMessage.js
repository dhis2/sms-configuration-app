import { TextAreaFieldFF, ReactFinalForm } from '@dhis2/ui'
import React from 'react'
import i18n from '../../locales'
import { dataTest } from '../../utils'
import { FIELD_COMMAND_CONFIRM_MESSAGE_NAME } from './fieldNames'

const { Field } = ReactFinalForm

export const FieldCommandConfirmMessage = () => (
    <Field
        dataTest={dataTest('commands-fieldcommandconfirmmessage')}
        name={FIELD_COMMAND_CONFIRM_MESSAGE_NAME}
        label={i18n.t('Confirm message')}
        component={TextAreaFieldFF}
    />
)
