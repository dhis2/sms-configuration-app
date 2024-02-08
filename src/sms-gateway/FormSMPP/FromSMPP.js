import { PropTypes } from '@dhis2/prop-types'
import { Button, ButtonStrip, ReactFinalForm, CircularLoader } from '@dhis2/ui'
import React from 'react'
import i18n from '../../locales/index.js'
import { FormRow, dataTest } from '../../shared/index.js'
import { FieldBindType } from '../FieldBindType/index.js'
import { FieldCompressed } from '../FieldCompressed/index.js'
import { FieldGatewayName } from '../FieldGatewayName/index.js'
import { FieldHost } from '../FieldHost/index.js'
import { FieldNumberPlanIndicator } from '../FieldNumberPlanIndicator/index.js'
import { FieldPassword } from '../FieldPassword/index.js'
import { FieldPort } from '../FieldPort/index.js'
import { FieldSystemId } from '../FieldSystemId/index.js'
import { FieldSystemType } from '../FieldSystemType/index.js'
import { FieldTypeOfNumber } from '../FieldTypeOfNumber/index.js'

const { Form } = ReactFinalForm

export const FormSMPP = ({
    onCancelClick,
    onSubmit,
    initialValues,
    editMode,
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
                    data-test={dataTest('smsgateway-formsmpp')}
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
                        <FieldPassword editMode={editMode} />
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
    editMode: PropTypes.bool,
    initialValues: PropTypes.object,
}
