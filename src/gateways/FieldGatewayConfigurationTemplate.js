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

export const FieldGatewayConfigurationTemplate = () => (
    <Field
        required
        dataTest={dataTest('gateways-fieldgatewayconfigurationtemplate')}
        name="configurationTemplate"
        label={i18n.t('Configuration template')}
        component={InputFieldFF}
        validate={composeValidators(string, hasValue)}
        helpText={i18n.t(
            'Please refer to the documentation for possible values'
        )}
    />
)
