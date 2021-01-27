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
    TableFoot,
} from '@dhis2/ui'
import { PropTypes } from '@dhis2/prop-types'
import Pagination from '../../pagination/Pagination'
import SmsTableItem from './SmsTableItem'
import styles from './SmsTable.module.css'

const SmsTable = ({ messages, pager, selectedIds, setSelectedIds }) => {
    const selectedIdSet = new Set(selectedIds)
    const allSelected =
        messages.length > 0 && selectedIds.length === messages.length
    const toggle = id => {
        if (selectedIdSet.has(id)) {
            selectedIdSet.delete(id)
        } else {
            selectedIdSet.add(id)
        }

        setSelectedIds(Array.from(selectedIdSet))
    }
    const toggleAll = () => {
        if (allSelected) {
            setSelectedIds([])
        } else {
            setSelectedIds(messages.map(({ id }) => id))
        }
    }

    return (
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
                    <TableCellHead>{i18n.t('Sent')}</TableCellHead>
                </TableRowHead>
            </TableHead>
            <TableBody>
                {messages.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan="7" className={styles.noResults}>
                            {i18n.t('No SMSes to display')}
                        </TableCell>
                    </TableRow>
                ) : (
                    messages.map(sms => (
                        <SmsTableItem
                            key={sms.id}
                            sms={sms}
                            isSelected={selectedIds.includes(sms.id)}
                            toggleSelected={toggle}
                        />
                    ))
                )}
            </TableBody>
            <TableFoot>
                <TableRow>
                    <TableCell colSpan="5">
                        <Pagination {...pager} />
                    </TableCell>
                </TableRow>
            </TableFoot>
        </Table>
    )
}

SmsTable.propTypes = {
    messages: PropTypes.arrayOf(PropTypes.object).isRequired,
    pager: PropTypes.PropTypes.object.isRequired,
    selectedIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    setSelectedIds: PropTypes.func.isRequired,
}

export default SmsTable
