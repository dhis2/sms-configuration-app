import {
    Button,
    InputFieldFF,
    ReactFinalForm,
    composeValidators,
    hasValue,
    string,
    url,
} from '@dhis2/ui'
import React from 'react'
import { PropTypes } from '@dhis2/prop-types'

import { AddKeyValuePair } from './AddKeyValuePair'
import { FormRow } from './FormRow'
import { KeyValuePair } from './KeyValuePair'
import i18n from '../locales'

const { Form, Field } = ReactFinalForm

const isStringWithLengthAtLeastOne = composeValidators(string, hasValue)

export const GatewayGenericForm = ({ onSubmit, initialValues }) => {
    return (
        <Form onSubmit={onSubmit} initialValues={initialValues}>
            {({ handleSubmit, values, submitting }) => (
                <form onSubmit={handleSubmit}>
                    <FormRow>
                        <Field
                            name="name"
                            label={i18n.t('Name')}
                            component={InputFieldFF}
                            validate={isStringWithLengthAtLeastOne}
                        />
                    </FormRow>

                    <FormRow>
                        <Field
                            name="messageParameter"
                            label={i18n.t('Message parameter')}
                            component={InputFieldFF}
                            validate={isStringWithLengthAtLeastOne}
                        />
                    </FormRow>

                    <FormRow>
                        <Field
                            name="recipientParameter"
                            label={i18n.t('Recipient parameter')}
                            component={InputFieldFF}
                            validate={isStringWithLengthAtLeastOne}
                        />
                    </FormRow>

                    <FormRow>
                        <Field
                            name="urlTemplate"
                            label={i18n.t('Url template')}
                            component={InputFieldFF}
                            validate={composeValidators(url, hasValue)}
                        />
                    </FormRow>

                    {values.parameters.map((_, index) => (
                        <KeyValuePair index={index} key={index} />
                    ))}

                    <FormRow>
                        <p style={{ margin: '0 0 8px' }}>
                            {i18n.t(
                                'In generic http gateway any number of parameters can be added.'
                            )}
                        </p>

                        <AddKeyValuePair />
                    </FormRow>

                    <Button type="submit">
                        {submitting
                            ? i18n.t('Submitting...')
                            : i18n.t('Add generic gateway')}
                    </Button>
                </form>
            )}
        </Form>
    )
}

GatewayGenericForm.defaultProps = {
    initialValues: {
        parameters: [],
    },
}

GatewayGenericForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    initialValues: PropTypes.object,
}
