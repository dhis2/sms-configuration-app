import {
    InputFieldFF,
    ReactFinalForm,
    composeValidators,
    string,
    hasValue,
} from '@dhis2/ui'
import { PropTypes } from '@dhis2/prop-types'
import React from 'react'

import { dataTest } from '../dataTest'
import i18n from '../locales'

const { Field } = ReactFinalForm
const isStringWithLengthAtLeastOne = composeValidators(string, hasValue)

export const createFieldGatewayKeyValuePairValueName = index =>
    `parameters[${index}].value`

export const FIELD_GATEWAY_KEY_VALUE_PAIR_VALUE_LABEL = i18n.t('Value')

export const GatewayKeyValuePairValueField = ({ index, isConfidential }) => (
    <Field
        type={isConfidential ? 'password' : 'text'}
        dataTest={dataTest('gateways-gatewaykeyvaluepair-value')}
        name={createFieldGatewayKeyValuePairValueName(index)}
        label={FIELD_GATEWAY_KEY_VALUE_PAIR_VALUE_LABEL}
        component={InputFieldFF}
        validate={isStringWithLengthAtLeastOne}
    />
)

GatewayKeyValuePairValueField.defaultProps = {
    isConfidential: false,
}

GatewayKeyValuePairValueField.propTypes = {
    index: PropTypes.number.isRequired,
    isConfidential: PropTypes.bool,
}
