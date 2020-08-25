import React from 'react'
import { TableRow, TableCell, Checkbox } from '@dhis2/ui'
import { PropTypes } from '@dhis2/prop-types'
import moment from 'moment'
import { statusMap } from './translations'
import DeleteButton from './DeleteButton'

const SmsTableItem = ({ sms, toggleSelected, isSelected, cleanSelected }) => {
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
            <TableCell>{recipients.join(', ')}</TableCell>
            <TableCell>{statusMap[status]}</TableCell>
            <TableCell>
                {moment(date).format('MMMM Do YYYY, h:mm:ss a')}
            </TableCell>
            <TableCell>
                <DeleteButton id={id} cleanSelected={cleanSelected} />
            </TableCell>
        </TableRow>
    )
}

SmsTableItem.propTypes = {
    cleanSelected: PropTypes.func.isRequired,
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
