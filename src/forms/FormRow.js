import React from 'react'
import { PropTypes } from '@dhis2/prop-types'
import styles from './FormRow.module.css'

export const FormRow = ({ children }) => (
    <div className={styles.formRow}>{children}</div>
)

FormRow.propTypes = {
    children: PropTypes.any.isRequired,
}
