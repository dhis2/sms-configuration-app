import { NoticeBox } from '@dhis2/ui'
import { useConfig } from '@dhis2/app-runtime'
import React, { useState } from 'react'

import { useReadModulesQuery } from '../modules'
import i18n from '../locales'
import styles from './ModuleNotice.module.css'

export const ModuleNotice = () => {
    const [visible, setVisible] = useState(true)
    const { baseUrl } = useConfig()
    const { loading, error, data } = useReadModulesQuery()

    const oldModule = data?.modules?.modules?.find(
        ({ name }) => name === 'dhis-web-maintenance-mobile'
    )

    // The "api" is solely in there because of the "../"
    // part in the "defaultAction"'s url
    const href = data ? `${baseUrl}/api/${oldModule.defaultAction}` : ''

    if (!visible) return null

    return (
        <div className={styles.container}>
            <NoticeBox title={i18n.t('This app is not stable yet')}>
                <p className={styles.message}>
                    {i18n.t(`
                        We've completely rewritten the mobile configuration app.
                        It's now called "SMS Configuration" app.

                        There's a chance we've missed a few bugs here and there.
                        So if you're encountering a bug and need the original functionality,
                        you can still use the previous, older version:
                    `)}
                </p>

                <a className={styles.moduleLink} href={href}>
                    {loading && i18n.t('Loading link...')}
                    {error &&
                        i18n.t('Could not fetch link: {{message}}', {
                            message: error.message,
                        })}
                    {data && i18n.t('Go to mobile configuration app')}
                </a>

                <button
                    className={styles.hide}
                    onClick={() => setVisible(false)}
                >
                    {i18n.t('Hide this message')}
                </button>
            </NoticeBox>
        </div>
    )
}
