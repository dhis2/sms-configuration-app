import React from 'react'
import { PropTypes } from '@dhis2/prop-types'
import i18n from '@dhis2/d2-i18n'
import { dataTest } from '../../dataTest'
import {
    Button,
    SingleSelectField,
    SingleSelectOption,
    InputField,
} from '@dhis2/ui'
import { statusMap } from './translations'
import styles from './Filter.module.css'

// From https://github.com/dhis2/dhis2-core/blob/ea76fa86409613c9766d4508d65c88ac55c413c3/dhis-2/dhis-api/src/main/java/org/hisp/dhis/sms/incoming/SmsMessageStatus.java
const STATUS_FILTER_OPTIONS = [
    'ALL',
    'FAILED',
    'INCOMING',
    'PROCESSED',
    'PROCESSING',
    'SENT',
    'UNHANDLED',
].map(status => ({ value: status, label: statusMap[status] }))

export const Filter = ({
    status,
    setStatus,
    phoneNumber,
    setPhoneNumber,
    onReset,
}) => (
    <div
        data-test={dataTest('views-receivedsms-filter')}
        className={styles.container}
    >
        <div className={styles.inputStrip}>
            <SingleSelectField
                label={i18n.t('Filter by status')}
                inputWidth="200px"
                onChange={({ selected }) => setStatus(selected)}
                selected={status}
                dataTest="status-filter"
            >
                {STATUS_FILTER_OPTIONS.map(({ label, value }) => (
                    <SingleSelectOption
                        key={label}
                        label={label}
                        value={value}
                    />
                ))}
            </SingleSelectField>
            <InputField
                label={i18n.t('Filter by phone number')}
                inputWidth="250px"
                value={phoneNumber}
                onChange={({ value }) => setPhoneNumber(value)}
                dataTest="phone-number-filter"
            />
            <Button large onClick={onReset} dataTest="reset-filter-btn">
                {i18n.t('Reset filter')}
            </Button>
        </div>
    </div>
)

Filter.propTypes = {
    phoneNumber: PropTypes.string.isRequired,
    setPhoneNumber: PropTypes.func.isRequired,
    setStatus: PropTypes.func.isRequired,
    status: PropTypes.string.isRequired,
    onReset: PropTypes.func.isRequired,
}
