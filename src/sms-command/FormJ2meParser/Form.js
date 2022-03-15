import { PropTypes } from '@dhis2/prop-types'
import { ReactFinalForm } from '@dhis2/ui'
import React, { useState } from 'react'
import i18n from '../../locales/index.js'
import { FormRow, PageSubHeadline, dataTest } from '../../shared/index.js'
import { AddSpecialCharacters } from '../AddSpecialCharacters/index.js'
import { DataElementTimesCategoryOptionCombos } from '../DataElementTimesCategoryOptionCombos/index.js'
import { FieldCommandName } from '../FieldCommandName/index.js'
import { FieldCompletenessMethod } from '../FieldCompletenessMethod/index.js'
import { FieldDataSet } from '../FieldDataSet/index.js'
import { FieldDefaultMessage } from '../FieldDefaultMessage/index.js'
import { FieldMoreThanOneOrgUnitMessage } from '../FieldMoreThanOneOrgUnitMessage/index.js'
import { FieldNoUserMessage } from '../FieldNoUserMessage/index.js'
import { FieldParser } from '../FieldParser/index.js'
import { FieldSeparator } from '../FieldSeparator/index.js'
import {
    FIELD_SPECIAL_CHARS_NAME,
    FieldSpecialCharacter,
} from '../FieldSpecialCharacter/index.js'
import { FieldSuccessMessage } from '../FieldSuccessMessage/index.js'
import { FieldUseCurrentPeriodForReporting } from '../FieldUseCurrentPeriodForReporting/index.js'
import { FieldWrongFormatMessage } from '../FieldWrongFormatMessage/index.js'
import { FormActions } from '../FormActions/index.js'
import { SubmitErrors } from '../SubmitErrors/index.js'

const { FormSpy } = ReactFinalForm

export const Form = ({
    DE_COC_combination_data,
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
        <form
            onSubmit={handleSubmit}
            data-test={dataTest('smscommand-formj2meparser-form')}
        >
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

Form.propTypes = {
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
                // code: PropTypes.string.isRequired,
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
