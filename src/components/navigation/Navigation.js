import { Menu } from '@dhis2/ui'
import React from 'react'
import { dataTest } from '../../dataTest'
import i18n from '../../locales'
import { NavigationItem } from './NavigationItem'

export const Navigation = () => (
    <Menu dataTest={dataTest('navigation-navigation')}>
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
