import React from 'react'
import { Card } from '@dhis2/ui'
import { Link } from 'react-router-dom'
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
                    <Card>
                        <h2 className={s.cardTitle}>
                            {i18n.t('Gateway Configuration')}
                        </h2>
                        <p className={s.cardText}>
                            {i18n.t(
                                'Add and manage gateways for sending and receiving SMS messages in DHIS2.'
                            )}
                        </p>
                        <div className={s.cardLinkWrapper}>
                            <Link
                                className={s.cardLink}
                                to={GATEWAY_CONFIG_LIST_PATH}
                            >
                                {i18n.t('Set up gateways')}
                            </Link>
                        </div>
                    </Card>
                </div>
                <div className={s.gridItem}>
                    <Card>
                        <h2 className={s.cardTitle}>
                            {i18n.t('SMS Commands')}
                        </h2>
                        <p className={s.cardText}>
                            {i18n.t(
                                'Add and manage commands triggered by incoming SMS messages to register, alert and more.'
                            )}
                        </p>
                        <div className={s.cardLinkWrapper}>
                            <Link
                                className={s.cardLink}
                                to={SMS_COMMAND_LIST_PATH}
                            >
                                {i18n.t('Set up SMS commands')}
                            </Link>
                        </div>
                    </Card>
                </div>
                <div className={s.gridItem}>
                    <Card>
                        <h2 className={s.cardTitle}>
                            {i18n.t('Sent SMS messages')}
                        </h2>
                        <p className={s.cardText}>
                            {i18n.t(
                                'Open logs of all SMS messages sent from DHIS2.'
                            )}
                        </p>
                        <div className={s.cardLinkWrapper}>
                            <Link
                                className={s.cardLink}
                                to={SENT_SMS_LIST_PATH}
                            >
                                {i18n.t('View all sent SMS')}
                            </Link>
                        </div>
                    </Card>
                </div>
                <div className={s.gridItem}>
                    <Card>
                        <h2 className={s.cardTitle}>
                            {i18n.t('Received SMS messages')}
                        </h2>
                        <p className={s.cardText}>
                            {i18n.t(
                                'Open logs of all SMS messages received by DHIS2.'
                            )}
                        </p>
                        <div className={s.cardLinkWrapper}>
                            <Link
                                className={s.cardLink}
                                to={RECEIVED_SMS_LIST_PATH}
                            >
                                {i18n.t('View all received SMS')}
                            </Link>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}
