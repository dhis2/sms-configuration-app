import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import { QueryParamProvider } from 'use-query-params'
import { CssVariables } from '@dhis2/ui'
import React from 'react'
import styles from './App.module.css'

import { AlertHandler } from './notifications'
import { Navigation } from './navigation'
import {
    GATEWAY_CONFIG_FORM_EDIT_PATH,
    GATEWAY_CONFIG_FORM_NEW_PATH,
    GATEWAY_CONFIG_LIST_PATH,
    RECEIVED_SMS_LIST_PATH,
    SMS_COMMAND_LIST_PATH,
    SMS_COMMAND_FORM_EDIT_PATH,
    SMS_COMMAND_FORM_NEW_PATH,
    SENT_SMS_LIST_PATH,
    GatewayConfigFormEdit,
    GatewayConfigFormNew,
    GatewayConfigList,
    ReceivedSmsList,
    SmsCommandList,
    SmsCommandFormEdit,
    SmsCommandFormNew,
    SentSmsList,
    HOME_PATH,
    Home,
} from './views'
import { dataTest } from './dataTest'

const App = () => (
    <AlertHandler>
        <CssVariables spacers colors />
        <HashRouter>
            <QueryParamProvider ReactRouterRoute={Route}>
                <div className={styles.container} data-test={dataTest('app')}>
                    <div className={styles.sidebar}>
                        <Navigation />
                    </div>

                    <main className={styles.content}>
                        <Switch>
                            <Route exact path={HOME_PATH} component={Home} />

                            {/* Gateway configuration */ ''}
                            <Route
                                exact
                                path={GATEWAY_CONFIG_LIST_PATH}
                                component={GatewayConfigList}
                            />

                            <Route
                                exact
                                path={GATEWAY_CONFIG_FORM_EDIT_PATH}
                                component={GatewayConfigFormEdit}
                            />

                            <Route
                                exact
                                path={GATEWAY_CONFIG_FORM_NEW_PATH}
                                component={GatewayConfigFormNew}
                            />

                            {/* Sms command */ ''}
                            <Route
                                exact
                                path={SMS_COMMAND_LIST_PATH}
                                component={SmsCommandList}
                            />

                            <Route
                                exact
                                path={SMS_COMMAND_FORM_EDIT_PATH}
                                component={SmsCommandFormEdit}
                            />

                            <Route
                                exact
                                path={SMS_COMMAND_FORM_NEW_PATH}
                                component={SmsCommandFormNew}
                            />

                            {/* View sent sms */ ''}
                            <Route
                                exact
                                path={SENT_SMS_LIST_PATH}
                                component={SentSmsList}
                            />

                            {/* View received sms */ ''}
                            <Route
                                exact
                                path={RECEIVED_SMS_LIST_PATH}
                                component={ReceivedSmsList}
                            />

                            <Redirect from="*" to={HOME_PATH} />
                        </Switch>
                    </main>
                </div>
            </QueryParamProvider>
        </HashRouter>
    </AlertHandler>
)

export default App
