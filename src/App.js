import './locales'
import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { AppWrapper } from './AppWrapper'
import {
    Overview,
    ReceivedSmsList,
    SentSmsList,
    SmsCommandAdd,
    SmsCommandEdit,
    SmsCommandList,
    SmsGatewayAdd,
    SmsGatewayEdit,
    SmsGatewayList,
} from './pages'

export const App = () => (
    <AppWrapper>
        <Switch>
            {/* Home */}
            <Route exact path="/" component={Overview} />

            {/* Gateway configuration */}
            <Route exact path="/sms-gateway" component={SmsGatewayList} />
            <Route path="/sms-gateway/new" component={SmsGatewayAdd} />
            <Route path="/sms-gateway/:id" component={SmsGatewayEdit} />

            {/* Sms command */}
            <Route exact path="/sms-command" component={SmsCommandList} />
            <Route path="/sms-command/new" component={SmsCommandAdd} />
            <Route path="/sms-command/:id" component={SmsCommandEdit} />

            {/*  sent sms */}
            <Route path="/sent" component={SentSmsList} />

            {/*  received sms */ ''}
            <Route path="/received" component={ReceivedSmsList} />

            {/* Handle 404 */ ''}
            <Redirect from="*" to="/" />
        </Switch>
    </AppWrapper>
)
