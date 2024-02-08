import {
    InputFieldFF,
    ReactFinalForm,
    composeValidators,
    createEqualTo,
    hasValue,
    string,
} from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import i18n from '../../locales/index.js'
import { dataTest } from '../../shared/index.js'
import {
    FIELD_PASSWORD_LABEL,
    FIELD_PASSWORD_NAME,
} from '../FieldPassword/index.js'

const { Field } = ReactFinalForm

const equalToPassword = createEqualTo(FIELD_PASSWORD_NAME, FIELD_PASSWORD_LABEL)

export const FIELD_PASSWORD_CONFIRMATION_NAME = 'password-confirmation'

export const FieldPasswordConfirmation = ({ editMode }) => (
    <Field
        required={!editMode}
        placeholder={editMode ? '•••••••••' : null}
        type="password"
        dataTest={dataTest('smsgateway-fieldpasswordconfirmation')}
        name={FIELD_PASSWORD_CONFIRMATION_NAME}
        label={i18n.t('Confirm password')}
        component={InputFieldFF}
        validate={
            editMode
                ? equalToPassword
                : composeValidators(string, hasValue, equalToPassword)
        }
    />
)

FieldPasswordConfirmation.propTypes = {
    editMode: PropTypes.bool,
}
