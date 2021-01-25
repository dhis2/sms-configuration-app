import { TableRow, TableCell, Checkbox } from '@dhis2/ui'
import { PropTypes } from '@dhis2/prop-types'
import React from 'react'
import { Date, Time } from '../../time'
import { statusMap } from './translations'
import styles from './SmsTableItem.module.css'

const SmsTableItem = ({ sms, toggleSelected, isSelected }) => {
    const { message, status, date, id } = sms

    /**
     *FIXME: after a deletion, for a short while the backend returns null for
     * recipients. We can't catch that with a default value since it's not
     * undefined, so we're doing it this way.
     */
    const recipients = sms.recipients === null ? [] : sms.recipients

    return (
        <TableRow>
            <TableCell>
                <Checkbox
                    onChange={() => toggleSelected(id)}
                    checked={isSelected}
                />
            </TableCell>
            <TableCell>{message}</TableCell>
            <TableCell>
                {recipients.map((recipient, index, all) => (
                    <span key={recipient + index} className={styles.recipient}>
                        {recipient}
                        {index !== all.length - 1 && ', '}
                    </span>
                ))}
            </TableCell>
            <TableCell>{statusMap[status]}</TableCell>
            <TableCell>
                <Date date={date} />
                {', '}
                <Time time={date} />
            </TableCell>
        </TableRow>
    )
}

SmsTableItem.propTypes = {
    isSelected: PropTypes.bool.isRequired,
    sms: PropTypes.shape({
        date: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        recipients: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
    toggleSelected: PropTypes.func.isRequired,
}

export default SmsTableItem
