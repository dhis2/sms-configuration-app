import '@dhis2/cli-utils-cypress/support'

import './all.js'
import { loginAndPersistSession } from './loginAndPersistSession'
import { enableNetworkShim } from './enableNetworkShim'

loginAndPersistSession()
enableNetworkShim()
