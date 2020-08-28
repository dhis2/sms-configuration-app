import {
    CenteredContent,
    CircularLoader,
    NoticeBox,
    ReactFinalForm,
} from '@dhis2/ui'
import { PropTypes } from '@dhis2/prop-types'
import React, { useEffect } from 'react'

import {
    FIELD_COMMAND_DEFAULT_MESSAGE_NAME,
    FIELD_COMMAND_MORE_THAN_ONE_ORG_UNIT_MESSAGE_NAME,
    FIELD_COMMAND_NAME_NAME,
    FIELD_COMMAND_NO_USER_MESSAGE_NAME,
    FIELD_COMMAND_PARSER_NAME,
    FIELD_COMMAND_SEPARATOR_NAME,
    FIELD_COMMAND_SMS_CODES_NAME,
    FIELD_COMMAND_SPECIAL_CHARS_NAME,
    FIELD_COMMAND_SUCCESS_MESSAGE_NAME,
    FIELD_COMMAND_WRONG_FORMAT_MESSAGE_NAME,
} from './fieldNames'
import { J2ME_PARSER } from './types'
import { CommandsAddSpecialCharacters } from './CommandsAddSpecialCharacters'
import { DataElementTimesCategoryOptionCombos } from './DataElementTimesCategoryOptionCombos'
import { FieldCommandDefaultMessage } from './FieldCommandDefaultMessage'
import { FieldCommandMoreThanOneOrgUnitMessage } from './FieldCommandMoreThanOneOrgUnitMessage'
import { FieldCommandName } from './FieldCommandName'
import { FieldCommandNoUserMessage } from './FieldCommandNoUserMessage'
import { FieldCommandParser } from './FieldCommandParser'
import { FieldCommandSeparator } from './FieldCommandSeparator'
import { FieldCommandSpecialCharacter } from './FieldCommandSpecialCharacter'
import { FieldCommandSuccessMessage } from './FieldCommandSuccessMessage'
import { FieldCommandWrongFormatMessage } from './FieldCommandWrongFormatMessage'
import { FIELD_DATA_SET_NAME, FieldDataSet } from '../dataSet'
import { FormRow } from '../forms'
import { SaveCommandButton } from './SaveCommandButton'
import { SubmitErrors } from './SubmitErrors'
import { dataTest } from '../dataTest'
import { getSmsCodeDuplicates } from './getSmsCodeDuplicates'
import { useReadDataElementsWithCategoryOptionComboQuery } from './useReadDataElementsWithCategoryOptionComboQuery'
import { useReadSmsCommandJ2MEParserQuery } from './useReadSmsCommandJ2MEParserQuery'
import { useUpdateCommand } from './useUpdateCommand'
import i18n from '../locales'

const { Form, FormSpy } = ReactFinalForm

const getInitialFormState = command => {
    const name = command[FIELD_COMMAND_NAME_NAME]
    const parserType = J2ME_PARSER.value
    const dataSetId = { id: command[FIELD_DATA_SET_NAME].id }
    const separator = command[FIELD_COMMAND_SEPARATOR_NAME]
    const defaultMessage = command[FIELD_COMMAND_DEFAULT_MESSAGE_NAME]
    const wrongFormatMessage = command[FIELD_COMMAND_WRONG_FORMAT_MESSAGE_NAME]
    const noUserMessage = command[FIELD_COMMAND_NO_USER_MESSAGE_NAME]
    const moreThanOneOrgUnitMessage =
        command[FIELD_COMMAND_MORE_THAN_ONE_ORG_UNIT_MESSAGE_NAME]
    const successMessage = command[FIELD_COMMAND_SUCCESS_MESSAGE_NAME]
    const smsCodes = command[FIELD_COMMAND_SMS_CODES_NAME].reduce(
        (acc, { code, compulsory, formula, optionId, dataElement }) => {
            const key =
                optionId < 10 ? dataElement.id : `${dataElement.id}-${optionId}`

            const smsCode = { code, compulsory, optionId }

            if (formula) {
                smsCode.formula = formula
            }

            return {
                ...acc,
                [key]: smsCode,
            }
        },
        {}
    )
    const specialCharacters = command[FIELD_COMMAND_SPECIAL_CHARS_NAME] || []

    return {
        [FIELD_COMMAND_NAME_NAME]: name,
        [FIELD_COMMAND_PARSER_NAME]: parserType,
        [FIELD_DATA_SET_NAME]: dataSetId,
        [FIELD_COMMAND_SEPARATOR_NAME]: separator,
        [FIELD_COMMAND_DEFAULT_MESSAGE_NAME]: defaultMessage,
        [FIELD_COMMAND_WRONG_FORMAT_MESSAGE_NAME]: wrongFormatMessage,
        [FIELD_COMMAND_NO_USER_MESSAGE_NAME]: noUserMessage,
        [FIELD_COMMAND_MORE_THAN_ONE_ORG_UNIT_MESSAGE_NAME]: moreThanOneOrgUnitMessage,
        [FIELD_COMMAND_SUCCESS_MESSAGE_NAME]: successMessage,
        smsCodes,
        specialCharacters,
    }
}

