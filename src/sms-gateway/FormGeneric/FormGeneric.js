import { PropTypes } from '@dhis2/prop-types'
import { Button, ButtonStrip, ReactFinalForm, CircularLoader } from '@dhis2/ui'
import React from 'react'
import i18n from '../../locales'
import { FormRow, PageSubHeadline, dataTest } from '../../shared'
import { ActionAddKeyValuePair } from '../ActionAddKeyValuePair'
import { FieldConfigurationTemplate } from '../FieldConfigurationTemplate'
import { FieldContentType } from '../FieldContentType'
import { FieldGatewayName } from '../FieldGatewayName'
import { FieldKeyValuePair } from '../FieldKeyValuePair'
import { FieldSendUrlParameters } from '../FieldSendUrlParameters'
import { FieldUrlTemplate } from '../FieldUrlTemplate'
import { FieldUseGet } from '../FieldUseGet'

const { Form } = ReactFinalForm

export const FormGeneric = ({ onCancelClick, onSubmit, initialValues }) => {
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
                    data-test={dataTest('smsgateway-formgeneric')}
                >
                    <PageSubHeadline>{i18n.t('Gateway setup')}</PageSubHeadline>

                    <FormRow>
                        <FieldGatewayName />
                    </FormRow>

                    <FormRow>
                        <FieldUrlTemplate />
                    </FormRow>

                    <FormRow>
                        <FieldConfigurationTemplate />
                    </FormRow>

                    <FormRow>
                        <FieldContentType />
                    </FormRow>

                    <FormRow>
                        <FieldUseGet />
                    </FormRow>

                    <FormRow>
                        <FieldSendUrlParameters />
                    </FormRow>

                    <PageSubHeadline>
                        {i18n.t('Key value pairs')}
                    </PageSubHeadline>

                    {values.parameters.map((_, index) => (
                        <FieldKeyValuePair index={index} key={index} />
                    ))}

                    <ActionAddKeyValuePair />

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

FormGeneric.defaultProps = {
    initialValues: {
        parameters: [],
    },
}

FormGeneric.propTypes = {
    onCancelClick: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    initialValues: PropTypes.object,
}
