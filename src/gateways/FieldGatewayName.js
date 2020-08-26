import {
    InputFieldFF,
    ReactFinalForm,
    composeValidators,
    hasValue,
    string,
} from '@dhis2/ui'
import React from 'react'
import { dataTest } from '../dataTest'
import i18n from '../locales'

const { Field } = ReactFinalForm

export const FieldGatewayName = () => (
    <Field
        required
        dataTest={dataTest('gateways-fieldgatewayname')}
        name="name"
        label={i18n.t('Name')}
        component={InputFieldFF}
        validate={composeValidators(string, hasValue)}
    />
)
