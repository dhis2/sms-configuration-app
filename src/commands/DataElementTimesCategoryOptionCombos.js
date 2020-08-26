import { NoticeBox, ReactFinalForm } from '@dhis2/ui'
import { PropTypes } from '@dhis2/prop-types'
import React from 'react'

import { FIELD_COMMAND_SMS_CODES_NAME } from './fieldNames'
import { FieldDataElementWithCategoryOptionCombo } from './FieldDataElementWithCategoryOptionCombo'
import { FormRow } from '../forms'
import i18n from '../locales'
import styles from './DataElementTimesCategoryOptionCombo.module.css'

const { FormSpy } = ReactFinalForm

export const DataElementTimesCategoryOptionCombos = ({
    DE_COC_combinations,
}) => (
    <div>
        <h2>{i18n.t('Data element category combination')}</h2>

        <FormSpy subscription={{ errors: true }}>
            {({ errors }) => {
                const smsCodeErrors = errors[FIELD_COMMAND_SMS_CODES_NAME]
                const globalError = smsCodeErrors?.global

                return (
                    <>
                        {globalError && (
                            <FormRow>
                                <NoticeBox
                                    error
                                    title={i18n.t(
                                        'Data element category combination validation error'
                                    )}
                                >
                                    {globalError}
                                </NoticeBox>
                            </FormRow>
                        )}
                    </>
                )
            }}
        </FormSpy>

        <div>
            {DE_COC_combinations.map(({ dataElement, categoryOptionCombo }) => (
                <FormRow
                    className={styles.formRow}
                    key={dataElement.id + categoryOptionCombo?.id}
                >
                    <FieldDataElementWithCategoryOptionCombo
                        allCombos={DE_COC_combinations}
                        dataElement={dataElement}
                        categoryOptionCombo={categoryOptionCombo}
                    />
                </FormRow>
            ))}
        </div>
    </div>
)

DataElementTimesCategoryOptionCombos.propTypes = {
    DE_COC_combinations: PropTypes.arrayOf(
        PropTypes.shape({
            dataElement: PropTypes.shape({
                displayName: PropTypes.string.isRequired,
                id: PropTypes.string.isRequired,
                categoryCombo: PropTypes.shape({
                    id: PropTypes.string.isRequired,
                }),
            }).isRequired,
            categoryOptionCombo: PropTypes.shape({
                code: PropTypes.string.isRequired,
                displayName: PropTypes.string.isRequired,
                id: PropTypes.string.isRequired,
            }),
        })
    ).isRequired,
}
