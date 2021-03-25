import {
    InputFieldFF,
    ReactFinalForm,
    composeValidators,
    hasValue,
    string,
} from '@dhis2/ui'
import React from 'react'
import i18n from '../../locales'
import { dataTest } from '../../utils'

const { Field } = ReactFinalForm

export const FieldGatewayAuthToken = () => (
    <Field
        required
        dataTest={dataTest('gateways-fieldgatewayauthtoken')}
        name="authToken"
        label={i18n.t('Auth token')}
        component={InputFieldFF}
        validate={composeValidators(string, hasValue)}
    />
)
