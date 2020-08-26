import React from 'react'
import { PropTypes } from '@dhis2/prop-types'
import cx from 'classnames'

import { dataTest } from '../dataTest'
import styles from './FormRow.module.css'

export const FormRow = ({ children, className }) => (
    <div
        className={cx(styles.formRow, className)}
        data-test={dataTest('forms-formrow')}
    >
        {children}
    </div>
)

FormRow.propTypes = {
    children: PropTypes.any.isRequired,
    className: PropTypes.string,
}
