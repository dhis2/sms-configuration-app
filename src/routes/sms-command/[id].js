import React from 'react'
import {
    LayoutContainer,
    LayoutContent,
    LayoutSidebar,
} from '../../shared/components/layout'
import { Navigation } from '../../shared/components/navigation'
import { SmsCommandEdit } from '../../sms-command'

const RouteSmsCommandEdit = () => (
    <LayoutContainer>
        <LayoutSidebar>
            <Navigation />
        </LayoutSidebar>

        <LayoutContent>
            <SmsCommandEdit />
        </LayoutContent>
    </LayoutContainer>
)

export default RouteSmsCommandEdit
