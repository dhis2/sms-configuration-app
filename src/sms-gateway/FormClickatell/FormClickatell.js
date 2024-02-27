import { PropTypes } from '@dhis2/prop-types'
import { Button, ButtonStrip, ReactFinalForm, CircularLoader } from '@dhis2/ui'
import React, { useState } from 'react'
import i18n from '../../locales/index.js'
import { FormRow, dataTest } from '../../shared/index.js'
import { FieldAuthToken } from '../FieldAuthToken/index.js'
import { FieldEditConfidential } from '../FieldEditConfidential/index.js'
import { FieldGatewayName } from '../FieldGatewayName/index.js'
import { FieldUrlTemplate } from '../FieldUrlTemplate/index.js'
import { FieldUsername } from '../FieldUsername/index.js'

const { Form } = ReactFinalForm

export const FormClickatell = ({
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
                    data-test={dataTest('smsgateway-formclickatell')}
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
                            fieldType={i18n.t('auth token')}
                            allowConfidentialFieldEdit={
                                allowConfidentialFieldEdit
                            }
                            setAllowConfidentialFieldEdit={
                                setAllowConfidentialFieldEdit
                            }
                        />
                    </FormRow>

                    <FormRow>
                        <FieldAuthToken
                            editMode={editMode}
                            disabled={!allowConfidentialFieldEdit}
                        />
                    </FormRow>

                    <FormRow>
                        <FieldUrlTemplate />
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

FormClickatell.defaultProps = {
    initialValues: {},
}

FormClickatell.propTypes = {
    onCancelClick: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    editMode: PropTypes.bool,
    initialValues: PropTypes.object,
}
