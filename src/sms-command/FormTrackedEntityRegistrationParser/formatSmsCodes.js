import { FIELD_SMS_CODES_NAME } from '../FieldSmsCode/index.js'

export const formatSmsCodes = (updates) => ({
    ...updates,
    [FIELD_SMS_CODES_NAME]: Object.values(updates[FIELD_SMS_CODES_NAME]),
})
