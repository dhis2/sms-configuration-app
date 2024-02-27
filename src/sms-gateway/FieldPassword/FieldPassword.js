import {
    InputFieldFF,
    ReactFinalForm,
    composeValidators,
    hasValue,
    string,
} from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import i18n from '../../locales/index.js'
import { dataTest } from '../../shared/index.js'

const { Field } = ReactFinalForm

export const FIELD_PASSWORD_NAME = 'password'
export const FIELD_PASSWORD_LABEL = i18n.t('Password')

export const FieldPassword = ({ editMode, disabled }) => (
    <Field
        required={!editMode}
        disabled={disabled}
        placeholder={editMode ? '•••••••••' : null}
        type="password"
        dataTest={dataTest('smsgateway-fieldpassword')}
        name={FIELD_PASSWORD_NAME}
        label={FIELD_PASSWORD_LABEL}
        component={InputFieldFF}
        validate={disabled ? null : composeValidators(string, hasValue)}
    />
)

FieldPassword.propTypes = {
    disabled: PropTypes.bool,
    editMode: PropTypes.bool,
}
