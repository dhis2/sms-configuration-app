import React from 'react'
import { TableRow, TableCell, Checkbox, Button } from '@dhis2/ui'
import { PropTypes } from '@dhis2/prop-types'
import i18n from '../../locales'

const SentSmsTableItem = ({ message, toggleSelected, isSelected }) => {
    const { message: text, recipients, status, date, id } = message
    const onClick = () => {
        console.log(`Delete message ${id}`)
    }

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
            <TableCell>{status}</TableCell>
            <TableCell>{date}</TableCell>
            <TableCell>
                <Button small destructive onClick={onClick}>
                    {i18n.t('Delete')}
                </Button>
            </TableCell>
        </TableRow>
    )
}

SentSmsTableItem.propTypes = {
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

export default SentSmsTableItem
