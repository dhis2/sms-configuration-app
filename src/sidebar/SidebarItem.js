import { useHistory, useLocation } from 'react-router-dom'
import { MenuItem } from '@dhis2/ui'
import { PropTypes } from '@dhis2/prop-types'
import React from 'react'

export const SidebarItem = ({ label, path }) => {
    const history = useHistory()
    const location = useLocation()

    return (
        <MenuItem
            onClick={() => history.push(path)}
            active={location.path === path}
            label={label}
        />
    )
}

SidebarItem.propTypes = {
    label: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
}
