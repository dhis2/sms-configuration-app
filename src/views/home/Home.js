import React from 'react'
import i18n from '../../locales'
import { PageHeadline } from '../../headline'
import { dataTest } from '../../dataTest'
import s from './Home.module.css'

export const HOME_PATH = '/'
export const HOME_LABEL = 'Home'

export const Home = () => {
    return (
        <div data-test={dataTest('views-home')}>
            <PageHeadline>
                {i18n.t('Overview: SMS Configuration', {
                    nsSeparator: '>',
                })}
            </PageHeadline>
            <p className={s.explanation}>
                {i18n.t(
                    'Configure settings for SMS sending, receiving, data reporting, alerts, registration and more.'
                )}
            </p>
        </div>
    )
}
