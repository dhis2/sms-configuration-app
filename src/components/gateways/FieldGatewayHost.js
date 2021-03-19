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

export const FieldGatewayHost = () => (
    <Field
        required
        dataTest={dataTest('gateways-fieldgatewayhost')}
        name="host"
        label={i18n.t('Host')}
        component={InputFieldFF}
        validate={composeValidators(string, hasValue)}
    />
)
