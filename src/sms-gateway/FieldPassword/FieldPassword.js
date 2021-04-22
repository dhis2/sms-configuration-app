import {
    InputFieldFF,
    ReactFinalForm,
    composeValidators,
    hasValue,
    string,
} from '@dhis2/ui'
import React from 'react'
import i18n from '../../locales'
import { dataTest } from '../../shared'

const { Field } = ReactFinalForm

export const FIELD_PASSWORD_NAME = 'password'
export const FIELD_PASSWORD_LABEL = i18n.t('Password')

export const FieldPassword = () => (
    <Field
        required
        type="password"
        dataTest={dataTest('smsgateway-fieldpassword')}
        name={FIELD_PASSWORD_NAME}
        label={FIELD_PASSWORD_LABEL}
        component={InputFieldFF}
        validate={composeValidators(string, hasValue)}
    />
)
