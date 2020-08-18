import React from 'react'
import { TableRow, TableCell, Checkbox, Button } from '@dhis2/ui'
import { PropTypes } from '@dhis2/prop-types'
import moment from 'moment'
import i18n from '../../locales'
import { statusMap } from './translations'

const SmsTableItem = ({ message, toggleSelected, isSelected }) => {
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
            <TableCell>{statusMap[status]}</TableCell>
            <TableCell>
                {moment(date).format('MMMM Do YYYY, h:mm:ss a')}
            </TableCell>
            <TableCell>
                <Button small destructive onClick={onClick}>
                    {i18n.t('Delete')}
                </Button>
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
