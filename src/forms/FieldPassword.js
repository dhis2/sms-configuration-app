import {
    InputFieldFF,
    ReactFinalForm,
    composeValidators,
    hasValue,
    string,
} from '@dhis2/ui'
import { PropTypes } from '@dhis2/prop-types'
import React from 'react'
import { dataTest } from '../dataTest'
import i18n from '../locales'

const { Field } = ReactFinalForm
const alwaysUndefined = () => undefined

export const FieldPassword = ({ required }) => (
    <Field
        required={required}
        dataTest={dataTest('forms-fieldpassword')}
        name="password"
        label={i18n.t('Password')}
        component={InputFieldFF}
        validate={composeValidators(
            string,
            required ? hasValue : alwaysUndefined
        )}
    />
)

FieldPassword.defaultProps = {
    required: false,
}

FieldPassword.propTypes = {
    required: PropTypes.bool,
}
