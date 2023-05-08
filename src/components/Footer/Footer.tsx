import React from 'react'
import { useHistory } from 'react-router-dom'

type Props = {}

export default function Footer({ }: Props) {
    const isMobile = window.screen.width <= 768
    const history = useHistory()

    return (
        <div className="footer__container">
            <div className="footer__nav">
                <h4 className="footer__nav-link" onClick={() => history.push('/about')}>About</h4>
                <h4 className="footer__nav-link" onClick={() => history.push('/privacyPolicy')}>{isMobile ? 'Privacy' : 'Privacy Policy'}</h4>
                <h4 className="footer__nav-link" onClick={() => history.push('/contact')}>{isMobile ? 'Contact' : 'Contact Me'}</h4>
            </div>
            <div className="footer__info">
                <h4 className="footer__copyright">{isMobile ? '© 2023' : 'Copyright © 2023'}</h4>
            </div>
        </div>
    )
}