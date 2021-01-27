import React from 'react'
import { useHistory } from 'react-router-dom'
import i18n from '@dhis2/d2-i18n'
import { dataTest } from '../../dataTest'
import {
    Button,
    InputFieldFF,
    ReactFinalForm,
    SingleSelectFieldFF,
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

const { Form, Field } = ReactFinalForm

const Filter = () => {
    const { status, phoneNumber, pageSize } = useQueryParams()
    const initialValues = { status, phoneNumber }
    const history = useHistory()

    const navigateToFilteredUrl = ({ status, phoneNumber }) => {
        history.push({
            search: createSearchString({
                status,
                phoneNumber,
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
            <Form
                onSubmit={navigateToFilteredUrl}
                initialValues={initialValues}
            >
                {({ handleSubmit, pristine }) => (
                    <form onSubmit={handleSubmit} className={styles.inputStrip}>
                        <Field
                            name="status"
                            component={SingleSelectFieldFF}
                            options={STATUS_FILTER_OPTIONS}
                            label={i18n.t('Filter by status')}
                            inputWidth="200px"
                        />
                        <Field
                            name="phoneNumber"
                            component={InputFieldFF}
                            label={i18n.t('Filter by phone number')}
                            className={styles.phoneNumberField}
                            inputWidth="300px"
                        />
                        <Button large type="submit" disabled={pristine}>
                            {i18n.t('Filter')}
                        </Button>
                    </form>
                )}
            </Form>
        </div>
    )
}

export { Filter }
