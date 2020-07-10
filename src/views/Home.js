import React from 'react'
import { PageHeadline } from '../headline'
import { dataTest } from '../dataTest'

export const HOME_PATH = '/'
export const HOME_LABEL = 'Home'

export const Home = () => {
    return (
        <div data-test={dataTest('views-home')}>
            <PageHeadline>Home</PageHeadline>
            <span>Content?</span>
        </div>
    )
}
