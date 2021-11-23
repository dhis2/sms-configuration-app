import { TextAreaFieldFF, ReactFinalForm } from '@dhis2/ui'
import React from 'react'
import i18n from '../../locales/index.js'
import { dataTest } from '../../shared/index.js'

const { Field } = ReactFinalForm

export const FIELD_WRONG_FORMAT_MESSAGE_NAME = 'wrongFormatMessage'

export const FieldWrongFormatMessage = () => (
    <Field
        dataTest={dataTest('smscommand-fieldwrongformatmessage')}
        name={FIELD_WRONG_FORMAT_MESSAGE_NAME}
        label={i18n.t('Wrong format message')}
        component={TextAreaFieldFF}
    />
)
