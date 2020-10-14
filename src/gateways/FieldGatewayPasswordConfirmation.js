import {
    InputFieldFF,
    ReactFinalForm,
    composeValidators,
    createEqualTo,
    hasValue,
    string,
} from '@dhis2/ui'
import React from 'react'

import {
    FIELD_GATEWAY_PASSWORD_LABEL,
    FIELD_GATEWAY_PASSWORD_NAME,
} from './FieldGatewayPassword'
import { dataTest } from '../dataTest'
import i18n from '../locales'

const { Field } = ReactFinalForm

const equalToPassword = createEqualTo(
    FIELD_GATEWAY_PASSWORD_NAME,
    FIELD_GATEWAY_PASSWORD_LABEL
)

export const FIELD_GATEWAY_PASSWORD_CONFIRMATION_NAME = 'password-confirmation'

export const FieldGatewayPasswordConfirmation = () => (
    <Field
        required
        type="password"
        dataTest={dataTest('gateways-fieldgatewaypasswordconfirmation')}
        name={FIELD_GATEWAY_PASSWORD_CONFIRMATION_NAME}
        label={i18n.t('Confirm password')}
        component={InputFieldFF}
        validate={composeValidators(string, hasValue, equalToPassword)}
    />
)
