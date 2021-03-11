import { PropTypes } from '@dhis2/prop-types'
import { Button, ButtonStrip } from '@dhis2/ui'
import React from 'react'
import i18n from '../locales'
import styles from './CommandFormActions.module.css'
import { SaveCommandButton } from './SaveCommandButton'
import { SubmitErrors } from './SubmitErrors'

export const CommandFormActions = ({ enableSubmit, onCancel }) => (
    <div className={styles.container}>
        <SubmitErrors />

        <ButtonStrip>
            <SaveCommandButton enabled={enableSubmit} />
            <Button onClick={onCancel}>{i18n.t('Cancel')}</Button>
        </ButtonStrip>
    </div>
)

CommandFormActions.propTypes = {
    onCancel: PropTypes.func.isRequired,
    enableSubmit: PropTypes.bool,
}
