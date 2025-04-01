import { PropTypes } from '@dhis2/prop-types'
import { SingleSelectFieldFF, ReactFinalForm, hasValue } from '@dhis2/ui'
import React from 'react'
import i18n from '../../locales/index.js'
import { dataTest } from '../../shared/index.js'
import { parserTypes } from './parserTypes.js'

const { Field } = ReactFinalForm
const options = Object.values(parserTypes).sort((a, b) => {
    if (a.label < b.label) {
        return -1
    }
    if (a.label > b.label) {
        return 1
    }
    return 0
})

export const FIELD_PARSER_NAME = 'parserType'

export const FieldParser = ({ disabled }) => (
    <Field
        required
        disabled={disabled}
        dataTest={dataTest('smscommand-fieldparser')}
        name={FIELD_PARSER_NAME}
        label={i18n.t('Parser')}
        component={SingleSelectFieldFF}
        options={options}
        validate={hasValue}
    />
)

FieldParser.defaultProps = {
    disabled: false,
}

FieldParser.propTypes = {
    disabled: PropTypes.bool,
}
