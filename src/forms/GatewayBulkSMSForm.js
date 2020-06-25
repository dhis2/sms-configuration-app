import {
    Button,
    InputFieldFF,
    ReactFinalForm,
    composeValidators,
    hasValue,
    string,
} from '@dhis2/ui'
import React from 'react'
import { PropTypes } from '@dhis2/prop-types'

import { FormRow } from './FormRow'
import i18n from '../locales'

const { Form, Field } = ReactFinalForm

const isStringWithLengthAtLeastOne = composeValidators(string, hasValue)

export const GatewayBulkSMSForm = ({ onSubmit, initilValues }) => {
    return (
        <Form onSubmit={onSubmit} initilValues={initilValues}>
            {({ handleSubmit }) => (
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
                            name="username"
                            label={i18n.t('User name')}
                            component={InputFieldFF}
                            validate={isStringWithLengthAtLeastOne}
                        />
                    </FormRow>

                    <FormRow>
                        <Field
                            name="password"
                            label={i18n.t('Password')}
                            component={InputFieldFF}
                            validate={isStringWithLengthAtLeastOne}
                        />
                    </FormRow>

                    <Button type="submit">
                        {i18n.t('Add BulkSMS gateway')}
                    </Button>
                </form>
            )}
        </Form>
    )
}

GatewayBulkSMSForm.defaultProps = {
    initialValues: {},
}

GatewayBulkSMSForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    initilValues: PropTypes.object,
}
