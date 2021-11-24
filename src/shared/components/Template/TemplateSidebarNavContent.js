import PropTypes from 'prop-types'
import React from 'react'
import { Navigation } from '../Navigation/index.js'
import { LayoutContainer } from './LayoutContainer.js'
import { LayoutContent } from './LayoutContent.js'
import { LayoutSidebar } from './LayoutSidebar.js'

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
