import PropTypes from 'prop-types'
import React from 'react'
import { Navigation } from '../Navigation'
import { LayoutContainer } from './LayoutContainer'
import { LayoutContent } from './LayoutContent'
import { LayoutSidebar } from './LayoutSidebar'

export const TemplateSidebarNavContent = ({ children }) => (
    <LayoutContainer>
        <LayoutSidebar>
            <Navigation />
        </LayoutSidebar>

        <LayoutContent>{children}</LayoutContent>
    </LayoutContainer>
)

TemplateSidebarNavContent.propTypes = {
    children: PropTypes.any.isRequired,
}
