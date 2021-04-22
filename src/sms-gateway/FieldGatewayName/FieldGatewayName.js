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

export const FieldGatewayName = () => (
    <Field
        required
        dataTest={dataTest('smsgateway-fieldgatewayname')}
        name="name"
        label={i18n.t('Name')}
        component={InputFieldFF}
        validate={composeValidators(string, hasValue)}
    />
)
