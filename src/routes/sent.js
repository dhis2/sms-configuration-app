import React from 'react'
import {
    LayoutContainer,
    LayoutContent,
    LayoutSidebar,
} from '../shared/components/layout'
import { Navigation } from '../shared/components/navigation'
import { SentSmsList } from '../sms-sent'

const RouteSmsCommand = () => (
    <LayoutContainer>
        <LayoutSidebar>
            <Navigation />
        </LayoutSidebar>

        <LayoutContent>
            <SentSmsList />
        </LayoutContent>
    </LayoutContainer>
)

export default RouteSmsCommand
