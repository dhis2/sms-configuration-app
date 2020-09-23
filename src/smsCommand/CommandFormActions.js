import { Button, ButtonStrip } from '@dhis2/ui'
import { PropTypes } from '@dhis2/prop-types'
import React from 'react'

import { SaveCommandButton } from './SaveCommandButton'
import { SubmitErrors } from './SubmitErrors'
import i18n from '../locales'
import styles from './CommandFormActions.module.css'

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
