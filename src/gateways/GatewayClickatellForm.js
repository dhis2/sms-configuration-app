import { Button, ButtonStrip, ReactFinalForm, CircularLoader } from '@dhis2/ui'
import React from 'react'
import { PropTypes } from '@dhis2/prop-types'

import { FormRow } from '../forms'
import {
    FieldGatewayAuthToken,
    FieldGatewayName,
    FieldGatewayUrlTemplate,
    FieldGatewayUsername,
} from '../gateways'
import { dataTest } from '../dataTest'
import i18n from '../locales'

const { Form } = ReactFinalForm

export const GatewayClickatellForm = ({
    onCancelClick,
    onSubmit,
    initialValues,
}) => {
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
                    data-test={dataTest('gateways-gatewayclickatellform')}
                >
                    <FormRow>
                        <FieldGatewayName />
                    </FormRow>

                    <FormRow>
                        <FieldGatewayUsername />
                    </FormRow>

                    <FormRow>
                        <FieldGatewayAuthToken />
                    </FormRow>

                    <FormRow>
                        <FieldGatewayUrlTemplate />
                    </FormRow>

                    <ButtonStrip>
                        <Button
                            primary
                            type="submit"
                            icon={submitting ? <CircularLoader small /> : null}
                            disabled={submitting}
                            dataTest={dataTest(
                                'forms-gatewayclickatellform-submit'
                            )}
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

GatewayClickatellForm.defaultProps = {
    initialValues: {},
}

GatewayClickatellForm.propTypes = {
    onCancelClick: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    initialValues: PropTypes.object,
}
