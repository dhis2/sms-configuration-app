import { PropTypes } from '@dhis2/prop-types'
import React from 'react'

import { dataTest } from '../dataTest'
import styles from './PageSubHeadline.module.css'

export const PageSubHeadline = ({ children }) => (
    <h2
        className={styles.subHeadline}
        data-test={dataTest('headline-pagesubheadline')}
    >
        {children}
    </h2>
)

PageSubHeadline.propTypes = {
    children: PropTypes.string.isRequired,
}
