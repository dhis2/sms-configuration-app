import {
    InputFieldFF,
    ReactFinalForm,
    composeValidators,
    hasValue,
    string,
} from '@dhis2/ui'
import React from 'react'
import i18n from '../../../locales'
import { dataTest } from '../../../shared'

const { Field } = ReactFinalForm

export const FieldSystemId = () => (
    <Field
        required
        dataTest={dataTest('gateways-fieldgatewaysystemid')}
        name="systemId"
        label={i18n.t('System id')}
        component={InputFieldFF}
        validate={composeValidators(string, hasValue)}
    />
)
