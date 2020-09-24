import { Button, ButtonStrip, ReactFinalForm, CircularLoader } from '@dhis2/ui'
import React from 'react'
import { PropTypes } from '@dhis2/prop-types'

import {
    FieldGatewayName,
    FieldGatewayUrlTemplate,
    GatewayAddKeyValuePair,
    GatewayKeyValuePair,
} from '../gateways'
import { FieldGatewayConfigurationTemplate } from './FieldGatewayConfigurationTemplate'
import { FieldGatewayUseGet } from './FieldGatewayUseGet'
import { FieldGatewaySendUrlParameters } from './FieldGatewaySendUrlParameters'
import { FieldGatewayContentType } from './FieldGatewayContentType'
import { FormRow } from '../forms'
import { PageSubHeadline } from '../headline'
import { dataTest } from '../dataTest'
import i18n from '../locales'

const { Form } = ReactFinalForm

export const GatewayGenericForm = ({
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
            {({ handleSubmit, values, submitting, pristine }) => (
                <form
                    onSubmit={handleSubmit}
                    data-test={dataTest('gateways-gatewaygenericform')}
                >
                    <PageSubHeadline>{i18n.t('Gateway setup')}</PageSubHeadline>

                    <FormRow>
                        <FieldGatewayName />
                    </FormRow>

                    <FormRow>
                        <FieldGatewayUrlTemplate />
                    </FormRow>

                    <FormRow>
                        <FieldGatewayConfigurationTemplate />
                    </FormRow>

                    <FormRow>
                        <FieldGatewayContentType />
                    </FormRow>

                    <FormRow>
                        <FieldGatewayUseGet />
                    </FormRow>

                    <FormRow>
                        <FieldGatewaySendUrlParameters />
                    </FormRow>

                    <PageSubHeadline>
                        {i18n.t('Key value pairs')}
                    </PageSubHeadline>

                    {values.parameters.map((_, index) => (
                        <GatewayKeyValuePair index={index} key={index} />
                    ))}

                    <GatewayAddKeyValuePair />

                    <ButtonStrip>
                        <Button
                            primary
                            type="submit"
                            dataTest={dataTest(
                                'forms-gatewaygenericform-submit'
                            )}
                            disabled={submitting}
                            icon={submitting ? <CircularLoader small /> : null}
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

GatewayGenericForm.defaultProps = {
    initialValues: {
        parameters: [],
    },
}

GatewayGenericForm.propTypes = {
    onCancelClick: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    initialValues: PropTypes.object,
}
