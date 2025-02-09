import { PropTypes } from '@dhis2/prop-types'
import cx from 'classnames'
import React from 'react'
import { dataTest } from '../../utils/index.js'
import styles from './FormRow.module.css'

export const FormRow = ({ children, className }) => (
    <div
        className={cx(styles.formRow, className)}
        data-test={dataTest('shared-formrow')}
    >
        {children}
    </div>
)

FormRow.propTypes = {
    children: PropTypes.any.isRequired,
    className: PropTypes.string,
}
