import PropTypes from 'prop-types'
import React from 'react'
import styles from './LayoutContent.module.css'

export const LayoutContent = ({ children }) => (
    <main className={styles.content}>{children}</main>
)

LayoutContent.propTypes = {
    children: PropTypes.any.isRequired,
}
