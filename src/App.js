import { CssVariables } from '@dhis2/ui'
import React from 'react'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import { QueryParamProvider } from 'use-query-params'
import styles from './App.module.css'
import { Navigation } from './components/navigation'
import { AlertHandler } from './components/notifications'
import { Home } from './pages/index'
import { Received } from './pages/received'
import { Sent } from './pages/sent'
import { SmsCommand } from './pages/sms-command'
import { SmsCommandEdit } from './pages/sms-command/[id]'
import { SmsCommandNew } from './pages/sms-command/new'
import { SmsGateway } from './pages/sms-gateway'
import { SmsGatewayEdit } from './pages/sms-gateway/[id]'
import { SmsGatewayNew } from './pages/sms-gateway/new'
import { dataTest } from './utils'

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
                            {/* Home */ ''}
                            <Route exact path="/" component={Home} />

                            {/* Gateway configuration */ ''}
                            <Route
                                exact
                                path="/sms-gateway"
                                component={SmsGateway}
                            />

                            <Route
                                path="/sms-gateway/new"
                                component={SmsGatewayNew}
                            />

                            <Route
                                path="/sms-gateway/:id"
                                component={SmsGatewayEdit}
                            />

                            {/* Sms command */ ''}
                            <Route
                                exact
                                path="/sms-command"
                                component={SmsCommand}
                            />

                            <Route
                                path="/sms-command/new"
                                component={SmsCommandNew}
                            />

                            <Route
                                path="/sms-command/:id"
                                component={SmsCommandEdit}
                            />

                            {/* View sent sms */ ''}
                            <Route path="/sent" component={Sent} />

                            {/* View received sms */ ''}
                            <Route path="/received" component={Received} />

                            {/* Handle 404 */ ''}
                            <Redirect from="*" to="/" />
                        </Switch>
                    </main>
                </div>
            </QueryParamProvider>
        </HashRouter>
    </AlertHandler>
)

export default App
