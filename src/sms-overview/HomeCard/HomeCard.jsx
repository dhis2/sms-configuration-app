import { PropTypes } from '@dhis2/prop-types'
import { Card } from '@dhis2/ui'
import React from 'react'
import { Link } from 'react-router-dom'
import s from './HomeCard.module.css'

export const HomeCard = ({ titleText, bodyText, linkText, to }) => {
    return (
        <Card>
            <div className={s.container}>
                <h2 className={s.title}>{titleText}</h2>
                <p className={s.body}>{bodyText}</p>
                <div className={s.linkContainer}>
                    <Link className={s.link} to={to}>
                        {linkText}
                    </Link>
                </div>
            </div>
        </Card>
    )
}

HomeCard.propTypes = {
    bodyText: PropTypes.string.isRequired,
    linkText: PropTypes.string.isRequired,
    titleText: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
}
