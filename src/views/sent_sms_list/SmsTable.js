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
import SmsTableItem from './SmsTableItem'

const SmsTable = ({
    messages,
    cleanSelected,
    toggleSelected,
    toggleAll,
    allSelected,
    selected,
}) => (
    <Table>
        <TableHead>
            <TableRowHead>
                <TableCellHead>
                    <Checkbox
                        disabled={messages.length === 0}
                        onChange={toggleAll}
                        checked={allSelected}
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
                    <TableCell>{i18n.t('No SMSes to display')}</TableCell>
                </TableRow>
            ) : (
                messages.map(message => (
                    <SmsTableItem
                        key={message.messageId}
                        message={message}
                        isSelected={selected.includes(message.messageId)}
                        toggleSelected={toggleSelected}
                        cleanSelected={cleanSelected}
                    />
                ))
            )}
        </TableBody>
    </Table>
)

SmsTable.propTypes = {
    allSelected: PropTypes.bool.isRequired,
    cleanSelected: PropTypes.func.isRequired,
    messages: PropTypes.arrayOf(PropTypes.object).isRequired,
    selected: PropTypes.arrayOf(PropTypes.number).isRequired,
    toggleAll: PropTypes.func.isRequired,
    toggleSelected: PropTypes.func.isRequired,
}

export default SmsTable
