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

export const FieldConfigurationTemplate = () => (
    <Field
        required
        dataTest={dataTest('smsgateway-fieldconfigurationtemplate')}
        name="configurationTemplate"
        label={i18n.t('Configuration template')}
        component={InputFieldFF}
        validate={composeValidators(string, hasValue)}
        helpText={i18n.t(
            'Please refer to the documentation for possible values'
        )}
    />
)
