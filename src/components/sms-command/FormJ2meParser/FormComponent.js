import { PropTypes } from '@dhis2/prop-types'
import { ReactFinalForm } from '@dhis2/ui'
import React, { useState } from 'react'
import i18n from '../../../locales'
import { FieldDataSet } from '../../dataSet'
import { FormRow } from '../../forms'
import { PageSubHeadline } from '../../headline'
import { AddSpecialCharacters } from '../AddSpecialCharacters'
import { DataElementTimesCategoryOptionCombos } from '../DataElementTimesCategoryOptionCombos'
import { FieldCommandName } from '../FieldCommandName'
import { FieldCompletenessMethod } from '../FieldCompletenessMethod'
import { FieldDefaultMessage } from '../FieldDefaultMessage'
import { FieldMoreThanOneOrgUnitMessage } from '../FieldMoreThanOneOrgUnitMessage'
import { FieldNoUserMessage } from '../FieldNoUserMessage'
import { FieldParser } from '../FieldParser'
import { FieldSeparator } from '../FieldSeparator'
import {
    FIELD_SPECIAL_CHARS_NAME,
    FieldSpecialCharacter,
} from '../FieldSpecialCharacter'
import { FieldSuccessMessage } from '../FieldSuccessMessage'
import { FieldUseCurrentPeriodForReporting } from '../FieldUseCurrentPeriodForReporting'
import { FieldWrongFormatMessage } from '../FieldWrongFormatMessage'
import { FormActions } from '../FormActions'
import { SubmitErrors } from '../SubmitErrors'

const { FormSpy } = ReactFinalForm

export const FormComponent = ({
    DE_COC_combination_data,
    dataTest,
    handleSubmit,
    hasSpecialChars,
    onCancel,
    pristine,
    selectedDataSetOption,
}) => {
    const [specialKeyRemoved, setSpecialKeyRemoved] = useState(false)
    const onSpecialKeyRemoved = () => setSpecialKeyRemoved(true)
    const enableSubmit = specialKeyRemoved && hasSpecialChars

    return (
        <form onSubmit={handleSubmit} data-test={dataTest}>
            <FormRow>
                <FieldCommandName />
            </FormRow>

            <FormRow>
                <FieldParser disabled />
            </FormRow>

            <FormRow>
                <FieldDataSet disabled dataSets={[selectedDataSetOption]} />
            </FormRow>

            <FormRow>
                <FieldCompletenessMethod />
            </FormRow>

            <FormRow>
                <FieldUseCurrentPeriodForReporting />
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

            {DE_COC_combination_data && (
                <DataElementTimesCategoryOptionCombos
                    DE_COC_combinations={DE_COC_combination_data}
                />
            )}

            <PageSubHeadline>{i18n.t('Special characters')}</PageSubHeadline>

            <FormSpy subscription={{ values: true }}>
                {({ values }) => (
                    <>
                        {values[FIELD_SPECIAL_CHARS_NAME].map((_, index) => (
                            <FormRow key={index}>
                                <FieldSpecialCharacter
                                    index={index}
                                    onSpecialKeyRemoved={onSpecialKeyRemoved}
                                />
                            </FormRow>
                        ))}
                    </>
                )}
            </FormSpy>

            <AddSpecialCharacters />

            <SubmitErrors />
            <FormActions
                enableSubmit={enableSubmit}
                onCancel={() => onCancel(pristine)}
            />
        </form>
    )
}

FormComponent.propTypes = {
    dataTest: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    hasSpecialChars: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
    DE_COC_combination_data: PropTypes.arrayOf(
        PropTypes.shape({
            dataElement: PropTypes.shape({
                displayName: PropTypes.string.isRequired,
                id: PropTypes.string.isRequired,
            }).isRequired,
            categoryOptionCombo: PropTypes.shape({
                code: PropTypes.string.isRequired,
                displayName: PropTypes.string.isRequired,
                id: PropTypes.string.isRequired,
            }),
        })
    ),
    selectedDataSetOption: PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
    }),
}
