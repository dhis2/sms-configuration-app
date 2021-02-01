import React, { useState, useCallback, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { PropTypes } from '@dhis2/prop-types'
import i18n from '@dhis2/d2-i18n'
import debounce from 'lodash.debounce'
import { dataTest } from '../../dataTest'
import {
    Button,
    SingleSelectField,
    SingleSelectOption,
    InputField,
    CircularLoader,
} from '@dhis2/ui'
import { useQueryParams } from '../../hooks'
import { createSearchString } from '../../utils'
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

const PhoneInputField = ({ phoneNumber, onChange }) => {
    const [value, setValue] = useState(phoneNumber)
    const [waiting, setWaiting] = useState(false)
    useEffect(() => {
        setValue(phoneNumber)
    }, [phoneNumber])
    const debouncedOnChange = useCallback(
        debounce(event => {
            onChange(event)
            setWaiting(false)
        }, 300),
        [onChange]
    )
    const handleChange = ({ value }) => {
        setValue(value)
        setWaiting(true)
        debouncedOnChange({ value })
    }

    return (
        <>
            <InputField
                label={i18n.t('Filter by phone number')}
                inputWidth="250px"
                onChange={handleChange}
                value={value}
            />
            {waiting ? <CircularLoader small /> : null}
        </>
    )
}
PhoneInputField.propTypes = {
    onChange: PropTypes.func.isRequired,
    phoneNumber: PropTypes.string,
}

const Filter = () => {
    const { status, phoneNumber, pageSize } = useQueryParams()
    const history = useHistory()

    const handleStatusChange = ({ selected }) => {
        history.push({
            search: createSearchString({
                status: selected,
                phoneNumber,
                pageSize,
                page: 1,
            }),
        })
    }
    const handlePhoneNumberChange = ({ value }) => {
        history.push({
            search: createSearchString({
                status,
                phoneNumber: value,
                pageSize,
                page: 1,
            }),
        })
    }
    const handleReset = () => {
        history.push({
            search: createSearchString({
                pageSize,
                page: 1,
            }),
        })
    }

    return (
        <div
            data-test={dataTest('views-receivedsms-filter')}
            className={styles.container}
        >
            <div className={styles.inputStrip}>
                <SingleSelectField
                    label={i18n.t('Filter by status')}
                    inputWidth="200px"
                    onChange={handleStatusChange}
                    selected={status}
                >
                    {STATUS_FILTER_OPTIONS.map(({ label, value }) => (
                        <SingleSelectOption
                            key={label}
                            label={label}
                            value={value}
                        />
                    ))}
                </SingleSelectField>
                <PhoneInputField
                    phoneNumber={phoneNumber}
                    onChange={handlePhoneNumberChange}
                />
                <Button large onClick={handleReset}>
                    {i18n.t('Reset filter')}
                </Button>
            </div>
        </div>
    )
}

export { Filter }
