import { useLocation } from 'react-router-dom'
import { STATUS_ALL } from './config'

export const useQueryParams = () => {
    const searchParams = new URLSearchParams(useLocation().search)

    return {
        status: searchParams.get('status') || STATUS_ALL,
        phoneNumber: searchParams.get('phoneNumber') || '',
        page: parseInt(searchParams.get('page') || 1),
        pageSize: parseInt(searchParams.get('pageSize') || 50),
    }
}
