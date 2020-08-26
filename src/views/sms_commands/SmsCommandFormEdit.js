import { useHistory, useParams } from 'react-router-dom'
import React from 'react'

import {
    FIELD_COMMAND_PARSER_NAME,
    KEY_VALUE_PARSER,
    isParserType,
    useReadSmsCommandParserTypeQuery,
    CommandEditKeyValueParserForm,
} from '../../commands'
import { SMS_COMMAND_LIST_PATH } from './SmsCommandList'
import i18n from '../../locales'

export const SMS_COMMAND_FORM_EDIT_PATH_STATIC = '/sms-config/edit'
export const SMS_COMMAND_FORM_EDIT_PATH = `${SMS_COMMAND_FORM_EDIT_PATH_STATIC}/:id`

export const SmsCommandFormEdit = () => {
    const history = useHistory()
    const { id } = useParams()
    const { loading, error, data } = useReadSmsCommandParserTypeQuery(id)

    if (error) return i18n.t('Error: {{error}}', { error: error.message })

    const parserType = data?.smsCommand[FIELD_COMMAND_PARSER_NAME]
    const isParser = isParserType.bind(null, parserType)

    return (
        <div>
            {loading && 'Loading...'}

            {parserType && isParser(KEY_VALUE_PARSER) && (
                <CommandEditKeyValueParserForm
                    commandId={id}
                    onAfterChange={() => history.push(SMS_COMMAND_LIST_PATH)}
                />
            )}
        </div>
    )
}
