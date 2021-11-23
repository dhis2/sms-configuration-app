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
import { FieldProgramStage } from '../FieldProgramStage/index.js'
import { FieldSeparator } from '../FieldSeparator/index.js'
import { FIELD_SMS_CODES_NAME } from '../FieldSmsCode/index.js'
import { FieldSmsCodeDataElement } from '../FieldSmsCodeDataElement/index.js'
import { FieldSuccessMessage } from '../FieldSuccessMessage/index.js'
import { FieldWrongFormatMessage } from '../FieldWrongFormatMessage/index.js'
import { FormActions } from '../FormActions/index.js'
import { SubmitErrors } from '../SubmitErrors/index.js'

const { useFormState } = ReactFinalForm

export const Form = ({
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
            data-test={dataTest('smscommand-formeventregistrationparser-form')}
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
                    {programStageDataElements.map(({ dataElement }) => (
                        <FieldSmsCodeDataElement
                            key={dataElement.id}
                            dataElement={dataElement}
                            smsCodes={values[FIELD_SMS_CODES_NAME]}
                        />
                    ))}
                </FormRow>
            )}

            <SubmitErrors />
            <FormActions onCancel={() => onCancel(pristine)} />
        </form>
    )
}

Form.propTypes = {
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
