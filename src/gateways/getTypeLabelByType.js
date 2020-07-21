import i18n from '../locales'

/**
 * @param {string} type
 * @returns {string}
 */
export const getTypeLabelByType = type => {
    if (type === 'bulksms') {
        return i18n.t('BulkSMS')
    }

    if (type === 'clickatell') {
        return i18n.t('Clickatell')
    }

    if (type === 'http' || !type) {
        return i18n.t('Generic')
    }

    return type
}
