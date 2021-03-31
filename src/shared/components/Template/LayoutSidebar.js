import PropTypes from 'prop-types'
import React from 'react'
import styles from './LayoutSidebar.module.css'

export const LayoutSidebar = ({ children }) => (
    <div className={styles.sidebar}>{children}</div>
)

LayoutSidebar.propTypes = {
    children: PropTypes.any.isRequired,
}
