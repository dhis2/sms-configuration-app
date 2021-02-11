import { Button, ButtonStrip, ReactFinalForm, CircularLoader } from '@dhis2/ui'
import React from 'react'
import { PropTypes } from '@dhis2/prop-types'

import { FormRow } from '../forms'
import {
    FieldGatewayBindType,
    FieldGatewayCompressed,
    FieldGatewayHost,
    FieldGatewayName,
    FieldGatewayNumberPlanIndicator,
    FieldGatewayPassword,
    FieldGatewayPort,
    FieldGatewaySystemId,
    FieldGatewaySystemType,
    FieldGatewayTypeOfNumber,
} from '../gateways'
import { dataTest } from '../dataTest'
import i18n from '../locales'

const { Form } = ReactFinalForm

export const GatewaySMPPForm = ({ onCancelClick, onSubmit, initialValues }) => {
    const submitText = initialValues
        ? i18n.t('Save gateway')
        : i18n.t('Add gateway')

    return (
        <Form
            keepDirtyOnReinitialize
            onSubmit={onSubmit}
            initialValues={initialValues}
        >
            {({ handleSubmit, submitting, pristine }) => (
                <form
                    onSubmit={handleSubmit}
                    data-test={dataTest('gateways-gatewaysmppform')}
                >
                    <FormRow>
                        <FieldGatewayName />
                    </FormRow>

                    <FormRow>
                        <FieldGatewaySystemId />
                    </FormRow>

                    <FormRow>
                        <FieldGatewayHost />
                    </FormRow>

                    <FormRow>
                        <FieldGatewaySystemType />
                    </FormRow>

                    <FormRow>
                        <FieldGatewayNumberPlanIndicator />
                    </FormRow>

                    <FormRow>
                        <FieldGatewayTypeOfNumber />
                    </FormRow>

                    <FormRow>
                        <FieldGatewayBindType />
                    </FormRow>

                    <FormRow>
                        <FieldGatewayPort />
                    </FormRow>

                    <FormRow>
                        <FieldGatewayPassword />
                    </FormRow>

                    <FormRow>
                        <FieldGatewayCompressed />
                    </FormRow>

                    <ButtonStrip>
                        <Button
                            primary
                            type="submit"
                            icon={submitting ? <CircularLoader small /> : null}
                            disabled={submitting}
                            dataTest={dataTest('forms-gatewaysmppform-submit')}
                        >
                            {submitText}
                        </Button>

                        <Button onClick={() => onCancelClick(pristine)}>
                            {i18n.t('Cancel')}
                        </Button>
                    </ButtonStrip>
                </form>
            )}
        </Form>
    )
}

GatewaySMPPForm.defaultProps = {
    initialValues: {},
}

GatewaySMPPForm.propTypes = {
    onCancelClick: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    initialValues: PropTypes.object,
}
