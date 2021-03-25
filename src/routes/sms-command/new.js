import React from 'react'
import {
    LayoutContainer,
    LayoutContent,
    LayoutSidebar,
} from '../../shared/components/layout'
import { Navigation } from '../../shared/components/navigation'
import { SmsCommandAdd } from '../../sms-command'

const RouteSmsCommandNew = () => (
    <LayoutContainer>
        <LayoutSidebar>
            <Navigation />
        </LayoutSidebar>

        <LayoutContent>
            <SmsCommandAdd />
        </LayoutContent>
    </LayoutContainer>
)

export default RouteSmsCommandNew
