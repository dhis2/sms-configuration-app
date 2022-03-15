import { useDataEngine } from '@dhis2/app-runtime'
import { useSubmit } from '../../shared/index.js'
import { FIELD_COMMAND_NAME } from '../FieldCommandName/index.js'
import { FIELD_COMPLETENESS_METHOD_NAME } from '../FieldCompletenessMethod/index.js'
import { FIELD_DATA_SET_NAME } from '../FieldDataSet/index.js'
import { FIELD_DEFAULT_MESSAGE_NAME } from '../FieldDefaultMessage/index.js'
import { FIELD_MORE_THAN_ONE_ORG_UNIT_MESSAGE_NAME } from '../FieldMoreThanOneOrgUnitMessage/index.js'
import { FIELD_NO_USER_MESSAGE_NAME } from '../FieldNoUserMessage/index.js'
import { FIELD_PARSER_NAME } from '../FieldParser/index.js'
import { FIELD_SEPARATOR_NAME } from '../FieldSeparator/index.js'
import { FIELD_SMS_CODES_NAME } from '../FieldSmsCode/index.js'
import { FIELD_SPECIAL_CHARS_NAME } from '../FieldSpecialCharacter/index.js'
import { FIELD_SUCCESS_MESSAGE_NAME } from '../FieldSuccessMessage/index.js'
import { FIELD_USE_CURRENT_PERIOD_FOR_REPORTING_NAME } from '../FieldUseCurrentPeriodForReporting/index.js'
import { FIELD_WRONG_FORMAT_MESSAGE_NAME } from '../FieldWrongFormatMessage/index.js'

const updateKeyValueParserMutation = {
    resource: 'smsCommands',
    type: 'update',
    id: ({ id }) => id,
    data: (command) => {
        const name = command[FIELD_COMMAND_NAME]
        const parserType = command[FIELD_PARSER_NAME]
        const dataSetId = { id: command[FIELD_DATA_SET_NAME].id }
        const separator = command[FIELD_SEPARATOR_NAME]
        const completenessMethod = command[FIELD_COMPLETENESS_METHOD_NAME]
        const useCurrentPeriodForReporting =
            command[FIELD_USE_CURRENT_PERIOD_FOR_REPORTING_NAME]
        const defaultMessage = command[FIELD_DEFAULT_MESSAGE_NAME]
        const wrongFormatMessage = command[FIELD_WRONG_FORMAT_MESSAGE_NAME]
        const noUserMessage = command[FIELD_NO_USER_MESSAGE_NAME]
        const moreThanOneOrgUnitMessage =
            command[FIELD_MORE_THAN_ONE_ORG_UNIT_MESSAGE_NAME]
        const successMessage = command[FIELD_SUCCESS_MESSAGE_NAME]
        const specialCharacters = command[FIELD_SPECIAL_CHARS_NAME] || []
        const smsCodes = Object.values(command[FIELD_SMS_CODES_NAME]).map(
            ({ code: codeWrapper, compulsory, optionId, dataElement }) => {
                const { code, formula } = codeWrapper
                const formattedSmsCode = {
                    code,
                    compulsory: !!compulsory,
                    dataElement,
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

        const params = {
            [FIELD_COMMAND_NAME]: name,
            [FIELD_PARSER_NAME]: parserType,
            [FIELD_DATA_SET_NAME]: dataSetId,
            [FIELD_SEPARATOR_NAME]: separator,
            [FIELD_COMPLETENESS_METHOD_NAME]: completenessMethod,
            [FIELD_USE_CURRENT_PERIOD_FOR_REPORTING_NAME]:
                useCurrentPeriodForReporting,
            [FIELD_DEFAULT_MESSAGE_NAME]: defaultMessage,
            [FIELD_WRONG_FORMAT_MESSAGE_NAME]: wrongFormatMessage,
            [FIELD_NO_USER_MESSAGE_NAME]: noUserMessage,
            [FIELD_MORE_THAN_ONE_ORG_UNIT_MESSAGE_NAME]:
                moreThanOneOrgUnitMessage,
            [FIELD_SUCCESS_MESSAGE_NAME]: successMessage,
            [FIELD_SPECIAL_CHARS_NAME]: specialCharacters,
            [FIELD_SMS_CODES_NAME]: smsCodes,
        }

        return params
    },
}

export const useUpdateCommandMutation = ({ id, onAfterChange }) => {
    const engine = useDataEngine()
    const onSubmit = (values) => {
        const variables = {
            ...values,
            id,
            smsCodes:
                !values.smsCodes || !Object.values(values.smsCodes).length
                    ? []
                    : Object.entries(values.smsCodes).map(([key, value]) => {
                          const [dataElementId, categoryOptionComboId] =
                              key.split('-')

                          return {
                              ...(categoryOptionComboId
                                  ? {
                                        optionId: { id: categoryOptionComboId },
                                    }
                                  : {}),
                              code: value,
                              dataElement: {
                                  id: dataElementId,
                              },
                          }
                      }),
        }

        return engine
            .mutate(updateKeyValueParserMutation, { variables })
            .then(onAfterChange)
    }

    return useSubmit(onSubmit)
}
