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
import { PropTypes } from '@dhis2/prop-types'
import React, { useMemo } from 'react'

import { FIELD_DATA_SET_NAME } from '../dataSet'
import { FormRow } from '../forms'
import { dataTest } from '../dataTest'
import { useReadDataElementsOfDataSetQuery } from '../dataElement'
import i18n from '../locales'

const { Field, Form, useForm, useField } = ReactFinalForm

export const FieldDataElementWithCategoryOptionComboFormula = ({
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

    const { loading, error, data } = useReadDataElementsOfDataSetQuery(
        dataSetId
    )

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
        'smscommandfields-fielddataelementwithcategoryoptioncomboformula'
    )

    if (loading) {
        return (
            <Modal dataTest={modalDataTest}>
                <CircularLoader />
            </Modal>
        )
    }

    const options = data.map(dataElement => {
        const { id, displayName } = dataElement

        return {
            value: id,
            label: displayName,
        }
    })

    const onSubmit = values => {
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
                        onSubmit={event => {
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
                                        'smscommandfields-fielddataelementwithcategoryoptioncomboformula-dataelement'
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
                                        'smscommandfields-fielddataelementwithcategoryoptioncomboformula-operator'
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
                                        'smscommandfields-fielddataelementwithcategoryoptioncomboformula-remove'
                                    )}
                                >
                                    {i18n.t('Remove')}
                                </Button>

                                <Button
                                    onClick={onClose}
                                    dataTest={dataTest(
                                        'smscommandfields-fielddataelementwithcategoryoptioncomboformula-cancel'
                                    )}
                                >
                                    {i18n.t('Cancel')}
                                </Button>

                                <Button
                                    type="submit"
                                    primary
                                    dataTest={dataTest(
                                        'smscommandfields-fielddataelementwithcategoryoptioncomboformula-save'
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

FieldDataElementWithCategoryOptionComboFormula.propTypes = {
    baseName: PropTypes.string.isRequired,
    combo: PropTypes.string.isRequired,
    targetFieldName: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
}
