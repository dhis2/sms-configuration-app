import React from 'react'
import { TableRow, TableCell } from '@dhis2/ui'
import { PropTypes } from '@dhis2/prop-types'

const SentSmsTableItem = ({ message }) => {
    const { number, message: text, phone, recipient, status, date } = message

    return (
        <TableRow>
            <TableCell>[Checkbox]</TableCell>
            <TableCell>{number}</TableCell>
            <TableCell>{text}</TableCell>
            <TableCell>{phone}</TableCell>
            <TableCell>{recipient}</TableCell>
            <TableCell>{status}</TableCell>
            <TableCell>{date}</TableCell>
            <TableCell>delete button</TableCell>
        </TableRow>
    )
}

SentSmsTableItem.propTypes = {
    message: PropTypes.shape({
        date: PropTypes.string,
        message: PropTypes.string,
        number: PropTypes.string,
        phone: PropTypes.string,
        recipient: PropTypes.string,
        status: PropTypes.string,
    }),
}

export default SentSmsTableItem
