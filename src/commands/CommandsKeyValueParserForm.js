import { Button, ReactFinalForm } from '@dhis2/ui'
import React from 'react'
import { PropTypes } from '@dhis2/prop-types'

import { FieldName } from '../forms/FieldName'
import { FieldCommandParser } from './FieldCommandParser'
import { FieldCompletenessMethod } from './FieldCompletenessMethod'
import { FieldUseCurrentPeriodForReporting } from './FieldUseCurrentPeriodForReporting'
import { FormRow } from '../forms/FormRow'
import { FieldDataSet, useReadDataSetsQuery } from '../dataSet'
import i18n from '../locales'

const { Form } = ReactFinalForm

export const CommandsForm = ({ onSubmit, initialValues }) => {
    const {
        loading: loadingDataSets,
        error: errorDataSets,
        data: dataSetsData,
    } = useReadDataSetsQuery()

    const loading = loadingDataSets
    const error = errorDataSets

    const submitText = initialValues
        ? i18n.t('Save generic gateway')
        : i18n.t('Add generic gateway')

    if (loading) {
        return 'Loading...'
    }

    if (error) {
        return `Error: ${error.message}`
    }

    const dataSets = dataSetsData?.dataSets?.dataSets

    return (
        <Form onSubmit={onSubmit} initialValues={initialValues}>
            {({ handleSubmit, submitting }) => (
                <form handleSubmit={handleSubmit}>
                    <FormRow>
                        <FieldName />
                    </FormRow>

                    <FormRow>
                        <FieldCommandParser disabled />
                    </FormRow>

                    <FormRow>
                        <FieldDataSet dataSets={dataSets} />
                    </FormRow>

                    <FormRow>
                        <FieldCompletenessMethod />
                    </FormRow>

                    <FormRow>
                        <FieldUseCurrentPeriodForReporting />
                    </FormRow>

                    <p>
                        {dataSets.map(({ id, displayName }) => (
                            <div key={id}>{displayName}</div>
                        ))}
                    </p>

                    <Button type="submit">
                        {submitting ? i18n.t('Submitting...') : submitText}
                    </Button>
                </form>
            )}
        </Form>
    )
}

CommandsForm.propTypes = {
    initialValues: PropTypes.shape({}).isRequired,
    onSubmit: PropTypes.func.isRequired,
}
