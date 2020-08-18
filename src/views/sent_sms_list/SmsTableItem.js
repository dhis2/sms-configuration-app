import React from 'react'
import { TableRow, TableCell, Checkbox } from '@dhis2/ui'
import { PropTypes } from '@dhis2/prop-types'
import moment from 'moment'
import { statusMap } from './translations'
import DeleteButton from './DeleteButton'

const SmsTableItem = ({ message, toggleSelected, isSelected }) => {
    const { message: text, recipients, status, date, id } = message

    return (
        <TableRow>
            <TableCell>
                <Checkbox
                    onChange={() => toggleSelected(id)}
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
                <DeleteButton id={id} />
            </TableCell>
        </TableRow>
    )
}

SmsTableItem.propTypes = {
    isSelected: PropTypes.bool.isRequired,
    message: PropTypes.shape({
        date: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired,
        recipients: PropTypes.arrayOf(PropTypes.string).isRequired,
        status: PropTypes.string.isRequired,
    }).isRequired,
    toggleSelected: PropTypes.func.isRequired,
}

export default SmsTableItem
