import React from 'react'
import i18n from '../../../locales'
import { PageHeadline } from '../../../shared/components'
import { dataTest } from '../../../shared/utils'
import { HomeCard } from '../../components'
import s from './Overview.module.css'

export const OVERVIEW_PATH = '/'
export const OVERVIEW_LABEL = 'Overview'

export const Overview = () => {
    return (
        <div data-test={dataTest('views-home')} className={s.container}>
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
            <div className={s.grid}>
                <div className={s.gridItem}>
                    <HomeCard
                        titleText={i18n.t('Gateway Configuration')}
                        bodyText={i18n.t(
                            'Add and manage gateways for sending and receiving SMS messages in DHIS2.'
                        )}
                        linkText={i18n.t('Set up gateways')}
                        to="/sms-gateway"
                    />
                </div>
                <div className={s.gridItem}>
                    <HomeCard
                        titleText={i18n.t('SMS Commands')}
                        bodyText={i18n.t(
                            'Add and manage commands triggered by incoming SMS messages to register, alert and more.'
                        )}
                        linkText={i18n.t('Set up SMS commands')}
                        to="/sms-command"
                    />
                </div>
                <div className={s.gridItem}>
                    <HomeCard
                        titleText={i18n.t('Sent SMS messages')}
                        bodyText={i18n.t(
                            'Open logs of all SMS messages sent from DHIS2.'
                        )}
                        linkText={i18n.t('View all sent SMS')}
                        to="/sent"
                    />
                </div>
                <div className={s.gridItem}>
                    <HomeCard
                        titleText={i18n.t('Received SMS messages')}
                        bodyText={i18n.t(
                            'Open logs of all SMS messages received by DHIS2.'
                        )}
                        linkText={i18n.t('View all received SMS')}
                        to="/received"
                    />
                </div>
            </div>
        </div>
    )
}
