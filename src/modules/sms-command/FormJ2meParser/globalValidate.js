import i18n from '../../../locales'
import { FIELD_SMS_CODES_NAME } from '../FieldSmsCode'
import { getSmsCodeDuplicates } from '../getSmsCodeDuplicates'

export const globalValidate = values => {
    let hasErrors = false
    const errors = {}

    const smsCodesFormState = values[FIELD_SMS_CODES_NAME]
    const smsCodes = smsCodesFormState ? Object.entries(smsCodesFormState) : []
    const smsCodesWithValue = smsCodes.filter(([_, { code }]) => code) //eslint-disable-line no-unused-vars

    if (smsCodesWithValue.length) {
        const duplicates = getSmsCodeDuplicates(smsCodesWithValue)

        if (duplicates.length) {
            hasErrors = true

            const duplicateErrors = {}

            duplicates.forEach(duplicate => {
                duplicateErrors[duplicate] = {
                    code: i18n.t('Duplicate value!'),
                }
            })

            errors[FIELD_SMS_CODES_NAME] = errors[FIELD_SMS_CODES_NAME] || {}
            Object.assign(errors[FIELD_SMS_CODES_NAME], duplicateErrors)
        }
    }

    return hasErrors ? errors : undefined
}
