import { Menu } from '@dhis2/ui'
import React from 'react'
import i18n from '../../../locales/index.js'
import { dataTest } from '../../utils/index.js'
import { NavigationItem } from './NavigationItem.jsx'

export const Navigation = () => (
    <Menu dataTest={dataTest('shared-navigation')}>
        <NavigationItem path="/home" label={i18n.t('Home')} exactMatch />

        <NavigationItem
            path="/sms-gateway"
            label={i18n.t('Gateway configuration')}
        />

        <NavigationItem path="/sms-command" label={i18n.t('Commands')} />

        <NavigationItem path="/sent" label={i18n.t('Sent')} />

        <NavigationItem path="/received" label={i18n.t('Received')} />
    </Menu>
)
