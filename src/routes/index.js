import React from 'react'
import {
    LayoutContainer,
    LayoutContent,
    LayoutSidebar,
} from '../shared/components/layout'
import { Navigation } from '../shared/components/navigation'
import { Overview } from '../sms-overview'

const RouteHome = () => (
    <LayoutContainer>
        <LayoutSidebar>
            <Navigation />
        </LayoutSidebar>

        <LayoutContent>
            <Overview />
        </LayoutContent>
    </LayoutContainer>
)

export default RouteHome
