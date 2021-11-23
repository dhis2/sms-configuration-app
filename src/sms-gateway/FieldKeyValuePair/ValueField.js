import { PropTypes } from '@dhis2/prop-types'
import {
    InputFieldFF,
    ReactFinalForm,
    composeValidators,
    string,
    hasValue,
} from '@dhis2/ui'
import React from 'react'
import i18n from '../../locales'
import { dataTest } from '../../shared'

const { Field, useFormState } = ReactFinalForm
const isStringWithLengthAtLeastOne = composeValidators(string, hasValue)

export const createFieldGatewayKeyValuePairValueName = (index) =>
    `parameters[${index}].value`

export const ValueField = ({ index }) => {
    const { confidential } = useFormState().values.parameters[index]

    return (
        <Field
            type={confidential ? 'password' : 'text'}
            dataTest={dataTest('smsgateway-fieldkeyvaluepair-value')}
            name={createFieldGatewayKeyValuePairValueName(index)}
            label={i18n.t('Value')}
            component={InputFieldFF}
            validate={isStringWithLengthAtLeastOne}
        />
    )
}

ValueField.propTypes = {
    index: PropTypes.number.isRequired,
}
