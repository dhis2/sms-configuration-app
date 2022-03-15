import { PropTypes } from '@dhis2/prop-types'
import { InputFieldFF, ReactFinalForm } from '@dhis2/ui'
import React, { useState } from 'react'
import i18n from '../../locales/index.js'
import { dataTest } from '../../shared/index.js'
import { FIELD_SMS_CODES_NAME } from '../FieldSmsCode/index.js'
import { AddFormulaButton } from './AddFormulaButton.js'
import styles from './FieldDataElementWithCategoryOptionCombo.module.css'
import { FormulaModalForm } from './FormulaModalForm.js'

const DE_COC_toFormName = (dataElement, categoryOptionCombo) => {
    const dataElementId = dataElement.id
    const cocCode = categoryOptionCombo?.id
    const isDefault = cocCode === 'default'

    if (!cocCode || isDefault) {
        return `${FIELD_SMS_CODES_NAME}.${dataElementId}`
    }

    return `${FIELD_SMS_CODES_NAME}.${dataElementId}-${cocCode}`
}

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
        <div
            className={styles.container}
            data-test={dataTest(
                'smscommand-fielddataelementwithcategoryoptioncombo'
            )}
        >
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
                            <InputFieldFF
                                {...rest}
                                className={styles.codeField}
                                input={input}
                                meta={meta}
                                error={!!meta.error}
                            />

                            <AddFormulaButton
                                disabled={!code}
                                baseName={baseName}
                                formulaFieldName={formulaName}
                                onClick={() => setShowFormula(true)}
                            />

                            {showFormula && (
                                <FormulaModalForm
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
        displayName: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
    }),
}
