import { Button, ButtonStrip, ReactFinalForm, CircularLoader } from '@dhis2/ui'
import React from 'react'
import { PropTypes } from '@dhis2/prop-types'

import {
    FieldGatewayName,
    FieldGatewayUrlTemplate,
    GatewayAddKeyValuePair,
    GatewayKeyValuePair,
} from '../gateways'
import { FormRow } from '../forms'
import { PageSubHeadline } from '../headline'
import { Paragraph } from '../text'
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

                    <PageSubHeadline>
                        {i18n.t('Key value pairs')}
                    </PageSubHeadline>

                    <Paragraph>
                        {i18n.t(
                            'Key value pairs can be included in the URL. This is some helper text which provides an intro to what the key value pairs actually do.'
                        )}
                    </Paragraph>

                    {values.parameters.map((param, index) => (
                        <GatewayKeyValuePair
                            index={index}
                            key={index}
                            isExistingConfidentialKey={initialValues.parameters.some(
                                initialParam =>
                                    initialParam.confidential &&
                                    initialParam.key === param.key
                            )}
                        />
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
