import React from 'react'
import { PropTypes } from '@dhis2/prop-types'
import i18n from '@dhis2/d2-i18n'
import moment from 'moment'
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
import { Pagination } from './Pagination'
import styles from './SmsTable.module.css'
import { DeleteSmsButton } from './DeleteSmsButton'

const SmsTable = ({
    messages,
    pager,
    refetchList,
    selectedIds,
    setSelectedIds,
}) => {
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
                        <Checkbox checked={allSelected} onChange={toggleAll} />
                    </TableCellHead>
                    <TableCellHead>{i18n.t('Message')}</TableCellHead>
                    <TableCellHead>{i18n.t('Phone number')}</TableCellHead>
                    <TableCellHead>{i18n.t('Status')}</TableCellHead>
                    <TableCellHead>{i18n.t('Sender')}</TableCellHead>
                    <TableCellHead>{i18n.t('Date')}</TableCellHead>
                    <TableCellHead>{i18n.t('Delete')}</TableCellHead>
                </TableRowHead>
            </TableHead>
            <TableBody>
                {messages.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan="7" className={styles.noResults}>
                            {i18n.t('No received SMSs to display')}
                        </TableCell>
                    </TableRow>
                ) : (
                    messages.map(message => (
                        <TableRow key={message.id}>
                            <TableCell>
                                <Checkbox
                                    checked={selectedIdSet.has(message.id)}
                                    onChange={toggle.bind(null, message.id)}
                                />
                            </TableCell>
                            <TableCell>{message.text}</TableCell>
                            <TableCell>{message.originator}</TableCell>
                            <TableCell>{message.smsstatus}</TableCell>
                            <TableCell>
                                {message.user
                                    ? message.user.userCredentials.username
                                    : i18n.t('Unknown')}
                            </TableCell>
                            <TableCell>
                                {moment(message.receivedDate).format(
                                    'MMMM Do YYYY, h:mm:ss a'
                                )}
                            </TableCell>
                            <TableCell>
                                <DeleteSmsButton
                                    destructive
                                    small
                                    onComplete={refetchList}
                                    id={message.id}
                                >
                                    Delete
                                </DeleteSmsButton>
                            </TableCell>
                        </TableRow>
                    ))
                )}
            </TableBody>
            <TableFoot>
                <TableRow>
                    <TableCell colSpan="7">
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
    refetchList: PropTypes.func.isRequired,
    selectedIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    setSelectedIds: PropTypes.func.isRequired,
}

export { SmsTable }
