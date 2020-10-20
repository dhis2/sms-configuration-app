import { NoticeBox, CenteredContent, CircularLoader } from '@dhis2/ui'
import { useHistory, useParams } from 'react-router-dom'
import React, { useState } from 'react'

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
import { SMS_COMMAND_LIST_PATH } from './SmsCommandList'
import { CancelDialog } from '../../cancelDialog'
import { CommandEditUnregisteredParserForm } from '../../smsCommandUnregisteredParser'
import { CommandEditTrackedEntityRegistrationParserForm } from '../../smsCommandTrackedEntityRegistrationParser'
import { CommandEditProgramStageDataEntryParserForm } from '../../smsCommandProgramStageDataEntryParser'
import { CommandEditKeyValueParserForm } from '../../smsCommandKeyValueParser'
import { CommandEditJ2MEParserForm } from '../../smsCommandJ2MEParser'
import { CommandEditEventRegistrationParserForm } from '../../smsCommandEventRegistrationParser'
import { CommandEditAlertParserForm } from '../../smsCommandAlertParser'
import { PageHeadline } from '../../headline'
import { dataTest } from '../../dataTest'
import {
    isParserType,
    useReadSmsCommandParserTypeQuery,
} from '../../smsCommand'
import i18n from '../../locales'
import styles from './SmsCommandFormEdit.module.css'

export const SMS_COMMAND_FORM_EDIT_PATH_STATIC = '/sms-config/edit'
export const SMS_COMMAND_FORM_EDIT_PATH = `${SMS_COMMAND_FORM_EDIT_PATH_STATIC}/:id`

const getSmsCommandEditFormComponent = parserType => {
    const isParser = isParserType.bind(null, parserType)

    if (parserType && isParser(KEY_VALUE_PARSER)) {
        return CommandEditKeyValueParserForm
    }

    if (parserType && isParser(J2ME_PARSER)) {
        return CommandEditJ2MEParserForm
    }

    if (parserType && isParser(ALERT_PARSER)) {
        return CommandEditAlertParserForm
    }

    if (parserType && isParser(PROGRAM_STAGE_DATAENTRY_PARSER)) {
        return CommandEditProgramStageDataEntryParserForm
    }

    if (parserType && isParser(UNREGISTERED_PARSER)) {
        return CommandEditUnregisteredParserForm
    }

    if (parserType && isParser(EVENT_REGISTRATION_PARSER)) {
        return CommandEditEventRegistrationParserForm
    }

    if (parserType && isParser(TRACKED_ENTITY_REGISTRATION_PARSER)) {
        return CommandEditTrackedEntityRegistrationParserForm
    }

    return null
}

export const SmsCommandFormEdit = () => {
    const history = useHistory()
    const { id } = useParams()
    const { loading, error, data } = useReadSmsCommandParserTypeQuery(id)
    const [showCancelDialog, setShowCancelDialog] = useState(false)
    const onAfterChange = () => history.push(SMS_COMMAND_LIST_PATH)
    const onCancel = pristine =>
        pristine ? history.goBack() : setShowCancelDialog(true)

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
    const FormComponent = getSmsCommandEditFormComponent(parserType)

    return (
        <div
            className={styles.container}
            data-test={dataTest('views-smscommandformedit')}
        >
            <PageHeadline>{i18n.t('Edit command')}</PageHeadline>

            {FormComponent && (
                <FormComponent
                    commandId={id}
                    onCancel={onCancel}
                    onAfterChange={onAfterChange}
                />
            )}

            {showCancelDialog && (
                <CancelDialog
                    onConfirmCancel={() => history.push(SMS_COMMAND_LIST_PATH)}
                    onAbortCancel={() => setShowCancelDialog(false)}
                />
            )}

            {!parserType && (
                <NoticeBox error title={i18n.t('Unrecognised parser type')}>
                    {i18n.t('Could not find the requested parser type')}
                </NoticeBox>
            )}
        </div>
    )
}
