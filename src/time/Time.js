import { PropTypes } from '@dhis2/prop-types'
import React from 'react'
import moment from 'moment'

import styles from './Time.module.css'

export const Time = ({ time }) => {
    const momentDate = moment(time)
    const formatted = momentDate.format('HH:mm:ss')

    return <span className={styles.time}>{formatted}</span>
}

Time.propTypes = {
    time: PropTypes.string.isRequired,
}