const globalValidate = DE_COC_combination_data => values => {
    const errors = {}

    const smsCodesFormState = values[FIELD_COMMAND_SMS_CODES_NAME]
    const smsCodes = smsCodesFormState ? Object.entries(smsCodesFormState) : []

    if (
        smsCodes.length > 0 &&
        smsCodes.length !== DE_COC_combination_data?.length
    ) {
        errors[FIELD_COMMAND_SMS_CODES_NAME] =
            errors[FIELD_COMMAND_SMS_CODES_NAME] || {}

        Object.assign(errors[FIELD_COMMAND_SMS_CODES_NAME], {
            global: i18n.t('You either have to provide all values or none'),
        })
    }

    if (smsCodes.length) {
        const duplicates = getSmsCodeDuplicates(smsCodes)

        if (duplicates.length) {
            const duplicateErrors = {}

            duplicates.forEach(duplicate => {
                duplicateErrors[duplicate] = {
                    code: i18n.t('Duplicate value!'),
                }
            })

            errors[FIELD_COMMAND_SMS_CODES_NAME] =
                errors[FIELD_COMMAND_SMS_CODES_NAME] || {}

            Object.assign(errors[FIELD_COMMAND_SMS_CODES_NAME], duplicateErrors)
        }
    }

    return errors
}

const formatSmsCodes = updates => {
    const smsCodes = updates[FIELD_COMMAND_SMS_CODES_NAME]
    const formattedSmsCodes = Object.entries(smsCodes).map(
        ([id, { code, formula, compulsory, optionId }]) => {
            const [dataElementId] = id.split('-')
            const formattedSmsCode = {
                code,
                compulsory,
                dataElement: { id: dataElementId },
            }

            if (formula) {
                formattedSmsCode.formula = formula
            }

            if (optionId) {
                formattedSmsCode.optionId = optionId
            }

            return formattedSmsCode
        }
    )

    return {
        ...updates,
        [FIELD_COMMAND_SMS_CODES_NAME]: formattedSmsCodes,
    }
}

export const CommandEditJ2MEParserForm = ({ commandId, onAfterChange }) => {
    const {
        error: loadingCommandError,
        data: commandData,
    } = useReadSmsCommandJ2MEParserQuery(commandId)

    const command = commandData?.smsCommand

    /* required for validation
     * DE  = Data Element
     * COC = Category Option Combo
     */
    const {
        error: loading_DE_COC_combinationsError,
        data: DE_COC_combination_data,
        refetch: fetchDataElementsWithCategoryOptionCombo,
    } = useReadDataElementsWithCategoryOptionComboQuery({ lazy: true })

    useEffect(() => {
        const dataSetId = command?.dataset.id

        if (dataSetId) {
            fetchDataElementsWithCategoryOptionCombo({ dataSetId })
        }
    }, [command?.id])

    const updateCommand = useUpdateCommand({
        commandId,
        onAfterChange,
        formatCommand: formatSmsCodes,
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

    if (loading_DE_COC_combinationsError) {
        const msg = i18n.t(
            'Something went wrong whilst loading the data element category combos'
        )

        return (
            <NoticeBox error title={msg}>
                {loading_DE_COC_combinationsError.message}
            </NoticeBox>
        )
    }

    if (!command || !DE_COC_combination_data) {
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

    return (
        <Form
            onSubmit={updateCommand}
            initialValues={initialValues}
            subscription={{ submitting: true, pristine: true }}
            validate={globalValidate(DE_COC_combination_data)}
        >
            {({ handleSubmit, submitting, form }) => (
                <form
                    onSubmit={handleSubmit}
                    data-test={dataTest('commands-commandj2meparserform')}
                >
                    {submitting && <p>SUBMITTING....</p>}

                    <FormRow>
                        <FieldCommandName />
                    </FormRow>

                    <FormRow>
                        <FieldCommandParser disabled />
                    </FormRow>

                    <FormRow>
                        <FieldDataSet
                            disabled
                            dataSets={[selectedDataSetOption]}
                        />
                    </FormRow>

                    <FormRow>
                        <FieldCommandSeparator />
                    </FormRow>

                    <FormRow>
                        <FieldCommandDefaultMessage />
                    </FormRow>

                    <FormRow>
                        <FieldCommandWrongFormatMessage />
                    </FormRow>

                    <FormRow>
                        <FieldCommandNoUserMessage />
                    </FormRow>

                    <FormRow>
                        <FieldCommandMoreThanOneOrgUnitMessage />
                    </FormRow>

                    <FormRow>
                        <FieldCommandSuccessMessage />
                    </FormRow>

                    {DE_COC_combination_data && (
                        <DataElementTimesCategoryOptionCombos
                            DE_COC_combinations={DE_COC_combination_data}
                        />
                    )}

                    <div>
                        <h2>Special characters</h2>

                        <FormSpy subscription={{ values: true }}>
                            {({ values }) => (
                                <>
                                    {values[
                                        FIELD_COMMAND_SPECIAL_CHARS_NAME
                                    ].map((_, index) => (
                                        <FormRow key={index}>
                                            <FieldCommandSpecialCharacter
                                                index={index}
                                            />
                                        </FormRow>
                                    ))}
                                </>
                            )}
                        </FormSpy>

                        <CommandsAddSpecialCharacters />

                        <FormRow>
                            <hr />
                        </FormRow>
                    </div>

                    <SubmitErrors />
                    <SaveCommandButton />
                </form>
            )}
        </Form>
    )
}

CommandEditJ2MEParserForm.propTypes = {
    commandId: PropTypes.string.isRequired,
    onAfterChange: PropTypes.func.isRequired,
}
