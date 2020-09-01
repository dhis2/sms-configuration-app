import { Button, ReactFinalForm, CircularLoader } from '@dhis2/ui'
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
        ? i18n.t('Save gateway')
        : i18n.t('Add gateway')

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
                        primary
                        type="submit"
                        icon={submitting ? <CircularLoader small /> : null}
                        disabled={submitting}
                        dataTest={dataTest('forms-gatewaybulksmsform-submit')}
                    >
                        {submitText}
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
