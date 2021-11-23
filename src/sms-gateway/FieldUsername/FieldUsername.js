import {
    InputFieldFF,
    ReactFinalForm,
    composeValidators,
    hasValue,
    string,
} from '@dhis2/ui'
import React from 'react'
import i18n from '../../locales/index.js'
import { dataTest } from '../../shared/index.js'

const { Field } = ReactFinalForm

export const FieldUsername = () => (
    <Field
        required
        dataTest={dataTest('smsgateway-fieldusername')}
        name="username"
        label={i18n.t('User name')}
        component={InputFieldFF}
        validate={composeValidators(string, hasValue)}
    />
)
