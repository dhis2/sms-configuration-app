import { Button, ReactFinalForm } from '@dhis2/ui'
import React from 'react'
import i18n from '../../locales/index.js'
import { dataTest } from '../../shared/index.js'
import styles from './ActionAddKeyValuePair.module.css'

const { useForm } = ReactFinalForm

export const ActionAddKeyValuePair = () => {
    const { change, getState } = useForm()

    const addKeyValueToFormState = () => {
        const { parameters } = getState().values

        change('parameters', [
            ...parameters,
            {
                header: false,
                encode: false,
                key: '',
                value: '',
                confidential: false,
                unsaved: true,
            },
        ])
    }

    return (
        <Button
            className={styles.button}
            onClick={addKeyValueToFormState}
            dataTest={dataTest('smsgateway-actionaddkeyvaluepair')}
        >
            {i18n.t('Add key value pair')}
        </Button>
    )
}
