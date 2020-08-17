import React, { useState } from 'react'
import i18n from '../../locales'

import { ListActions } from '../../dataList'
import { PageHeadline } from '../../headline'
import {
    useDeleteSmsCommandMutation,
    useReadSmsCommandsQuery,
} from '../../commands'
import { dataTest } from '../../dataTest'

export const SMS_COMMAND_LIST_LABEL = i18n.t('SMS Command')
export const SMS_COMMAND_LIST_PATH = '/sms-config'

export const SmsCommandList = () => {
    const [checkedSmsCommands] = useState([])

    const {
        loading: loadingReadSmsCommands,
        error: errorReadSmsCommands,
        data,
    } = useReadSmsCommandsQuery()

    const [
        { loading: loadingDelete /*, error: errorDelete */ },
    ] = useDeleteSmsCommandMutation()

    return (
        <div data-test={dataTest('views-smscommandlist')}>
            <PageHeadline>{SMS_COMMAND_LIST_LABEL}</PageHeadline>

            <p>
                {i18n.t(
                    'There are five different types of SmsCommands supported by SMS Service. SMS can be sent if any one of the gateway is configured. If more than one gateways are present, then they will be used in round-robin fashion for load balancing'
                )}
            </p>

            <ListActions
                addLabel={i18n.t('Add command')}
                deleteLabel={i18n.t('Delete selected gateway commands')}
                dataTest="views-smscommandlist"
                onAddClick={() => null}
                onDeleteClick={() => null}
                disableAdd={loadingDelete}
                disableDelete={!checkedSmsCommands.length || loadingDelete}
            />

            {loadingReadSmsCommands && i18n.t('Loading gateway configurations')}
            {errorReadSmsCommands &&
                i18n.t(
                    'Something went wrong: %s',
                    errorReadSmsCommands.message
                )}

            <p>
                {data?.smsCommands?.smsCommands?.map(({ id, displayName }) => (
                    <div key={id}>{displayName}</div>
                ))}
            </p>
        </div>
    )
}
