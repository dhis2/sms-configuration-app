import PropTypes from 'prop-types'
import React from 'react'
import { dataTest } from '../../utils/index.js'
import styles from './LayoutContainer.module.css'

export const LayoutContainer = ({ children }) => (
    <div
        className={styles.container}
        data-test={dataTest('shared-layoutcontainer')}
    >
        {children}
    </div>
)

LayoutContainer.propTypes = {
    children: PropTypes.any.isRequired,
}
