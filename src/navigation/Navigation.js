import { Menu } from '@dhis2/ui'
import React from 'react'

import {
    GATEWAY_CONFIG_LIST_PATH,
    GATEWAY_CONFIG_LIST_LABEL,
    HOME_PATH,
    HOME_LABEL,
} from '../views'
import { NavigationItem } from './NavigationItem'
import { dataTest } from '../dataTest'

export const Navigation = () => (
    <Menu dataTest={dataTest('navigation-navigation')}>
        <NavigationItem path={HOME_PATH} label={HOME_LABEL} />

        <NavigationItem
            path={GATEWAY_CONFIG_LIST_PATH}
            label={GATEWAY_CONFIG_LIST_LABEL}
        />
    </Menu>
)
