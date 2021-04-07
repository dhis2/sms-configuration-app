import { PropTypes } from '@dhis2/prop-types'
import { ReactFinalForm } from '@dhis2/ui'
import React from 'react'
import i18n from '../../locales'
import { FormRow, PageSubHeadline } from '../../shared'
import { FieldCommandName } from '../FieldCommandName'
import { FieldDefaultMessage } from '../FieldDefaultMessage'
import { FieldMoreThanOneOrgUnitMessage } from '../FieldMoreThanOneOrgUnitMessage'
import { FieldNoUserMessage } from '../FieldNoUserMessage'
import { FieldParser } from '../FieldParser'
import { FieldProgram } from '../FieldProgram'
import { FieldSeparator } from '../FieldSeparator'
import { FieldSmsCode } from '../FieldSmsCode'
import { FieldSuccessMessage } from '../FieldSuccessMessage'
import { FieldWrongFormatMessage } from '../FieldWrongFormatMessage'
import { FormActions } from '../FormActions'
import { SubmitErrors } from '../SubmitErrors'

const { useFormState } = ReactFinalForm

export const FormComponent = ({
    handleSubmit,
    dynamicFields,
    selectedProgramOption,
    onCancel,
}) => {
    const { pristine } = useFormState()

    return (
        <form onSubmit={handleSubmit}>
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

            {dynamicFields.map(dynamicField => {
                // I assume this should switch field types based on `valueType`
                // which can be 'TEXT', 'NUMBER', etc. Currently this renders
                // a regular input for everything.
                return (
                    <FormRow key={dynamicField.id}>
                        <FieldSmsCode
                            id={dynamicField.id}
                            displayName={dynamicField.displayName}
                            valueType={dynamicField.valueType}
                        />
                    </FormRow>
                )
            })}

            <SubmitErrors />
            <FormActions onCancel={() => onCancel(pristine)} />
        </form>
    )
}

FormComponent.propTypes = {
    dynamicFields: PropTypes.arrayOf(
        PropTypes.shape({
            displayName: PropTypes.string.isRequired,
            id: PropTypes.string.isRequired,
            valueType: PropTypes.string.isRequired,
        })
    ).isRequired,
    handleSubmit: PropTypes.func.isRequired,
    selectedProgramOption: PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
    }).isRequired,
    onCancel: PropTypes.func.isRequired,
}
