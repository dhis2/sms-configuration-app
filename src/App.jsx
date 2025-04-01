import './locales/index.js'
import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { AppWrapper } from './AppWrapper.jsx'
import {
    ViewSmsCommandAdd,
    ViewSmsCommandList,
    ViewSmsCommandEdit,
} from './sms-command/index.js'
import {
    ViewSmsGatewayAdd,
    ViewSmsGatewayList,
    ViewSmsGatewayEdit,
} from './sms-gateway/index.js'
import { ViewReceivedSmsList } from './sms-inbound/index.js'
import { ViewSentSmsList } from './sms-outbound/index.js'
import { ViewOverview } from './sms-overview/index.js'

export const App = () => (
    <AppWrapper>
        <Switch>
            {/* Home */}
            <Route exact path="/" component={ViewOverview} />

            {/* Gateway configuration */}
            <Route exact path="/sms-gateway" component={ViewSmsGatewayList} />
            <Route path="/sms-gateway/new" component={ViewSmsGatewayAdd} />
            <Route path="/sms-gateway/:id" component={ViewSmsGatewayEdit} />

            {/* Sms command */}
            <Route exact path="/sms-command" component={ViewSmsCommandList} />
            <Route path="/sms-command/new" component={ViewSmsCommandAdd} />
            <Route path="/sms-command/:id" component={ViewSmsCommandEdit} />

            {/* View sent sms */}
            <Route path="/sent" component={ViewSentSmsList} />

            {/* View received sms */ ''}
            <Route path="/received" component={ViewReceivedSmsList} />

            {/* Handle 404 */ ''}
            <Redirect from="*" to="/" />
        </Switch>
    </AppWrapper>
)
