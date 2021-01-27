import React from 'react'
import i18n from '../../locales'
import { TableCell } from '@dhis2/ui'
import { PropTypes } from '@dhis2/prop-types'
import { SmsTable } from '../../sms_table/SmsTable'
import { Date, Time } from '../../time'
import { statusMap } from './translations'
import styles from './SentSmsTable.module.css'

export const SentSmsTable = ({
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
            i18n.t('Recipients'),
            i18n.t('Status'),
            i18n.t('Sent'),
        ]}
        rowRenderFn={message => (
            <>
                <TableCell>{message.message}</TableCell>
                <TableCell>
                    {/* After a deletion, for a short while the backend returns null for recipients */}
                    {(message.recipients || []).map((recipient, index, all) => (
                        <span
                            key={recipient + index}
                            className={styles.recipient}
                        >
                            {recipient}
                            {index !== all.length - 1 && ', '}
                        </span>
                    ))}
                </TableCell>
                <TableCell>{statusMap[message.status]}</TableCell>
                <TableCell>
                    <Date date={message.date} />
                    {', '}
                    <br />
                    <Time time={message.date} />
                </TableCell>
            </>
        )}
    />
)

SentSmsTable.propTypes = {
    messages: PropTypes.arrayOf(PropTypes.object).isRequired,
    pager: PropTypes.PropTypes.object.isRequired,
    selectedIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    setSelectedIds: PropTypes.func.isRequired,
}
