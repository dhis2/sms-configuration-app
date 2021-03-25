import React from 'react'
import {
    LayoutContainer,
    LayoutContent,
    LayoutSidebar,
} from '../shared/components/layout'
import { Navigation } from '../shared/components/navigation'
import { SmsCommandList } from '../sms-command'

const RouteSmsCommand = () => (
    <LayoutContainer>
        <LayoutSidebar>
            <Navigation />
        </LayoutSidebar>

        <LayoutContent>
            <SmsCommandList />
        </LayoutContent>
    </LayoutContainer>
)

export default RouteSmsCommand
