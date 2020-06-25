import i18n from '../locales'

export const getTypeLabelByType = type => {
    if (type === 'bulksms') {
        return i18n.t('BulkSMS')
    }

    if (type === 'clickatell') {
        return i18n.t('Clickatell')
    }

    if (type === 'generic' || !type) {
        return i18n.t('Generic')
    }

    return type
}
