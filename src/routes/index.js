import React from 'react'
import { Home } from '../home'
import {
    LayoutContainer,
    LayoutContent,
    LayoutSidebar,
} from '../shared/components/layout'
import { Navigation } from '../shared/components/navigation'

const RouteHome = () => (
    <LayoutContainer>
        <LayoutSidebar>
            <Navigation />
        </LayoutSidebar>

        <LayoutContent>
            <Home />
        </LayoutContent>
    </LayoutContainer>
)

export default RouteHome
