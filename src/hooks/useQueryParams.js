import {
    useQueryParams as _useQueryParams,
    StringParam,
    NumberParam,
    withDefault,
} from 'use-query-params'

export const useQueryParams = () =>
    _useQueryParams({
        status: withDefault(StringParam, 'ALL'),
        phoneNumber: StringParam,
        page: withDefault(NumberParam, 1),
        pageSize: withDefault(NumberParam, 50),
    })
