import React from 'react'
import { Card } from '@dhis2/ui'
import { Link } from 'react-router-dom'
import { PropTypes } from '@dhis2/prop-types'
import s from './HomeCard.module.css'

const HomeCard = ({ titleText, bodyText, linkText, to }) => {
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

export default HomeCard
