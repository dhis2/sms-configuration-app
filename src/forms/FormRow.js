import React from 'react'
import { PropTypes } from '@dhis2/prop-types'

import { dataTest } from '../dataTest'
import styles from './FormRow.module.css'

export const FormRow = ({ children }) => (
    <div className={styles.formRow} data-test={dataTest('forms-formrow')}>
        {children}
    </div>
)

FormRow.propTypes = {
    children: PropTypes.any.isRequired,
}
