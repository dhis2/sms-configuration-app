import { useDataQuery } from '@dhis2/app-runtime'

export const READ_MODULES_QUERY = {
    modules: {
        resource: 'action::menu/getModules',
    },
}

export const useReadModulesQuery = () => useDataQuery(READ_MODULES_QUERY)
