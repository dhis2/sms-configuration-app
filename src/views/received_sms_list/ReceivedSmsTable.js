import i18n from '@dhis2/d2-i18n'
import { PropTypes } from '@dhis2/prop-types'
import { TableCell } from '@dhis2/ui'
import React from 'react'
import { SmsTable } from '../../sms_table/SmsTable'
import { Date, Time } from '../../time'
import styles from './ReceivedSmsTable.module.css'
import { statusMap } from './translations'

export const ReceivedSmsTable = ({
    messages,
    pager,
    selectedIds,
    setSelectedIds,
}) => (
    <SmsTable
        messages={messages}
        pager={pager}
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
        columns={[
            i18n.t('Message'),
            i18n.t('Phone number'),
            i18n.t('Status'),
            i18n.t('Sender'),
            i18n.t('Received'),
        ]}
        rowRenderFn={message => (
            <>
                <TableCell>{message.text}</TableCell>
                <TableCell>
                    <span className={styles.originator}>
                        {message.originator}
                    </span>
                </TableCell>
                <TableCell>{statusMap[message.smsstatus]}</TableCell>
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
            </>
        )}
    />
)

ReceivedSmsTable.propTypes = {
    messages: PropTypes.arrayOf(PropTypes.object).isRequired,
    pager: PropTypes.PropTypes.object.isRequired,
    selectedIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    setSelectedIds: PropTypes.func.isRequired,
}
