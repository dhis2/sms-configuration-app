import { PropTypes } from '@dhis2/prop-types'
import {
    CenteredContent,
    CircularLoader,
    NoticeBox,
    ReactFinalForm,
} from '@dhis2/ui'
import React from 'react'
import i18n from '../../locales/index.js'
import { FIELD_DATA_SET_NAME } from '../FieldDataSet/index.js'
import { FIELD_SPECIAL_CHARS_NAME } from '../FieldSpecialCharacter/index.js'
import { Form as FormComponent } from './Form.js'
import { getInitialFormState } from './getInitialFormState.js'
import { globalValidate } from './globalValidate.js'
import { useCommandData } from './useCommandData.js'
import { useUpdateCommandMutation } from './useUpdateCommandMutation.js'

const { Form } = ReactFinalForm

export const FormJ2meParser = ({ commandId, onAfterChange, onCancel }) => {
    const { error: loadingCommandError, data: commandData } =
        useCommandData(commandId)

    const command = commandData?.smsCommand

    const updateCommand = useUpdateCommandMutation({
        id: commandId,
        onAfterChange,
    })

    if (loadingCommandError) {
        const msg = i18n.t(
            "Something went wrong whilst loading the command's details"
        )

        return (
            <NoticeBox error title={msg}>
                {loadingCommandError.message}
            </NoticeBox>
        )
    }

    if (!command) {
        return (
            <CenteredContent>
                <CircularLoader />
            </CenteredContent>
        )
    }

    const selectedDataSetOption = {
        value: command[FIELD_DATA_SET_NAME].id,
        label: command[FIELD_DATA_SET_NAME].displayName,
    }

    const initialValues = getInitialFormState(command)

    const DE_COC_combination_data = command.dataset.dataSetElements.reduce(
        (curCombinations, { dataElement }) => {
            const categoryOptionCombo =
                dataElement.categoryCombo?.categoryOptionCombos

            if (!categoryOptionCombo) {
                return [...curCombinations, { dataElement }]
            }

            const combos = categoryOptionCombo.map((COC) => ({
                dataElement,
                categoryOptionCombo: COC,
            }))

            return [...curCombinations, ...combos]
        },
        []
    )

    const specialChars = initialValues[FIELD_SPECIAL_CHARS_NAME]
    const hasSpecialChars = !!specialChars?.length

    return (
        <Form
            keepDirtyOnReinitialize
            onSubmit={updateCommand}
            initialValues={initialValues}
            validate={globalValidate}
            subscription={{ pristine: true }}
        >
            {({ handleSubmit, pristine, dirty }) => (
                <FormComponent
                    DE_COC_combination_data={DE_COC_combination_data}
                    dirty={dirty}
                    handleSubmit={handleSubmit}
                    pristine={pristine}
                    hasSpecialChars={hasSpecialChars}
                    selectedDataSetOption={selectedDataSetOption}
                    onCancel={onCancel}
                />
            )}
        </Form>
    )
}

FormJ2meParser.propTypes = {
    commandId: PropTypes.string.isRequired,
    onAfterChange: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
}
