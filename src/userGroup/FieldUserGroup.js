import { SingleSelectFieldFF, ReactFinalForm, hasValue } from '@dhis2/ui'
import { PropTypes } from '@dhis2/prop-types'
import React from 'react'

import { dataTest } from '../dataTest'
import i18n from '../locales'

const { Field } = ReactFinalForm

export const FIELD_USER_GROUP_NAME = 'userGroup'

export const FieldUserGroup = ({
    userGroups,
    loading,
    required,
    disabled,
    errorText,
}) => (
    <Field
        disabled={disabled}
        error={!!errorText}
        validationText={errorText}
        required={required}
        loading={loading}
        dataTest={dataTest('forms-fieldusergroup')}
        name={FIELD_USER_GROUP_NAME}
        label={i18n.t('User group')}
        component={SingleSelectFieldFF}
        options={userGroups}
        validate={required && hasValue}
    />
)

FieldUserGroup.defaultProps = {
    disabled: false,
    loading: false,
    required: false,
    errorText: '',
}

FieldUserGroup.propTypes = {
    userGroups: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
        })
    ).isRequired,
    disabled: PropTypes.bool,
    errorText: PropTypes.string,
    loading: PropTypes.bool,
    required: PropTypes.bool,
}
