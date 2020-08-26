import { useDataQuery } from '@dhis2/app-runtime'

export const USER_GROUPS_QUERY = {
    userGroups: {
        resource: 'userGroups',
        params: {
            paging: 'false',
        },
    },
}

export const useReadUserGroupsQuery = () => useDataQuery(USER_GROUPS_QUERY)
