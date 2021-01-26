import { PropTypes } from '@dhis2/prop-types'
import React from 'react'
import i18n from '@dhis2/d2-i18n'
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
import { Date, Time } from '../../time'
import Pagination from '../../pagination/Pagination'
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
                    <TableCellHead>{i18n.t('Phone number')}</TableCellHead>
                    <TableCellHead>{i18n.t('Status')}</TableCellHead>
                    <TableCellHead>{i18n.t('Sender')}</TableCellHead>
                    <TableCellHead>{i18n.t('Received')}</TableCellHead>
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
                    messages.map(message => (
                        <TableRow key={message.id}>
                            <TableCell>
                                <Checkbox
                                    checked={selectedIdSet.has(message.id)}
                                    onChange={toggle.bind(null, message.id)}
                                />
                            </TableCell>
                            <TableCell>{message.text}</TableCell>
                            <TableCell>
                                <span className={styles.originator}>
                                    {message.originator}
                                </span>
                            </TableCell>
                            <TableCell>{message.smsstatus}</TableCell>
                            <TableCell>
                                {message.user?.userCredentials?.username ||
                                    i18n.t('Unknown')}
                            </TableCell>
                            <TableCell>
                                <Date date={message.receiveddate} />
                                {', '}
                                <br />
                                <Time time={message.receiveddate} />
                            </TableCell>
                        </TableRow>
                    ))
                )}
            </TableBody>
            <TableFoot>
                <TableRow>
                    <TableCell colSpan="7">
                        <Pagination
                            pager={pager}
                            extraSearchParams={['phoneNumber']}
                        />
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

export { SmsTable }
