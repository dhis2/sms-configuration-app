import { FIELD_COMMAND_NAME } from '../FieldCommandName/index.js'
import {
    FIELD_COMPLETENESS_METHOD_NAME,
    completenessMethods,
} from '../FieldCompletenessMethod/index.js'
import { FIELD_DATA_SET_NAME } from '../FieldDataSet/index.js'
import { FIELD_DEFAULT_MESSAGE_NAME } from '../FieldDefaultMessage/index.js'
import { FIELD_MORE_THAN_ONE_ORG_UNIT_MESSAGE_NAME } from '../FieldMoreThanOneOrgUnitMessage/index.js'
import { FIELD_NO_USER_MESSAGE_NAME } from '../FieldNoUserMessage/index.js'
import { FIELD_PARSER_NAME, parserTypes } from '../FieldParser/index.js'
import { FIELD_SEPARATOR_NAME } from '../FieldSeparator/index.js'
import { FIELD_SMS_CODES_NAME } from '../FieldSmsCode/index.js'
import { FIELD_SPECIAL_CHARS_NAME } from '../FieldSpecialCharacter/index.js'
import { FIELD_SUCCESS_MESSAGE_NAME } from '../FieldSuccessMessage/index.js'
import { FIELD_USE_CURRENT_PERIOD_FOR_REPORTING_NAME } from '../FieldUseCurrentPeriodForReporting/index.js'
import { FIELD_WRONG_FORMAT_MESSAGE_NAME } from '../FieldWrongFormatMessage/index.js'

const { AT_LEAST_ONE_DATAVALUE } = completenessMethods
const { J2ME_PARSER } = parserTypes

export const getInitialFormState = (command) => {
    const name = command[FIELD_COMMAND_NAME]
    const parserType = J2ME_PARSER.value
    const dataSetId = { id: command[FIELD_DATA_SET_NAME].id }
    const separator = command[FIELD_SEPARATOR_NAME]
    const completenessMethod = AT_LEAST_ONE_DATAVALUE.value
    const useCurrentPeriodForReporting =
        command[FIELD_USE_CURRENT_PERIOD_FOR_REPORTING_NAME]
    const defaultMessage = command[FIELD_DEFAULT_MESSAGE_NAME]
    const wrongFormatMessage = command[FIELD_WRONG_FORMAT_MESSAGE_NAME]
    const noUserMessage = command[FIELD_NO_USER_MESSAGE_NAME]
    const moreThanOneOrgUnitMessage =
        command[FIELD_MORE_THAN_ONE_ORG_UNIT_MESSAGE_NAME]
    const successMessage = command[FIELD_SUCCESS_MESSAGE_NAME]
    const smsCodes = command[FIELD_SMS_CODES_NAME].reduce((acc, payload) => {
        const {
            code,
            compulsory,
            formula,
            optionId: optionIdWrapper,
            dataElement,
        } = payload
        const { id: optionId } = optionIdWrapper
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
    }, {})
    const specialCharacters = command[FIELD_SPECIAL_CHARS_NAME] || []

    return {
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
        [FIELD_MORE_THAN_ONE_ORG_UNIT_MESSAGE_NAME]: moreThanOneOrgUnitMessage,
        [FIELD_SUCCESS_MESSAGE_NAME]: successMessage,
        smsCodes,
        specialCharacters,
    }
}
