import { FIELD_COMMAND_SMS_CODES_NAME } from '../smsCommandFields'

export const DE_COC_toFormName = (dataElement, categoryOptionCombo) => {
    const dataElementId = dataElement.id
    const cocCode = categoryOptionCombo?.code
    const isDefault = cocCode === 'default'

    if (!cocCode || isDefault) {
        return `${FIELD_COMMAND_SMS_CODES_NAME}.${dataElementId}`
    }

    return `${FIELD_COMMAND_SMS_CODES_NAME}.${dataElementId}-${cocCode}`
}
