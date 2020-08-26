import { SingleSelectFieldFF, ReactFinalForm, hasValue } from '@dhis2/ui'
import { PropTypes } from '@dhis2/prop-types'
import React from 'react'

import { dataTest } from '../dataTest'
import i18n from '../locales'

const { Field } = ReactFinalForm

export const FIELD_USER_GROUP_NAME = 'userGroup'

export const FieldUserGroup = ({ userGroups, loading, required, disabled }) => (
    <Field
        disabled={disabled}
        required={required}
        loading={loading}
        dataTest={dataTest('forms-fielduserGroup')}
        name={FIELD_USER_GROUP_NAME}
        label={i18n.t('UserGroup')}
        component={SingleSelectFieldFF}
        options={userGroups}
        validate={required && hasValue}
    />
)

FieldUserGroup.defaultProps = {
    disabled: false,
    loading: false,
    required: false,
}

FieldUserGroup.propTypes = {
    userGroups: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
        })
    ).isRequired,
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
    required: PropTypes.bool,
}
