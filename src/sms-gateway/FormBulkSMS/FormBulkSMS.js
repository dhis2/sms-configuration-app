import { PropTypes } from '@dhis2/prop-types'
import { Button, ButtonStrip, ReactFinalForm, CircularLoader } from '@dhis2/ui'
import React, { useState } from 'react'
import i18n from '../../locales/index.js'
import { FormRow, dataTest } from '../../shared/index.js'
import { FieldEditConfidential } from '../FieldEditConfidential/index.js'
import { FieldGatewayName } from '../FieldGatewayName/index.js'
import { FieldPassword } from '../FieldPassword/index.js'
import { FieldPasswordConfirmation } from '../FieldPasswordConfirmation/index.js'
import { FieldUsername } from '../FieldUsername/index.js'

const { Form } = ReactFinalForm

export const FormBulkSMS = ({
    onCancelClick,
    onSubmit,
    initialValues,
    editMode,
}) => {
    const submitText = initialValues
        ? i18n.t('Save gateway')
        : i18n.t('Add gateway')

    const [allowConfidentialFieldEdit, setAllowConfidentialFieldEdit] =
        useState(!editMode)

    return (
        <Form
            keepDirtyOnReinitialize
            onSubmit={onSubmit}
            initialValues={initialValues}
        >
            {({ handleSubmit, submitting, pristine }) => (
                <form
                    onSubmit={handleSubmit}
                    data-test={dataTest('smsgateway-formbulksms')}
                >
                    <FormRow>
                        <FieldGatewayName />
                    </FormRow>

                    <FormRow>
                        <FieldUsername />
                    </FormRow>

                    <FormRow>
                        <FieldEditConfidential
                            editMode={editMode}
                            fieldType={i18n.t('password')}
                            allowConfidentialFieldEdit={
                                allowConfidentialFieldEdit
                            }
                            setAllowConfidentialFieldEdit={
                                setAllowConfidentialFieldEdit
                            }
                        />
                    </FormRow>

                    <FormRow>
                        <FieldPassword
                            editMode={editMode}
                            disabled={!allowConfidentialFieldEdit}
                        />
                    </FormRow>

                    <FormRow>
                        <FieldPasswordConfirmation
                            editMode={editMode}
                            disabled={!allowConfidentialFieldEdit}
                        />
                    </FormRow>

                    <ButtonStrip>
                        <Button
                            primary
                            type="submit"
                            icon={submitting ? <CircularLoader small /> : null}
                            disabled={submitting}
                            dataTest={dataTest(
                                'forms-gatewaybulksmsform-submit'
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

FormBulkSMS.defaultProps = {
    initialValues: {},
    editMode: false,
}

FormBulkSMS.propTypes = {
    onCancelClick: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    editMode: PropTypes.bool,
    initialValues: PropTypes.object,
}
