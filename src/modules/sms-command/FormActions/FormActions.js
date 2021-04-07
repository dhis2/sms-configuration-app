import { PropTypes } from '@dhis2/prop-types'
import { Button, ButtonStrip } from '@dhis2/ui'
import React from 'react'
import i18n from '../../../locales'
import { FormRow } from '../../../shared'
import { SaveCommandButton } from './SaveCommandButton'

export const FormActions = ({ enableSubmit, onCancel }) => (
    <FormRow>
        <ButtonStrip>
            <SaveCommandButton enabled={enableSubmit} />
            <Button onClick={onCancel}>{i18n.t('Cancel')}</Button>
        </ButtonStrip>
    </FormRow>
)

FormActions.propTypes = {
    onCancel: PropTypes.func.isRequired,
    enableSubmit: PropTypes.bool,
}
