import { PropTypes } from '@dhis2/prop-types'
import { SingleSelectFieldFF, ReactFinalForm } from '@dhis2/ui'
import React from 'react'

import { FIELD_COMMAND_PARSER_NAME } from './fieldNames'
import * as commandTypes from './parserTypes'
import { dataTest } from '../dataTest'
import i18n from '../locales'

const { Field } = ReactFinalForm
const options = Object.values(commandTypes)

export const FieldCommandParser = ({ disabled }) => (
    <Field
        disabled={disabled}
        dataTest={dataTest('forms-fieldcommandparser')}
        name={FIELD_COMMAND_PARSER_NAME}
        label={i18n.t('Parser')}
        component={SingleSelectFieldFF}
        options={options}
    />
)

FieldCommandParser.defaultProps = {
    disabled: false,
}

FieldCommandParser.propTypes = {
    disabled: PropTypes.bool,
}
