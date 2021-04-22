import { PropTypes } from '@dhis2/prop-types'
import React from 'react'
import { dataTest } from '../../utils'
import styles from './PageSubHeadline.module.css'

export const PageSubHeadline = ({ children }) => (
    <h2
        className={styles.subHeadline}
        data-test={dataTest('shared-pagesubheadline')}
    >
        {children}
    </h2>
)

PageSubHeadline.propTypes = {
    children: PropTypes.string.isRequired,
}
