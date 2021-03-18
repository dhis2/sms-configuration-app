import { PropTypes } from '@dhis2/prop-types'
import { hasValue } from '@dhis2/ui'
import { SingleSelectFieldFF, ReactFinalForm } from '@dhis2/ui'
import React from 'react'
import { dataTest } from '../../dataTest'
import i18n from '../../locales'
import { FIELD_COMMAND_PARSER_NAME } from './fieldNames'
import * as commandTypes from './parserTypes'

const { Field } = ReactFinalForm
const options = Object.values(commandTypes).sort((a, b) => {
    if (a.label < b.label) {
        return -1
    }
    if (a.label > b.label) {
        return 1
    }
    return 0
})

export const FieldCommandParser = ({ disabled }) => (
    <Field
        required
        disabled={disabled}
        dataTest={dataTest('forms-fieldcommandparser')}
        name={FIELD_COMMAND_PARSER_NAME}
        label={i18n.t('Parser')}
        component={SingleSelectFieldFF}
        options={options}
        validate={hasValue}
    />
)

FieldCommandParser.defaultProps = {
    disabled: false,
}

FieldCommandParser.propTypes = {
    disabled: PropTypes.bool,
}
