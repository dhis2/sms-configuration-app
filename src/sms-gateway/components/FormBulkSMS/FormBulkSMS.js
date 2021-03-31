import { PropTypes } from '@dhis2/prop-types'
import { Button, ButtonStrip, ReactFinalForm, CircularLoader } from '@dhis2/ui'
import React from 'react'
import i18n from '../../../locales'
import { FormRow } from '../../../shared/components'
import { dataTest } from '../../../shared/utils'
import { FieldGatewayName } from '../FieldGatewayName'
import { FieldPassword } from '../FieldPassword'
import { FieldPasswordConfirmation } from '../FieldPasswordConfirmation'
import { FieldUsername } from '../FieldUsername'

const { Form } = ReactFinalForm

export const FormBulkSMS = ({ onCancelClick, onSubmit, initialValues }) => {
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
                    data-test={dataTest('gateways-gatewaybulksmsform')}
                >
                    <FormRow>
                        <FieldGatewayName />
                    </FormRow>

                    <FormRow>
                        <FieldUsername />
                    </FormRow>

                    <FormRow>
                        <FieldPassword />
                    </FormRow>

                    <FormRow>
                        <FieldPasswordConfirmation />
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
}

FormBulkSMS.propTypes = {
    onCancelClick: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    initialValues: PropTypes.object,
}
