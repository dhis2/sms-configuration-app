import { CheckboxFieldFF, ReactFinalForm } from '@dhis2/ui'
import React from 'react'
import { dataTest } from '../dataTest'
import i18n from '../locales'
import { FIELD_COMMAND_USE_CURRENT_PERIOD_FOR_REPORTING_NAME } from './fieldNames'

const { Field } = ReactFinalForm

export const FieldCommandUseCurrentPeriodForReporting = () => (
    <Field
        type="checkbox"
        dataTest={dataTest(
            'smscommandfields-fieldcommandusecurrentperiodforreporting'
        )}
        name={FIELD_COMMAND_USE_CURRENT_PERIOD_FOR_REPORTING_NAME}
        label={i18n.t('Use current period for reporting')}
        component={CheckboxFieldFF}
    />
)
