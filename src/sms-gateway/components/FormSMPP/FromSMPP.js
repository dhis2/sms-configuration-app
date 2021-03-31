import { PropTypes } from '@dhis2/prop-types'
import { Button, ButtonStrip, ReactFinalForm, CircularLoader } from '@dhis2/ui'
import React from 'react'
import i18n from '../../../locales'
import { FormRow } from '../../../shared/components'
import { dataTest } from '../../../shared/utils'
import { FieldBindType } from '../FieldBindType'
import { FieldCompressed } from '../FieldCompressed'
import { FieldGatewayName } from '../FieldGatewayName'
import { FieldHost } from '../FieldHost'
import { FieldNumberPlanIndicator } from '../FieldNumberPlanIndicator'
import { FieldPassword } from '../FieldPassword'
import { FieldPort } from '../FieldPort'
import { FieldSystemId } from '../FieldSystemId'
import { FieldSystemType } from '../FieldSystemType'
import { FieldTypeOfNumber } from '../FieldTypeOfNumber'

const { Form } = ReactFinalForm

export const FormSMPP = ({ onCancelClick, onSubmit, initialValues }) => {
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
                        <FieldSystemId />
                    </FormRow>

                    <FormRow>
                        <FieldHost />
                    </FormRow>

                    <FormRow>
                        <FieldSystemType />
                    </FormRow>

                    <FormRow>
                        <FieldNumberPlanIndicator />
                    </FormRow>

                    <FormRow>
                        <FieldTypeOfNumber />
                    </FormRow>

                    <FormRow>
                        <FieldBindType />
                    </FormRow>

                    <FormRow>
                        <FieldPort />
                    </FormRow>

                    <FormRow>
                        <FieldPassword />
                    </FormRow>

                    <FormRow>
                        <FieldCompressed />
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

FormSMPP.defaultProps = {
    initialValues: {},
}

FormSMPP.propTypes = {
    onCancelClick: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    initialValues: PropTypes.object,
}
