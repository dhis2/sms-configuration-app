import i18n from '@dhis2/d2-i18n'

export const RECEIVED_SMS_LIST_LABEL = i18n.t('Received')
export const RECEIVED_SMS_LIST_PATH = '/received'

export const STATUS_ALL = 'ALL'

// dhis-2/dhis-api/src/main/java/org/hisp/dhis/sms/incoming/SmsMessageStatus.java
export const STATUS_FILTER_OPTIONS = [
    { value: STATUS_ALL, label: i18n.t('All') },
    { value: 'FAILED', label: i18n.t('Failed') },
    { value: 'INCOMING', label: i18n.t('Incoming') },
    { value: 'PROCESSED', label: i18n.t('Processed') },
    { value: 'PROCESSING', label: i18n.t('Processing') },
    { value: 'SENT', label: i18n.t('Sent') },
    { value: 'UNHANDLED', label: i18n.t('Unhandled') },
]
