import {
    InputFieldFF,
    ReactFinalForm,
    composeValidators,
    createEqualTo,
    hasValue,
    string,
} from '@dhis2/ui'
import React from 'react'
import i18n from '../../locales'
import { dataTest } from '../../shared'
import { FIELD_PASSWORD_LABEL, FIELD_PASSWORD_NAME } from '../FieldPassword'

const { Field } = ReactFinalForm

const equalToPassword = createEqualTo(FIELD_PASSWORD_NAME, FIELD_PASSWORD_LABEL)

export const FIELD_PASSWORD_CONFIRMATION_NAME = 'password-confirmation'

export const FieldPasswordConfirmation = () => (
    <Field
        required
        type="password"
        dataTest={dataTest('smsgateway-fieldpasswordconfirmation')}
        name={FIELD_PASSWORD_CONFIRMATION_NAME}
        label={i18n.t('Confirm password')}
        component={InputFieldFF}
        validate={composeValidators(string, hasValue, equalToPassword)}
    />
)
