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

export const FieldSystemId = () => (
    <Field
        required
        dataTest={dataTest('smsgateway-fieldsystemid')}
        name="systemId"
        label={i18n.t('System id')}
        component={InputFieldFF}
        validate={composeValidators(string, hasValue)}
    />
)
