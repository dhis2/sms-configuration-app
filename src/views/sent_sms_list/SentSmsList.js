import React from 'react'
import { useDataQuery } from '@dhis2/app-runtime'
import i18n from '../../locales'
import data from './data'
import SentSmsTable from './SentSmsTable'

export const SENT_SMS_LIST_LABEL = i18n.t('List of sent sms')
export const SENT_SMS_LIST_PATH = '/sent'

// FIXME: should be replaced with the actual resource for messages
const query = {
    me: {
        resource: 'me',
    },
}

export const SentSmsList = () => {
    const { loading, error } = useDataQuery(query)

    if (loading) {
        return 'Loading'
    }

    if (error) {
        return error.message
    }

    return (
        <React.Fragment>
            <SentSmsTable messages={data} />
        </React.Fragment>
    )
}
