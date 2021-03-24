import { FIELD_DATA_SET_NAME } from '../../dataSet'
import { FIELD_COMMAND_NAME } from '../FieldCommandName'
import {
    AT_LEAST_ONE_DATAVALUE,
    FIELD_COMPLETENESS_METHOD_NAME,
} from '../FieldCompletenessMethod'
import { FIELD_DEFAULT_MESSAGE_NAME } from '../FieldDefaultMessage'
import { FIELD_MORE_THAN_ONE_ORG_UNIT_MESSAGE_NAME } from '../FieldMoreThanOneOrgUnitMessage'
import { FIELD_NO_USER_MESSAGE_NAME } from '../FieldNoUserMessage'
import { J2ME_PARSER, FIELD_PARSER_NAME } from '../FieldParser'
import { FIELD_SEPARATOR_NAME } from '../FieldSeparator'
import { FIELD_SMS_CODES_NAME } from '../FieldSmsCode'
import { FIELD_SPECIAL_CHARS_NAME } from '../FieldSpecialCharacter'
import { FIELD_SUCCESS_MESSAGE_NAME } from '../FieldSuccessMessage'
import { FIELD_USE_CURRENT_PERIOD_FOR_REPORTING_NAME } from '../FieldUseCurrentPeriodForReporting'
import { FIELD_WRONG_FORMAT_MESSAGE_NAME } from '../FieldWrongFormatMessage'

export const getInitialFormState = command => {
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
    const smsCodes = command[FIELD_SMS_CODES_NAME].reduce(
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
    const specialCharacters = command[FIELD_SPECIAL_CHARS_NAME] || []

    return {
        [FIELD_COMMAND_NAME]: name,
        [FIELD_PARSER_NAME]: parserType,
        [FIELD_DATA_SET_NAME]: dataSetId,
        [FIELD_SEPARATOR_NAME]: separator,
        [FIELD_COMPLETENESS_METHOD_NAME]: completenessMethod,
        [FIELD_USE_CURRENT_PERIOD_FOR_REPORTING_NAME]: useCurrentPeriodForReporting,
        [FIELD_DEFAULT_MESSAGE_NAME]: defaultMessage,
        [FIELD_WRONG_FORMAT_MESSAGE_NAME]: wrongFormatMessage,
        [FIELD_NO_USER_MESSAGE_NAME]: noUserMessage,
        [FIELD_MORE_THAN_ONE_ORG_UNIT_MESSAGE_NAME]: moreThanOneOrgUnitMessage,
        [FIELD_SUCCESS_MESSAGE_NAME]: successMessage,
        smsCodes,
        specialCharacters,
    }
}
