import { useHistory, useParams } from 'react-router-dom'
import React, { useState } from 'react'

import {
    FIELD_COMMAND_PARSER_NAME,
    KEY_VALUE_PARSER,
    isParserType,
    useReadSmsCommandQuery,
    CommandEditKeyValueParserForm,
} from '../../commands'
import { SMS_COMMAND_LIST_PATH } from './SmsCommandList'
import i18n from '../../locales'

export const SMS_COMMAND_FORM_EDIT_PATH_STATIC = '/sms-config/edit'
export const SMS_COMMAND_FORM_EDIT_PATH = `${SMS_COMMAND_FORM_EDIT_PATH_STATIC}/:id`

export const SmsCommandFormEdit = () => {
    const history = useHistory()
    const { id } = useParams()

    // as the individual parts have to load data as well
    // a general loading indicator is shown until all relevant
    // data has been loaded
    const [isLoading, setIsLoading] = useState(true)

    const { loading, error, data } = useReadSmsCommandQuery(id)

    if (error) return i18n.t('Error: {{error}}', { error: error.message })

    const parserType = data?.smsCommand[FIELD_COMMAND_PARSER_NAME]
    const isParser = isParserType.bind(null, parserType)

    return (
        <div>
            {isLoading && 'Loading...'}

            {data && isParser(KEY_VALUE_PARSER) && (
                <CommandEditKeyValueParserForm
                    command={data.smsCommand}
                    onAfterChange={() => history.push(SMS_COMMAND_LIST_PATH)}
                    onLoadingChange={payload =>
                        setIsLoading(payload.loading || loading)
                    }
                />
            )}
        </div>
    )
}
