import { useLocation } from 'react-router-dom'

export default () => {
    const searchParams = new URLSearchParams(useLocation().search)

    return {
        status: searchParams.get('status') || 'ALL',
        phoneNumber: searchParams.get('phoneNumber') || '',
        page: parseInt(searchParams.get('page') || 1),
        pageSize: parseInt(searchParams.get('pageSize') || 50),
    }
}
