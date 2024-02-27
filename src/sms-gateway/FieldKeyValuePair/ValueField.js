import { PropTypes } from '@dhis2/prop-types'
import {
    InputFieldFF,
    ReactFinalForm,
    composeValidators,
    string,
    hasValue,
} from '@dhis2/ui'
import React from 'react'
import i18n from '../../locales/index.js'
import { dataTest } from '../../shared/index.js'

const { Field, useFormState } = ReactFinalForm
const isStringWithLengthAtLeastOne = composeValidators(string, hasValue)

export const createFieldGatewayKeyValuePairValueName = (index) =>
    `parameters[${index}].value`

export const ValueField = ({ index, editMode, disabled }) => {
    const { confidential } = useFormState().values.parameters[index]

    return (
        <Field
            type={confidential ? 'password' : 'text'}
            placeholder={editMode && confidential ? '•••••••••' : null}
            dataTest={dataTest('smsgateway-fieldkeyvaluepair-value')}
            name={createFieldGatewayKeyValuePairValueName(index)}
            label={i18n.t('Value')}
            component={InputFieldFF}
            validate={editMode ? null : isStringWithLengthAtLeastOne}
            disabled={disabled}
        />
    )
}

ValueField.propTypes = {
    index: PropTypes.number.isRequired,
    disabled: PropTypes.bool,
    editMode: PropTypes.bool,
}
