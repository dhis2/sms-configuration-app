import PropTypes from 'prop-types'
import React from 'react'
import { Navigation } from '../Navigation/index.js'
import { LayoutContainer } from './LayoutContainer.jsx'
import { LayoutContent } from './LayoutContent.jsx'
import { LayoutSidebar } from './LayoutSidebar.jsx'

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
