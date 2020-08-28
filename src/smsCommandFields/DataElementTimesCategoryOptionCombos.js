import { NoticeBox, ReactFinalForm } from '@dhis2/ui'
import { PropTypes } from '@dhis2/prop-types'
import React from 'react'

import { FIELD_COMMAND_SMS_CODES_NAME } from './fieldNames'
import { FieldDataElementWithCategoryOptionCombo } from './FieldDataElementWithCategoryOptionCombo'
import { FormRow } from '../forms'
import i18n from '../locales'
import styles from './DataElementTimesCategoryOptionCombos.module.css'

const { FormSpy } = ReactFinalForm

export const DataElementTimesCategoryOptionCombos = ({
    DE_COC_combinations,
    allRequired,
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
            {DE_COC_combinations.map(({ dataElement, categoryOptionCombo }) => {
                return (
                    <FormRow
                        className={styles.formRow}
                        key={dataElement.id + categoryOptionCombo?.id}
                    >
                        <FieldDataElementWithCategoryOptionCombo
                            required={allRequired}
                            dataElement={dataElement}
                            categoryOptionCombo={categoryOptionCombo}
                        />
                    </FormRow>
                )
            })}
        </div>
    </div>
)

DataElementTimesCategoryOptionCombos.defaultProps = {
    allRequired: false,
}

DataElementTimesCategoryOptionCombos.propTypes = {
    DE_COC_combinations: PropTypes.arrayOf(
        PropTypes.shape({
            dataElement: PropTypes.shape({
                displayName: PropTypes.string.isRequired,
                id: PropTypes.string.isRequired,
            }).isRequired,
            categoryOptionCombo: PropTypes.shape({
                code: PropTypes.string.isRequired,
                displayName: PropTypes.string.isRequired,
                id: PropTypes.string.isRequired,
            }),
        })
    ).isRequired,
    allRequired: PropTypes.bool,
}
