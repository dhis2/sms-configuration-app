import './locales'
import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { AppWrapper } from './AppWrapper'
import Home from './routes/index'
import ReceivedSms from './routes/received'
import SentSms from './routes/sent'
import SmsGateway from './routes/sms-gateway'
import SmsGatewayEdit from './routes/sms-gateway/[id]'
import SmsGatewayNew from './routes/sms-gateway/new'
import {
    ViewSmsCommandAdd,
    ViewSmsCommandList,
    ViewSmsCommandEdit,
} from './sms-command'

export const App = () => (
    <AppWrapper>
        <Switch>
            {/* Home */}
            <Route exact path="/" component={Home} />

            {/* Gateway configuration */}
            <Route exact path="/sms-gateway" component={SmsGateway} />
            <Route path="/sms-gateway/new" component={SmsGatewayNew} />
            <Route path="/sms-gateway/:id" component={SmsGatewayEdit} />

            {/* Sms command */}
            <Route exact path="/sms-command" component={ViewSmsCommandList} />
            <Route path="/sms-command/new" component={ViewSmsCommandAdd} />
            <Route path="/sms-command/:id" component={ViewSmsCommandEdit} />

            {/* View sent sms */}
            <Route path="/sent" component={SentSms} />

            {/* View received sms */ ''}
            <Route path="/received" component={ReceivedSms} />

            {/* Handle 404 */ ''}
            <Redirect from="*" to="/" />
        </Switch>
    </AppWrapper>
)
