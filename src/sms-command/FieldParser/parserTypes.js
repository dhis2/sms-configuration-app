import i18n from '../../locales'

const KEY_VALUE_PARSER = {
    value: 'KEY_VALUE_PARSER',
    label: i18n.t('Key value parser'),
}

// @TODO: This parser is not listed in the docs,
//        but it's listed in the original source code
//   -> docs: https://docs.dhis2.org/master/en/dhis2_developer_manual/web-api.html#sms-command-values
//   -> code: https://github.com/dhis2/dhis2-core/blob/79bd77ecf52051b00e3ba96eb1aca4d0a6063ed1/dhis-2/dhis-web/dhis-web-maintenance/dhis-web-maintenance-mobile/src/main/webapp/dhis-web-maintenance-mobile/smscommand/edit-sms-command.vm#L188
const J2ME_PARSER = {
    value: 'J2ME_PARSER',
    label: i18n.t('J2ME parser'),
}

const ALERT_PARSER = {
    value: 'ALERT_PARSER',
    label: i18n.t('Alert parser'),
}

const UNREGISTERED_PARSER = {
    value: 'UNREGISTERED_PARSER',
    label: i18n.t('Unregistered parser'),
}

const TRACKED_ENTITY_REGISTRATION_PARSER = {
    value: 'TRACKED_ENTITY_REGISTRATION_PARSER',
    label: i18n.t('Tracked entity registration parser'),
}

const PROGRAM_STAGE_DATAENTRY_PARSER = {
    value: 'PROGRAM_STAGE_DATAENTRY_PARSER',
    label: i18n.t('Program stage data entry parser'),
}

const EVENT_REGISTRATION_PARSER = {
    value: 'EVENT_REGISTRATION_PARSER',
    label: i18n.t('Event registration parser'),
}

export const parserTypes = {
    KEY_VALUE_PARSER,
    J2ME_PARSER,
    ALERT_PARSER,
    UNREGISTERED_PARSER,
    TRACKED_ENTITY_REGISTRATION_PARSER,
    PROGRAM_STAGE_DATAENTRY_PARSER,
    EVENT_REGISTRATION_PARSER,
}
