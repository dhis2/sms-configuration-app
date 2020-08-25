import React from 'react'
import { CircularLoader, CenteredContent, ComponentCover } from '@dhis2/ui'

const SmsTableLoader = () => (
    <ComponentCover>
        <CenteredContent>
            <CircularLoader />
        </CenteredContent>
    </ComponentCover>
)

export { SmsTableLoader }
