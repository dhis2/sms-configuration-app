import { Menu } from '@dhis2/ui'
import React from 'react'

import {
    GATEWAY_CONFIG_LIST_PATH,
    GATEWAY_CONFIG_LIST_LABEL,
    HOME_PATH,
    HOME_LABEL,
} from '../views'
import { SidebarItem } from './SidebarItem'

export const Sidebar = () => (
    <Menu>
        <SidebarItem path={HOME_PATH} label={HOME_LABEL} />

        <SidebarItem
            path={GATEWAY_CONFIG_LIST_PATH}
            label={GATEWAY_CONFIG_LIST_LABEL}
        />
    </Menu>
)
