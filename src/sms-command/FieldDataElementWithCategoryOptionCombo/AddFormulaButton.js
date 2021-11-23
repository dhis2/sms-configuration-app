import { useDataEngine } from '@dhis2/app-runtime'
import { PropTypes } from '@dhis2/prop-types'
import { Button, ReactFinalForm } from '@dhis2/ui'
import React, { useEffect, useState } from 'react'
import i18n from '../../locales'
import { dataTest } from '../../shared'
import { CurrentFormula } from './CurrentFormula'

const { useField } = ReactFinalForm

const DATA_ELEMENTS_QUERY = {
    dataElement: {
        resource: 'dataElements',
        id: ({ id }) => id,
        params: () => ({ fields: 'displayName' }),
    },
}

export const AddFormulaButton = ({ baseName, onClick, disabled }) => {
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
                .then((response) => {
                    const { displayName } = response.dataElement
                    setFormulaDataElementName(displayName)
                })
                .finally(() => setLoading(false))
        }
    }, [dataElementId])

    return (
        <>
            <CurrentFormula
                code={code}
                formula={formula}
                formulaDataElementName={formulaDataElementName}
                loading={loading}
                operator={operator}
            />

            <Button
                small
                onClick={onClick}
                disabled={disabled}
                dataTest={dataTest(
                    'smscommand-fielddataelementwithcategoryoptioncombo-addformulabutton'
                )}
            >
                {formula ? i18n.t('Edit formula') : i18n.t('Add formula')}
            </Button>
        </>
    )
}

AddFormulaButton.propTypes = {
    baseName: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
}
