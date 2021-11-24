import { PropTypes } from '@dhis2/prop-types'
import { ReactFinalForm } from '@dhis2/ui'
import React from 'react'
import i18n from '../../locales/index.js'
import { FormRow, PageSubHeadline, dataTest } from '../../shared/index.js'
import { FieldCommandName } from '../FieldCommandName/index.js'
import { FieldDefaultMessage } from '../FieldDefaultMessage/index.js'
import { FieldMoreThanOneOrgUnitMessage } from '../FieldMoreThanOneOrgUnitMessage/index.js'
import { FieldNoUserMessage } from '../FieldNoUserMessage/index.js'
import { FieldParser } from '../FieldParser/index.js'
import { FieldProgram } from '../FieldProgram/index.js'
import { FieldSeparator } from '../FieldSeparator/index.js'
import { FieldSmsCode } from '../FieldSmsCode/index.js'
import { FieldSuccessMessage } from '../FieldSuccessMessage/index.js'
import { FieldWrongFormatMessage } from '../FieldWrongFormatMessage/index.js'
import { FormActions } from '../FormActions/index.js'
import { SubmitErrors } from '../SubmitErrors/index.js'

const { useFormState } = ReactFinalForm

export const Form = ({
    handleSubmit,
    dynamicFields,
    selectedProgramOption,
    onCancel,
}) => {
    const { pristine } = useFormState()

    return (
        <form
            onSubmit={handleSubmit}
            data-test={dataTest(
                'smscommand-formtrackedentityregistrationparser-form'
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

            {dynamicFields.map((dynamicField) => {
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

Form.propTypes = {
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
