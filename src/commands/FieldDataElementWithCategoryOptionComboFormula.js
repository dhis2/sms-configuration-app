import {
    Button,
    ButtonStrip,
    CircularLoader,
    Modal,
    ModalTitle,
    ModalContent,
    SingleSelectFieldFF,
    ReactFinalForm,
    hasValue,
} from '@dhis2/ui'
import { PropTypes } from '@dhis2/prop-types'
import React, { useMemo } from 'react'

import { FIELD_DATA_SET_NAME } from '../dataSet'
import { FormRow } from '../forms'
import { get } from '../utils'
import { useCriticalNotification } from '../notifications'
import { useReadDataElementsOfDataSetQuery } from '../dataElement'
import i18n from '../locales'

const { Field, Form, useForm, useFormState } = ReactFinalForm

export const FieldDataElementWithCategoryOptionComboFormula = ({
    targetFieldName,
    onClose,
}) => {
    const form = useForm()
    const { values } = useFormState()

    const { id: dataSetId } = values[FIELD_DATA_SET_NAME]
    const { loading, error, data } = useReadDataElementsOfDataSetQuery(
        dataSetId
    )

    useCriticalNotification(error)

    // Using memo so changing the form does not change the "initialValues"
    // which would cause the form to update unnecessarily
    const initialFormula = get(targetFieldName, values)
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

    if (loading) {
        return (
            <Modal>
                <CircularLoader />
            </Modal>
        )
    }

    if (error) {
        onClose()
    }

    const options = data.dataElements.dataElements.map(dataElement => {
        const { code, displayName } = dataElement

        return {
            value: code,
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
                <Modal>
                    <ModalTitle>{i18n.t('')}</ModalTitle>

                    <ModalContent>
                        <form
                            onSubmit={event => {
                                event.stopPropagation()
                                handleSubmit(event)
                            }}
                        >
                            <FormRow>
                                <Field
                                    required
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

                            <FormRow>
                                <ButtonStrip>
                                    <Button type="submit" primary>
                                        {i18n.t('Save')}
                                    </Button>

                                    <Button onClick={onClose}>
                                        {i18n.t('Cancel')}
                                    </Button>

                                    <Button onClick={onRemove}>
                                        {i18n.t('Remove')}
                                    </Button>
                                </ButtonStrip>
                            </FormRow>
                        </form>
                    </ModalContent>
                </Modal>
            )}
        </Form>
    )
}

FieldDataElementWithCategoryOptionComboFormula.propTypes = {
    targetFieldName: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
}
