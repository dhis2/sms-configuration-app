import React from 'react'
import i18n from '../../locales'
import {
    Table,
    TableHead,
    TableRowHead,
    TableRow,
    TableCell,
    TableCellHead,
    TableBody,
} from '@dhis2/ui'
import { PropTypes } from '@dhis2/prop-types'
import SentSmsTableItem from './SentSmsTableItem'

const SentSmsTable = ({ messages }) => (
    <Table>
        <TableHead>
            <TableRowHead>
                <TableCellHead>[Checkbox]</TableCellHead>
                <TableCellHead>{i18n.t('No.')}</TableCellHead>
                <TableCellHead>{i18n.t('Message')}</TableCellHead>
                <TableCellHead>{i18n.t('Phone number')}</TableCellHead>
                <TableCellHead>{i18n.t('Recipient')}</TableCellHead>
                <TableCellHead>{i18n.t('Status')}</TableCellHead>
                <TableCellHead>{i18n.t('Date')}</TableCellHead>
                <TableCellHead>{i18n.t('Delete')}</TableCellHead>
                <TableCellHead />
            </TableRowHead>
        </TableHead>
        <TableBody>
            {messages.length === 0 ? (
                <TableRow>
                    <TableCell>{i18n.t('No messages to display')}</TableCell>
                </TableRow>
            ) : (
                messages.map(message => (
                    <SentSmsTableItem key={message.id} message={message} />
                ))
            )}
        </TableBody>
    </Table>
)

SentSmsTable.propTypes = {
    messages: PropTypes.arrayOf(PropTypes.object),
}

export default SentSmsTable
