import { Button, ReactFinalForm, NoticeBox } from '@dhis2/ui'
import React from 'react'
import { PropTypes } from '@dhis2/prop-types'

import {
    FieldGatewayName,
    FieldGatewayUrlTemplate,
    GatewayAddKeyValuePair,
    GatewayKeyValuePair,
} from '../gateways'
import { FormRow } from '../forms'
import { dataTest } from '../dataTest'
import i18n from '../locales'

const { Form } = ReactFinalForm

export const GatewayGenericForm = ({ onSubmit, initialValues }) => {
    const submitText = initialValues
        ? i18n.t('Save gateway')
        : i18n.t('Add gateway')

    return (
        <Form onSubmit={onSubmit} initialValues={initialValues}>
            {({ handleSubmit, values, submitting }) => (
                <form
                    onSubmit={handleSubmit}
                    data-test={dataTest('gateways-gatewaygenericform')}
                >
                    <FormRow>
                        <FieldGatewayName />
                    </FormRow>

                    <FormRow>
                        <FieldGatewayUrlTemplate />
                    </FormRow>

                    {values.parameters.map((_, index) => (
                        <GatewayKeyValuePair index={index} key={index} />
                    ))}

                    <FormRow>
                        <NoticeBox>
                            {i18n.t(
                                'With a generic http gateway any number of parameters can be added with key value pairs'
                            )}
                        </NoticeBox>
                    </FormRow>

                    <FormRow>
                        <GatewayAddKeyValuePair />
                    </FormRow>

                    <Button
                        type="submit"
                        dataTest={dataTest('forms-gatewaygenericform-submit')}
                    >
                        {submitting ? i18n.t('Submitting...') : submitText}
                    </Button>
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
    onSubmit: PropTypes.func.isRequired,
    initialValues: PropTypes.object,
}
