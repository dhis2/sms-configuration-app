import i18n from '@dhis2/d2-i18n'

export const RECEIVED_SMS_LIST_LABEL = i18n.t('Received sms')
export const RECEIVED_SMS_LIST_PATH = '/received'

export const STATUS_ALL = 'ALL'

// dhis-2/dhis-api/src/main/java/org/hisp/dhis/sms/incoming/SmsMessageStatus.java
export const STATUS_FILTER_OPTIONS = [
    { value: STATUS_ALL, label: i18n.t('All') },
    { value: 'INCOMING', label: i18n.t('Incoming') },
    { value: 'PROCESSING', label: i18n.t('Processing') },
    { value: 'UNHANDLED', label: i18n.t('Unhandled') },
    { value: 'FAILED', label: i18n.t('Failed') },
    { value: 'PROCESSED', label: i18n.t('Processed') },
    { value: 'SENT', label: i18n.t('Sent') },
]
