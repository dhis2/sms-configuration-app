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

const { Field, useFormState } = ReactFinalForm
const isStringWithLengthAtLeastOne = composeValidators(string, hasValue)

export const createFieldGatewayKeyValuePairValueName = index =>
    `parameters[${index}].value`

export const GatewayKeyValuePairValueField = ({ index }) => {
    const { confidential } = useFormState().values.parameters[index]

    return (
        <Field
            type={confidential ? 'password' : 'text'}
            dataTest={dataTest('gateways-gatewaykeyvaluepair-value')}
            name={createFieldGatewayKeyValuePairValueName(index)}
            label={i18n.t('Value')}
            component={InputFieldFF}
            validate={isStringWithLengthAtLeastOne}
        />
    )
}

GatewayKeyValuePairValueField.propTypes = {
    index: PropTypes.number.isRequired,
}
