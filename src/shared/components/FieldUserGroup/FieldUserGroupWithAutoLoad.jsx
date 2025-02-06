import { PropTypes } from '@dhis2/prop-types'
import { hasValue } from '@dhis2/ui'
import React from 'react'
import { FieldUserGroup } from './FieldUserGroup.jsx'
import { useReadUserGroupsQuery } from './useReadUserGroupsQuery.js'

export const FieldUserGroupWithAutoLoad = ({ required }) => {
    const { loading, error, data } = useReadUserGroupsQuery()
    const validate = required ? hasValue : undefined

    if (loading) {
        return (
            <FieldUserGroup
                required={required}
                loading
                showLoadingStatus
                userGroups={[]}
                validate={validate}
            />
        )
    }

    if (error) {
        return (
            <FieldUserGroup
                required={required}
                disabled
                userGroups={[]}
                errorText={error.message}
                validate={validate}
            />
        )
    }

    const { userGroups } = data.userGroups
    const options = userGroups.map(({ id, displayName }) => ({
        label: displayName,
        value: id,
    }))

    return (
        <FieldUserGroup
            required={required}
            userGroups={options}
            validate={validate}
        />
    )
}

FieldUserGroupWithAutoLoad.defaultProps = {
    required: false,
}

FieldUserGroupWithAutoLoad.propTypes = {
    required: PropTypes.bool,
}
