import { InputFieldFF, ReactFinalForm } from '@dhis2/ui'
import { PropTypes } from '@dhis2/prop-types'
import React, { useState } from 'react'

import { DE_COC_toFormName } from '../smsCommand'
import { FieldDataElementWithCategoryOptionComboFormula } from './FieldDataElementWithCategoryOptionComboFormula'
import { FieldDataElementWithCategoryOptionComboAddFormulaButton } from './FieldDataElementWithCategoryOptionComboAddFormulaButton'
import { FormRow } from '../forms'
import i18n from '../locales'
import styles from './FieldDataElementWithCategoryOptionCombo.module.css'

const { Field } = ReactFinalForm

export const FieldDataElementWithCategoryOptionCombo = ({
    dataElement,
    categoryOptionCombo,
}) => {
    const [showFormula, setShowFormula] = useState(false)

    const label = categoryOptionCombo
        ? `${dataElement.displayName} ${categoryOptionCombo.displayName}`
        : `${dataElement.displayName} ${i18n.t('default')}`

    const baseName = DE_COC_toFormName(dataElement, categoryOptionCombo)
    const name = `${baseName}.code`
    const formulaName = `${baseName}.formula`

    return (
        <div className={styles.container}>
            <Field
                className={styles.field}
                label={label}
                name={name}
                subscription={{
                    value: true,
                    error: true,
                    invalid: true,
                    touched: true,
                }}
            >
                {({ input, meta, ...rest }) => {
                    const code = input.value

                    return (
                        <>
                            <FormRow>
                                <InputFieldFF
                                    {...rest}
                                    input={input}
                                    meta={meta}
                                    error={!!meta.error}
                                />
                            </FormRow>

                            <FieldDataElementWithCategoryOptionComboAddFormulaButton
                                disabled={!code}
                                baseName={baseName}
                                formulaFieldName={formulaName}
                                onClick={() => setShowFormula(true)}
                            />

                            {showFormula && (
                                <FieldDataElementWithCategoryOptionComboFormula
                                    baseName={baseName}
                                    combo={label}
                                    targetFieldName={formulaName}
                                    onClose={() => setShowFormula(false)}
                                />
                            )}
                        </>
                    )
                }}
            </Field>
        </div>
    )
}

FieldDataElementWithCategoryOptionCombo.defaultProps = {
    categoryOptionCombo: null,
    formula: '',
}

FieldDataElementWithCategoryOptionCombo.propTypes = {
    dataElement: PropTypes.shape({
        displayName: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
    }).isRequired,
    categoryOptionCombo: PropTypes.shape({
        code: PropTypes.string.isRequired,
        displayName: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
    }),
}
