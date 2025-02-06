import { PropTypes } from '@dhis2/prop-types'
import {
    Button,
    ButtonStrip,
    CircularLoader,
    Modal,
    ModalActions,
    ModalContent,
    ModalTitle,
    NoticeBox,
    ReactFinalForm,
    SingleSelectFieldFF,
    hasValue,
} from '@dhis2/ui'
import React, { useMemo } from 'react'
import i18n from '../../locales/index.js'
import { FormRow, dataTest } from '../../shared/index.js'
import { FIELD_DATA_SET_NAME } from '../FieldDataSet/index.js'
import { useReadDataElementsOfDataSetQuery } from './useReadDataElementsOfDataSetQuery.js'

const { Field, Form, useForm, useField } = ReactFinalForm

export const FormulaModalForm = ({
    baseName,
    combo,
    targetFieldName,
    onClose,
}) => {
    const form = useForm()

    const smsCode = useField(baseName, {
        subscription: { value: true },
    }).input.value

    const dataSetId = useField(FIELD_DATA_SET_NAME, {
        subscription: { value: true },
    }).input.value.id

    const { loading, error, data } =
        useReadDataElementsOfDataSetQuery(dataSetId)

    // Using memo so changing the form does not change the "initialValues"
    // which would cause the form to update unnecessarily
    const initialFormula = smsCode.formula
    const initialOperator = useMemo(
        () => (initialFormula ? initialFormula[0] : '+'),
        []
    )
    const initialDataElementCode = useMemo(
        () => (initialFormula ? initialFormula.slice(1) : ''),
        []
    )

    const initialValues = {
        operator: initialOperator,
        dataElementCode: initialDataElementCode,
    }

    const modalDataTest = dataTest(
        'smscommand-fielddataelementwithcategoryoptioncombo-formulamodalform'
    )

    if (loading) {
        return (
            <Modal dataTest={modalDataTest}>
                <CircularLoader />
            </Modal>
        )
    }

    const options = data.map((dataElement) => {
        const { id, displayName } = dataElement

        return {
            value: id,
            label: displayName,
        }
    })

    const onSubmit = (values) => {
        const newFormula = `${values.operator}${values.dataElementCode}`
        form.change(targetFieldName, newFormula)
        onClose()
    }

    const onRemove = () => {
        form.change(targetFieldName, null)
        onClose()
    }

    return (
        <Form onSubmit={onSubmit} initialValues={initialValues}>
            {({ handleSubmit }) => (
                <Modal dataTest={modalDataTest}>
                    <form
                        onSubmit={(event) => {
                            event.stopPropagation()
                            handleSubmit(event)
                        }}
                    >
                        <ModalTitle>
                            {i18n.t('Formula for {{combo}}', { combo })}
                        </ModalTitle>
                        <ModalContent>
                            <FormRow>
                                <Field
                                    required
                                    dataTest={dataTest(
                                        'smscommand-fielddataelementwithcategoryoptioncomboformula-dataelement'
                                    )}
                                    name="dataElementCode"
                                    label={i18n.t('Data element')}
                                    component={SingleSelectFieldFF}
                                    options={options}
                                    validate={hasValue}
                                />
                            </FormRow>

                            <FormRow>
                                <Field
                                    required
                                    dataTest={dataTest(
                                        'smscommand-fielddataelementwithcategoryoptioncomboformula-operator'
                                    )}
                                    name="operator"
                                    label={i18n.t('formula operator')}
                                    component={SingleSelectFieldFF}
                                    initialValue="+"
                                    options={[
                                        {
                                            value: '+',
                                            label: '+',
                                        },
                                        {
                                            value: '-',
                                            label: '-',
                                        },
                                    ]}
                                />
                            </FormRow>

                            {error && (
                                <FormRow>
                                    <NoticeBox
                                        error
                                        title={i18n.t(
                                            'Something went wrong whilst saving'
                                        )}
                                    >
                                        {error.message}
                                    </NoticeBox>
                                </FormRow>
                            )}
                        </ModalContent>
                        <ModalActions>
                            <ButtonStrip>
                                <Button
                                    onClick={onRemove}
                                    dataTest={dataTest(
                                        'smscommand-fielddataelementwithcategoryoptioncomboformula-remove'
                                    )}
                                >
                                    {i18n.t('Remove')}
                                </Button>

                                <Button
                                    onClick={onClose}
                                    dataTest={dataTest(
                                        'smscommand-fielddataelementwithcategoryoptioncomboformula-cancel'
                                    )}
                                >
                                    {i18n.t('Cancel')}
                                </Button>

                                <Button
                                    type="submit"
                                    primary
                                    dataTest={dataTest(
                                        'smscommand-fielddataelementwithcategoryoptioncomboformula-save'
                                    )}
                                >
                                    {i18n.t('Save')}
                                </Button>
                            </ButtonStrip>
                        </ModalActions>
                    </form>
                </Modal>
            )}
        </Form>
    )
}

FormulaModalForm.propTypes = {
    baseName: PropTypes.string.isRequired,
    combo: PropTypes.string.isRequired,
    targetFieldName: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
}
