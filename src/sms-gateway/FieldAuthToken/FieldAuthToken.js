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

export const FieldAuthToken = ({ editMode }) => (
    <Field
        required={!editMode}
        type="password"
        placeholder={editMode ? '••••••••••••••••••' : null}
        dataTest={dataTest('smsgateway-fieldauthtoken')}
        name="authToken"
        label={i18n.t('Auth token')}
        component={InputFieldFF}
        validate={editMode ? null : composeValidators(string, hasValue)}
    />
)

FieldAuthToken.propTypes = {
    editMode: PropTypes.bool,
}
