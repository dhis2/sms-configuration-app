import React from 'react'
import i18n from '../../locales'
import { PageHeadline } from '../../headline'
import { dataTest } from '../../dataTest'
import {
    GATEWAY_CONFIG_LIST_PATH,
    SMS_COMMAND_LIST_PATH,
    SENT_SMS_LIST_PATH,
    RECEIVED_SMS_LIST_PATH,
} from '../'
import s from './Home.module.css'
import HomeCard from './HomeCard'

export const HOME_PATH = '/'
export const HOME_LABEL = 'Overview'

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
            <div className={s.grid}>
                <div className={s.gridItem}>
                    <HomeCard
                        titleText={i18n.t('Gateway Configuration')}
                        bodyText={i18n.t(
                            'Add and manage gateways for sending and receiving SMS messages in DHIS2.'
                        )}
                        linkText={i18n.t('Set up gateways')}
                        to={GATEWAY_CONFIG_LIST_PATH}
                    />
                </div>
                <div className={s.gridItem}>
                    <HomeCard
                        titleText={i18n.t('SMS Commands')}
                        bodyText={i18n.t(
                            'Add and manage commands triggered by incoming SMS messages to register, alert and more.'
                        )}
                        linkText={i18n.t('Set up SMS commands')}
                        to={SMS_COMMAND_LIST_PATH}
                    />
                </div>
                <div className={s.gridItem}>
                    <HomeCard
                        titleText={i18n.t('Sent SMS messages')}
                        bodyText={i18n.t(
                            'Open logs of all SMS messages sent from DHIS2.'
                        )}
                        linkText={i18n.t('View all sent SMS')}
                        to={SENT_SMS_LIST_PATH}
                    />
                </div>
                <div className={s.gridItem}>
                    <HomeCard
                        titleText={i18n.t('Received SMS messages')}
                        bodyText={i18n.t(
                            'Open logs of all SMS messages received by DHIS2.'
                        )}
                        linkText={i18n.t('View all received SMS')}
                        to={RECEIVED_SMS_LIST_PATH}
                    />
                </div>
            </div>
        </div>
    )
}
