import React from 'react'
import {
    LayoutContainer,
    LayoutContent,
    LayoutSidebar,
} from '../shared/components/layout'
import { Navigation } from '../shared/components/navigation'
import { ReceivedSmsList } from '../sms-received'

const RouteSmsCommand = () => (
    <LayoutContainer>
        <LayoutSidebar>
            <Navigation />
        </LayoutSidebar>

        <LayoutContent>
            <ReceivedSmsList />
        </LayoutContent>
    </LayoutContainer>
)

export default RouteSmsCommand
