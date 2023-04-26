import React from 'react'
import { useHistory } from 'react-router-dom'

type Props = {}

export default function Footer({ }: Props) {
    const history = useHistory()

    return (
        <div className="footer__container">
            <div className="footer__nav">
                <h4 className="footer__nav-link" onClick={() => history.push('/about')}>About</h4>
                <h4 className="footer__nav-link" onClick={() => history.push('/privacyPolicy')}>Privacy Policy</h4>
                <h4 className="footer__nav-link" onClick={() => history.push('/contact')}>Contact Me</h4>
            </div>
            <div className="footer__info">
                <h4 className="footer__copyright">Copyright © 2023</h4>
            </div>
        </div>
    )
}