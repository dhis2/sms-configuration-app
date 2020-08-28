import { NoticeBox, CenteredContent, CircularLoader } from '@dhis2/ui'
import { useHistory, useParams } from 'react-router-dom'
import React from 'react'

import {
    isParserType,
    useReadSmsCommandParserTypeQuery,
} from '../../smsCommand'
import {
    ALERT_PARSER,
    EVENT_REGISTRATION_PARSER,
    J2ME_PARSER,
    KEY_VALUE_PARSER,
    PROGRAM_STAGE_DATAENTRY_PARSER,
    TRACKED_ENTITY_REGISTRATION_PARSER,
    UNREGISTERED_PARSER,
    FIELD_COMMAND_PARSER_NAME,
} from '../../smsCommandFields'
import { CommandEditUnregisteredParserForm } from '../../smsCommandUnregisteredParser'
import { CommandEditTrackedEntityRegistrationParserForm } from '../../smsCommandTrackedEntityRegistrationParser'
import { CommandEditProgramStageDataEntryParserForm } from '../../smsCommandProgramStageDataEntryParser'
import { CommandEditKeyValueParserForm } from '../../smsCommandKeyValueParser'
import { CommandEditJ2MEParserForm } from '../../smsCommandJ2MEParser'
import { CommandEditEventRegistrationParserForm } from '../../smsCommandEventRegistrationParser'
import { CommandEditAlertParserForm } from '../../smsCommandAlertParser'
import { SMS_COMMAND_LIST_PATH } from './SmsCommandList'
import i18n from '../../locales'

export const SMS_COMMAND_FORM_EDIT_PATH_STATIC = '/sms-config/edit'
export const SMS_COMMAND_FORM_EDIT_PATH = `${SMS_COMMAND_FORM_EDIT_PATH_STATIC}/:id`

export const SmsCommandFormEdit = () => {
    const history = useHistory()
    const { id } = useParams()
    const { loading, error, data } = useReadSmsCommandParserTypeQuery(id)

    if (loading) {
        return (
            <CenteredContent>
                <CircularLoader />
            </CenteredContent>
        )
    }

    if (error) {
        const msg = i18n.t('Something went wrong whilst loading commands')

        return (
            <NoticeBox error title={msg}>
                {error.message}
            </NoticeBox>
        )
    }

    const parserType = data?.smsCommand[FIELD_COMMAND_PARSER_NAME]
    const isParser = isParserType.bind(null, parserType)

    // If it's possible to not have data we should handle that as well

    return (
        <div>
            {parserType && isParser(KEY_VALUE_PARSER) && (
                <CommandEditKeyValueParserForm
                    commandId={id}
                    onAfterChange={() => history.push(SMS_COMMAND_LIST_PATH)}
                />
            )}

            {parserType && isParser(J2ME_PARSER) && (
                <CommandEditJ2MEParserForm
                    commandId={id}
                    onAfterChange={() => history.push(SMS_COMMAND_LIST_PATH)}
                />
            )}

            {parserType && isParser(ALERT_PARSER) && (
                <CommandEditAlertParserForm
                    commandId={id}
                    onAfterChange={() => history.push(SMS_COMMAND_LIST_PATH)}
                />
            )}

            {parserType && isParser(PROGRAM_STAGE_DATAENTRY_PARSER) && (
                <CommandEditProgramStageDataEntryParserForm
                    commandId={id}
                    onAfterChange={() => history.push(SMS_COMMAND_LIST_PATH)}
                />
            )}

            {parserType && isParser(UNREGISTERED_PARSER) && (
                <CommandEditUnregisteredParserForm
                    commandId={id}
                    onAfterChange={() => history.push(SMS_COMMAND_LIST_PATH)}
                />
            )}

            {parserType && isParser(EVENT_REGISTRATION_PARSER) && (
                <CommandEditEventRegistrationParserForm
                    commandId={id}
                    onAfterChange={() => history.push(SMS_COMMAND_LIST_PATH)}
                />
            )}

            {parserType && isParser(TRACKED_ENTITY_REGISTRATION_PARSER) && (
                <CommandEditTrackedEntityRegistrationParserForm
                    commandId={id}
                    onAfterChange={() => history.push(SMS_COMMAND_LIST_PATH)}
                />
            )}
        </div>
    )
}
