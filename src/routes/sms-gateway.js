import React from 'react'
import {
    LayoutContainer,
    LayoutContent,
    LayoutSidebar,
} from '../shared/components/layout'
import { Navigation } from '../shared/components/navigation'
import { SmsGatewayList } from '../sms-gateway'

const RouteSmsCommand = () => (
    <LayoutContainer>
        <LayoutSidebar>
            <Navigation />
        </LayoutSidebar>

        <LayoutContent>
            <SmsGatewayList />
        </LayoutContent>
    </LayoutContainer>
)

export default RouteSmsCommand
