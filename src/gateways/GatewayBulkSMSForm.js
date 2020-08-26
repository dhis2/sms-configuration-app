import { Button, ReactFinalForm } from '@dhis2/ui'
import React from 'react'
import { PropTypes } from '@dhis2/prop-types'

import { FormRow } from '../forms'
import {
    FieldGatewayName,
    FieldGatewayUsername,
    FieldGatewayPassword,
} from '../gateways'
import { dataTest } from '../dataTest'
import i18n from '../locales'

const { Form } = ReactFinalForm

export const GatewayBulkSMSForm = ({ onSubmit, initialValues }) => {
    const submitText = initialValues
        ? i18n.t('Save BulkSMS gateway')
        : i18n.t('Add BulkSMS gateway')

    return (
        <Form onSubmit={onSubmit} initialValues={initialValues}>
            {({ handleSubmit, submitting }) => (
                <form
                    onSubmit={handleSubmit}
                    data-test={dataTest('gateways-gatewaybulksmsform')}
                >
                    <FormRow>
                        <FieldGatewayName />
                    </FormRow>

                    <FormRow>
                        <FieldGatewayUsername />
                    </FormRow>

                    <FormRow>
                        <FieldGatewayPassword />
                    </FormRow>

                    <Button
                        type="submit"
                        dataTest={dataTest('forms-gatewaybulksmsform-submit')}
                    >
                        {submitting ? i18n.t('Submitting...') : submitText}
                    </Button>
                </form>
            )}
        </Form>
    )
}

GatewayBulkSMSForm.defaultProps = {
    initialValues: {},
}

GatewayBulkSMSForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    initialValues: PropTypes.object,
}
