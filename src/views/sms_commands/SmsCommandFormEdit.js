import { useParams } from 'react-router-dom'
import React from 'react'

export const SMS_COMMAND_FORM_EDIT_PATH_STATIC = '/sms-config/new'
export const SMS_COMMAND_FORM_EDIT_PATH = `${SMS_COMMAND_FORM_EDIT_PATH_STATIC}/:id`

export const SmsCommandFormEdit = () => {
    const { id } = useParams()
    console.log('id', id)

    return <div />
}
