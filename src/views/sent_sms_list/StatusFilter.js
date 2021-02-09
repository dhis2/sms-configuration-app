import React from 'react'
import { PropTypes } from '@dhis2/prop-types'
import { SingleSelectField, SingleSelectOption } from '@dhis2/ui'
import i18n from '../../locales'
import { statusMap } from './translations'
import styles from './StatusFilter.module.css'

// From https://github.com/dhis2/dhis2-core/blob/ea76fa86409613c9766d4508d65c88ac55c413c3/dhis-2/dhis-api/src/main/java/org/hisp/dhis/sms/outbound/OutboundSmsStatus.java
const STATUS_FILTER_OPTIONS = [
    'ALL',
    'DELIVERED',
    'ERROR',
    'FAILED',
    'OUTBOUND',
    'PENDING',
    'SCHEDULED',
    'SENT',
].map(status => ({ value: status, label: statusMap[status] }))

export const StatusFilter = ({ status, setStatus }) => (
    <div className={styles.container}>
        <SingleSelectField
            label={i18n.t('Filter by status')}
            inputWidth="200px"
            onChange={({ selected }) => setStatus(selected)}
            selected={status}
            dataTest="status-filter"
        >
            {STATUS_FILTER_OPTIONS.map(({ label, value }) => (
                <SingleSelectOption key={label} label={label} value={value} />
            ))}
        </SingleSelectField>
    </div>
)

StatusFilter.propTypes = {
    setStatus: PropTypes.func.isRequired,
    status: PropTypes.string.isRequired,
}
