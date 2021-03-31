import { PropTypes } from '@dhis2/prop-types'
import { ReactFinalForm } from '@dhis2/ui'
import React from 'react'
import i18n from '../../../locales'
import { FormRow, PageSubHeadline } from '../../../shared/components'
import { dataTest } from '../../../shared/utils'
import { FieldCommandName } from '../FieldCommandName'
import { FieldDefaultMessage } from '../FieldDefaultMessage'
import { FieldMoreThanOneOrgUnitMessage } from '../FieldMoreThanOneOrgUnitMessage'
import { FieldNoUserMessage } from '../FieldNoUserMessage'
import { FieldParser } from '../FieldParser'
import { FieldProgram } from '../FieldProgram'
import { FieldProgramStage } from '../FieldProgramStage'
import { FieldProgramStageDataElements } from '../FieldProgramStageDataElements'
import { FieldSeparator } from '../FieldSeparator'
import { FIELD_SMS_CODES_NAME } from '../FieldSmsCode'
import { FieldSuccessMessage } from '../FieldSuccessMessage'
import { FieldWrongFormatMessage } from '../FieldWrongFormatMessage'
import { FormActions } from '../FormActions'
import { SubmitErrors } from '../SubmitErrors'

const { useFormState } = ReactFinalForm

export const FormComponent = ({
    handleSubmit,
    onCancel,
    programStageDataElements,
    selectedProgramOption,
    selectedProgramStageOption,
}) => {
    const { pristine, values } = useFormState()

    return (
        <form
            onSubmit={handleSubmit}
            data-test={dataTest(
                'smscommandeventregistrationparser-commandediteventregistrationparserform'
            )}
        >
            <FormRow>
                <FieldCommandName />
            </FormRow>

            <FormRow>
                <FieldParser disabled />
            </FormRow>

            <FormRow>
                <FieldProgram disabled programs={[selectedProgramOption]} />
            </FormRow>

            <FormRow>
                <FieldProgramStage
                    disabled
                    programStages={[selectedProgramStageOption]}
                />
            </FormRow>

            <FormRow>
                <FieldSeparator />
            </FormRow>

            <FormRow>
                <FieldDefaultMessage />
            </FormRow>

            <FormRow>
                <FieldWrongFormatMessage />
            </FormRow>

            <FormRow>
                <FieldNoUserMessage />
            </FormRow>

            <FormRow>
                <FieldMoreThanOneOrgUnitMessage />
            </FormRow>

            <FormRow>
                <FieldSuccessMessage />
            </FormRow>

            <PageSubHeadline>{i18n.t('SMS short codes')}</PageSubHeadline>

            {programStageDataElements && (
                <FormRow>
                    <FieldProgramStageDataElements
                        programStageDataElements={programStageDataElements}
                        smsCodes={values[FIELD_SMS_CODES_NAME]}
                    />
                </FormRow>
            )}

            <SubmitErrors />
            <FormActions onCancel={() => onCancel(pristine)} />
        </form>
    )
}

FormComponent.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    programStageDataElements: PropTypes.arrayOf(
        PropTypes.shape({
            dataElement: PropTypes.shape({
                displayName: PropTypes.string.isRequired,
                id: PropTypes.string.isRequired,
            }),
        })
    ).isRequired,
    selectedProgramOption: PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
    }).isRequired,
    selectedProgramStageOption: PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
    }).isRequired,
    onCancel: PropTypes.func.isRequired,
}
