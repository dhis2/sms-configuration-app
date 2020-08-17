import { SingleSelectFieldFF, ReactFinalForm } from '@dhis2/ui'
import { PropTypes } from '@dhis2/prop-types'
import React from 'react'

import { dataTest } from '../dataTest'
import i18n from '../locales'

const { Field } = ReactFinalForm

export const FieldDataSet = ({ dataSets }) => (
    <Field
        required
        dataTest={dataTest('forms-fielddataset')}
        name="selectedDataSetID"
        label={i18n.t('Parser')}
        component={SingleSelectFieldFF}
        options={dataSets}
    />
)

FieldDataSet.propTypes = {
    dataSets: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
        })
    ).isRequired,
}
