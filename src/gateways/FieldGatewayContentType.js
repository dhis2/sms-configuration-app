import { SingleSelectFieldFF, ReactFinalForm } from '@dhis2/ui'
import React from 'react'
import { dataTest } from '../dataTest'
import i18n from '../locales'

const { Field } = ReactFinalForm

const optionApplicationJson = {
    label: i18n.t('Application/json'),
    value: 'APPLICATION_JSON',
}

const optionApplicationXml = {
    label: i18n.t('Application/xml'),
    value: 'APPLICATION_XML',
}

const optionFormUrlEncoded = {
    label: i18n.t('Form url encoded'),
    value: 'FORM_URL_ENCODED',
}

const optionTextPlain = {
    label: i18n.t('Plain text'),
    value: 'TEXT_PLAIN',
}

const options = [
    optionApplicationJson,
    optionApplicationXml,
    optionFormUrlEncoded,
    optionTextPlain,
]

export const FieldGatewayContentType = () => (
    <Field
        dataTest={dataTest('gateways-fieldgatewaycontenttype')}
        name="contentType"
        label={i18n.t('Content type')}
        component={SingleSelectFieldFF}
        options={options}
        initialValue={optionApplicationJson.value}
    />
)
