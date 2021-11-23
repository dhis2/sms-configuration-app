import i18n from '@dhis2/d2-i18n'
import { PropTypes } from '@dhis2/prop-types'
import {
    Checkbox,
    Table,
    TableBody,
    TableCell,
    TableCellHead,
    TableFoot,
    TableHead,
    TableRow,
    TableRowHead,
} from '@dhis2/ui'
import React from 'react'
import { Pagination } from '../pagination/Pagination'
import styles from './SmsTable.module.css'

export const SmsTable = ({
    messages,
    pager,
    selectedIds,
    setSelectedIds,
    columns,
    rowRenderFn,
}) => {
    const selectedIdSet = new Set(selectedIds)
    const allSelected =
        messages.length > 0 && selectedIds.length === messages.length
    const toggle = (id) => {
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
                    {columns.map((column) => (
                        <TableCellHead key={column}>{column}</TableCellHead>
                    ))}
                </TableRowHead>
            </TableHead>
            <TableBody>
                {messages.length === 0 ? (
                    <TableRow>
                        <TableCell
                            colSpan={String(columns.length)}
                            className={styles.noResults}
                        >
                            {i18n.t('No SMSes to display')}
                        </TableCell>
                    </TableRow>
                ) : (
                    messages.map((message) => (
                        <TableRow key={message.id}>
                            <TableCell>
                                <Checkbox
                                    checked={selectedIdSet.has(message.id)}
                                    onChange={() => toggle(message.id)}
                                />
                            </TableCell>
                            {rowRenderFn(message)}
                        </TableRow>
                    ))
                )}
            </TableBody>
            <TableFoot>
                <TableRow>
                    <TableCell colSpan={String(columns.length)}>
                        <Pagination {...pager} />
                    </TableCell>
                </TableRow>
            </TableFoot>
        </Table>
    )
}

SmsTable.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.string).isRequired,
    messages: PropTypes.arrayOf(PropTypes.object).isRequired,
    pager: PropTypes.PropTypes.object.isRequired,
    rowRenderFn: PropTypes.func.isRequired,
    selectedIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    setSelectedIds: PropTypes.func.isRequired,
}
