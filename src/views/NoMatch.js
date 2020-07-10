import React from 'react'
import { dataTest } from '../dataTest'

export const NoMatch = () => (
    <div data-test={dataTest('views-nomatch')}>
        <h1>404</h1>
    </div>
)
