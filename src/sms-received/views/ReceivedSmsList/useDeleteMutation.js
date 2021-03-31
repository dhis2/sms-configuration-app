import { useDataMutation } from '@dhis2/app-runtime'

const DELETE_INBOUND_SMS_MUTATION = {
    resource: 'sms/inbound',
    type: 'delete',
    params: ({ ids }) => ({ ids }),
}

export const useDeleteMutation = ({ onComplete, onError }) =>
    useDataMutation(DELETE_INBOUND_SMS_MUTATION, {
        onComplete,
        onError,
    })
