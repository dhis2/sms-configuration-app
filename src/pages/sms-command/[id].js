import { NoticeBox, CenteredContent, CircularLoader } from '@dhis2/ui'
import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { CancelDialog } from '../../components/cancelDialog'
import { PageHeadline } from '../../components/headline'
import {
    isParserType,
    useReadSmsCommandParserTypeQuery,
} from '../../components/smsCommand'
import { CommandEditAlertParserForm } from '../../components/smsCommandAlertParser'
import { CommandEditEventRegistrationParserForm } from '../../components/smsCommandEventRegistrationParser'
import {
    ALERT_PARSER,
    EVENT_REGISTRATION_PARSER,
    J2ME_PARSER,
    KEY_VALUE_PARSER,
    PROGRAM_STAGE_DATAENTRY_PARSER,
    TRACKED_ENTITY_REGISTRATION_PARSER,
    UNREGISTERED_PARSER,
    FIELD_COMMAND_PARSER_NAME,
} from '../../components/smsCommandFields'
import { CommandEditJ2MEParserForm } from '../../components/smsCommandJ2MEParser'
import { CommandEditKeyValueParserForm } from '../../components/smsCommandKeyValueParser'
import { CommandEditProgramStageDataEntryParserForm } from '../../components/smsCommandProgramStageDataEntryParser'
import { CommandEditTrackedEntityRegistrationParserForm } from '../../components/smsCommandTrackedEntityRegistrationParser'
import { CommandEditUnregisteredParserForm } from '../../components/smsCommandUnregisteredParser'
import i18n from '../../locales'
import { dataTest } from '../../utils'
import styles from './[id].module.css'

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

export const SmsCommandEdit = () => {
    const history = useHistory()
    const { id } = useParams()
    const { loading, error, data } = useReadSmsCommandParserTypeQuery(id)
    const [showCancelDialog, setShowCancelDialog] = useState(false)
    const onAfterChange = () => history.push('/sms-command')
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
                    onConfirmCancel={() => history.push('/sms-command')}
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
