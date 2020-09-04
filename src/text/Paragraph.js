import { PropTypes } from '@dhis2/prop-types'
import React from 'react'

import { dataTest } from '../dataTest'
import styles from './Paragraph.module.css'

export const Paragraph = ({ children }) => (
    <p className={styles.paragraph} data-test={dataTest('text-paragraph')}>
        {children}
    </p>
)

Paragraph.propTypes = {
    children: PropTypes.string.isRequired,
}
