import { PropTypes } from '@dhis2/prop-types'
import { Button, CircularLoader, ReactFinalForm } from '@dhis2/ui'
import React from 'react'
import i18n from '../../locales'

const { useFormState } = ReactFinalForm

const subscription = {
    submitting: true,
    pristine: true,
}

export const SaveCommandButton = ({ enabled }) => {
    const { submitting, pristine } = useFormState({
        subscription,
    })
    const disabled = pristine || submitting

    return (
        <Button
            primary
            type="submit"
            disabled={!enabled && disabled}
            icon={submitting ? <CircularLoader small /> : null}
        >
            {i18n.t('Save command')}
        </Button>
    )
}

SaveCommandButton.defaultProps = {
    enabled: false,
}

SaveCommandButton.propTypes = {
    /*
     * This prop is used when fields, stored as array entries
     * in the form state, are being removed while the form
     * is still pristine.
     *
     * Form some reasons, RFF doesn't recognize this as a change
     * and keeps the form state's pristine value `true`
     */
    enabled: PropTypes.bool,
}
