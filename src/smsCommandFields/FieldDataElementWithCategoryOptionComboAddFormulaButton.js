import { Button, ReactFinalForm } from '@dhis2/ui'
import { PropTypes } from '@dhis2/prop-types'
import { useDataEngine } from '@dhis2/app-runtime'
import React, { useEffect, useState } from 'react'
import { dataTest } from '../dataTest'
import i18n from '../locales'
import styles from './FieldDataElementWithCategoryOptionComboAddFormulaButton.module.css'

const { useField } = ReactFinalForm

const DATA_ELEMENTS_QUERY = {
    dataElement: {
        resource: 'dataElements',
        id: ({ id }) => id,
        params: () => ({ fields: 'displayName' }),
    },
}

export const FieldDataElementWithCategoryOptionComboAddFormulaButton = ({
    baseName,
    onClick,
    disabled,
}) => {
    const engine = useDataEngine()
    const [loading, setLoading] = useState(false)
    const [formulaDataElementName, setFormulaDataElementName] = useState('')

    const smsCode = useField(baseName, {
        subscription: { value: true },
    }).input.value

    const { formula, code } = smsCode
    const operator = formula && formula[0]
    const dataElementId = formula && formula.slice(1)

    useEffect(() => {
        if (dataElementId) {
            setLoading(true)

            engine
                .query(DATA_ELEMENTS_QUERY, {
                    variables: { id: dataElementId },
                })
                .then(response => {
                    const { displayName } = response.dataElement
                    setFormulaDataElementName(displayName)
                })
                .finally(() => setLoading(false))
        }
    }, [dataElementId])

    return (
        <>
            {code && formula && formulaDataElementName && (
                <span
                    className={styles.formulaInWords}
                    data-test={dataTest(
                        'smscommandfields-fielddataelementwithcategoryoptioncomboaddformulabutton-formulainwords'
                    )}
                >
                    <span className={styles.formulaInWordsLabel}>
                        {i18n.t('Formula')}:
                    </span>

                    {loading && i18n.t('Loading formula')}
                    {!loading &&
                        `${code} ${operator} ${formulaDataElementName}`}
                </span>
            )}

            <Button
                small
                onClick={onClick}
                disabled={disabled}
                dataTest={dataTest(
                    'smscommandfields-fielddataelementwithcategoryoptioncomboaddformulabutton-button'
                )}
            >
                {formula ? i18n.t('Edit formula') : i18n.t('Add formula')}
            </Button>
        </>
    )
}

FieldDataElementWithCategoryOptionComboAddFormulaButton.propTypes = {
    baseName: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
}
