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
import { STATUS_FILTER_OPTIONS } from './config'
import { useQueryParams } from '../../hooks'
import { createSearchString } from '../../utils'
import styles from './Filter.module.css'

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
