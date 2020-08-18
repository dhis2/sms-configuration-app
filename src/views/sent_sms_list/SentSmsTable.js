import React from 'react'
import { Checkbox } from '@dhis2/ui'
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

const SentSmsTable = ({
    messages,
    toggleSelected,
    toggleAllSelected,
    isAllSelected,
    selected,
}) => (
    <Table>
        <TableHead>
            <TableRowHead>
                <TableCellHead>
                    <Checkbox
                        onChange={toggleAllSelected}
                        checked={isAllSelected}
                    />
                </TableCellHead>
                <TableCellHead>{i18n.t('Message')}</TableCellHead>
                <TableCellHead>{i18n.t('Recipients')}</TableCellHead>
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
                    <SentSmsTableItem
                        key={message.id}
                        message={message}
                        isSelected={selected.includes(message.id)}
                        toggleSelected={toggleSelected}
                    />
                ))
            )}
        </TableBody>
    </Table>
)

SentSmsTable.propTypes = {
    isAllSelected: PropTypes.bool.isRequired,
    messages: PropTypes.arrayOf(PropTypes.object).isRequired,
    selected: PropTypes.arrayOf(PropTypes.string).isRequired,
    toggleAllSelected: PropTypes.func.isRequired,
    toggleSelected: PropTypes.func.isRequired,
}

export default SentSmsTable
