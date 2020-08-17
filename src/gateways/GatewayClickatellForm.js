import { Button, ReactFinalForm } from '@dhis2/ui'
import React from 'react'
import { PropTypes } from '@dhis2/prop-types'

import {
    FormRow,
    FieldAuthToken,
    FieldName,
    FieldUrlTemplate,
    FieldUsername,
} from '../forms'
import { dataTest } from '../dataTest'
import i18n from '../locales'

const { Form } = ReactFinalForm

export const GatewayClickatellForm = ({ onSubmit, initialValues }) => {
    const submitText = initialValues
        ? i18n.t('Save Clickatell gateway')
        : i18n.t('Add Clickatell gateway')

    return (
        <Form onSubmit={onSubmit} initialValues={initialValues}>
            {({ handleSubmit, submitting }) => (
                <form
                    onSubmit={handleSubmit}
                    data-test={dataTest('forms-gatewayclickatellform')}
                >
                    <FormRow>
                        <FieldName />
                    </FormRow>

                    <FormRow>
                        <FieldUsername />
                    </FormRow>

                    <FormRow>
                        <FieldAuthToken />
                    </FormRow>

                    <FormRow>
                        <FieldUrlTemplate />
                    </FormRow>

                    <Button
                        type="submit"
                        dataTest={dataTest(
                            'forms-gatewayclickatellform-submit'
                        )}
                    >
                        {submitting ? i18n.t('Submitting...') : submitText}
                    </Button>
                </form>
            )}
        </Form>
    )
}

GatewayClickatellForm.defaultProps = {
    initialValues: {},
}

GatewayClickatellForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    initialValues: PropTypes.object,
}
