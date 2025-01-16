import i18n from '@dhis2/d2-i18n'
import { PropTypes } from '@dhis2/prop-types'
import { TableCell } from '@dhis2/ui'
import React from 'react'
import { Date, Time, SmsTable } from '../../shared/index.js'
import { translations } from '../translations/index.js'
import styles from './ReceivedSmsTable.module.css'

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
            i18n.t('Received'),
        ]}
        rowRenderFn={(message) => (
            <>
                <TableCell>{message.text}</TableCell>
                <TableCell>
                    <span className={styles.originator}>
                        {message.originator}
                    </span>
                </TableCell>
                <TableCell>{translations[message.smsstatus]}</TableCell>
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
