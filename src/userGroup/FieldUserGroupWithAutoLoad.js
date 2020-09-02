import { PropTypes } from '@dhis2/prop-types'
import React from 'react'

import { FieldUserGroup } from './FieldUserGroup'
import { useReadUserGroupsQuery } from './useReadUserGroupsQuery'

export const FieldUserGroupWithAutoLoad = ({ required }) => {
    const { loading, error, data } = useReadUserGroupsQuery()

    if (loading) {
        return (
            <FieldUserGroup
                required={required}
                loading
                showLoadingStatus
                userGroups={[]}
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
            />
        )
    }

    const { userGroups } = data.userGroups
    const options = userGroups.map(({ id, displayName }) => ({
        label: displayName,
        value: id,
    }))

    return <FieldUserGroup required={required} userGroups={options} />
}

FieldUserGroupWithAutoLoad.defaultProps = {
    required: false,
}

FieldUserGroupWithAutoLoad.propTypes = {
    required: PropTypes.bool,
}
