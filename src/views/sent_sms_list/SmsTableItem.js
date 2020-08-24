import React from 'react'
import { TableRow, TableCell, Checkbox } from '@dhis2/ui'
import { PropTypes } from '@dhis2/prop-types'
import moment from 'moment'
import { statusMap } from './translations'
import DeleteButton from './DeleteButton'

const SmsTableItem = ({
    message,
    toggleSelected,
    isSelected,
    cleanSelected,
}) => {
    const { message: text, status, date, messageId } = message

    /**
     *FIXME: after a deletion, for a short while the backend returns null for
     * recipients. We can't catch that with a default value since it's not
     * undefined, so we're doing it this way.
     */
    const recipients = message.recipients === null ? [] : message.recipients

    return (
        <TableRow>
            <TableCell>
                <Checkbox
                    onChange={() => toggleSelected(messageId)}
                    checked={isSelected}
                />
            </TableCell>
            <TableCell>{text}</TableCell>
            <TableCell>{recipients.join(', ')}</TableCell>
            <TableCell>{statusMap[status]}</TableCell>
            <TableCell>
                {moment(date).format('MMMM Do YYYY, h:mm:ss a')}
            </TableCell>
            <TableCell>
                <DeleteButton id={messageId} cleanSelected={cleanSelected} />
            </TableCell>
        </TableRow>
    )
}

SmsTableItem.propTypes = {
    cleanSelected: PropTypes.func.isRequired,
    isSelected: PropTypes.bool.isRequired,
    message: PropTypes.shape({
        date: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired,
        messageId: PropTypes.number.isRequired,
        status: PropTypes.string.isRequired,
        recipients: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
    toggleSelected: PropTypes.func.isRequired,
}

export default SmsTableItem
