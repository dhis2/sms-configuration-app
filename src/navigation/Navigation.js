import { Menu } from '@dhis2/ui'
import React from 'react'

import {
    GATEWAY_CONFIG_LIST_LABEL,
    GATEWAY_CONFIG_LIST_PATH,
    SMS_COMMAND_LIST_LABEL,
    SMS_COMMAND_LIST_PATH,
    SENT_SMS_LIST_LABEL,
    SENT_SMS_LIST_PATH,
    HOME_PATH,
    HOME_LABEL,
    RECEIVED_SMS_LIST_PATH,
    RECEIVED_SMS_LIST_LABEL,
} from '../views'
import { NavigationItem } from './NavigationItem'
import { dataTest } from '../dataTest'

export const Navigation = () => (
    <Menu dataTest={dataTest('navigation-navigation')}>
        <NavigationItem path={HOME_PATH} label={HOME_LABEL} exactMatch={true} />

        <NavigationItem
            path={GATEWAY_CONFIG_LIST_PATH}
            label={GATEWAY_CONFIG_LIST_LABEL}
        />

        <NavigationItem
            path={SMS_COMMAND_LIST_PATH}
            label={SMS_COMMAND_LIST_LABEL}
        />

        <NavigationItem path={SENT_SMS_LIST_PATH} label={SENT_SMS_LIST_LABEL} />

        <NavigationItem
            path={RECEIVED_SMS_LIST_PATH}
            label={RECEIVED_SMS_LIST_LABEL}
        />
    </Menu>
)
