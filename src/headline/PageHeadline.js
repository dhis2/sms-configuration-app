import { PropTypes } from '@dhis2/prop-types'
import React from 'react'

import { dataTest } from '../dataTest'
import styles from './PageHeadline.module.css'

export const PageHeadline = ({ children }) => (
    <h1
        className={styles.headline}
        data-test={dataTest('headline-pageheadline')}
    >
        {children}
    </h1>
)

PageHeadline.propTypes = {
    children: PropTypes.string.isRequired,
}
