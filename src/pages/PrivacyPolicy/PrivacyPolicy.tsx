import React from 'react'

type Props = {}

export default function PrivacyPolicy({ }: Props) {
    return (
        <div className="privacy__container">
            <h1 className="privacy__title">Privacy Policy</h1>
            <h2 className="policy__subtitle">Introduction</h2>
            <p className="policy__text">At By Daniela Garcia, we take privacy seriously. This privacy policy explains how we collect, use, and protect your personal information when you visit our blog site (the “Site”).</p>

            <h2 className="policy__subtitle">What personal information do we collect?</h2>
            <p className="policy__text">When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device. Additionally, as you browse the Site, we collect information about the individual web pages or products that you view, what websites or search terms referred you to the Site, and information about how you interact with the Site.</p>

            <h2 className="policy__subtitle">How do we use your personal information?</h2>
            <p className="policy__text">We use the information that we collect to help us screen for potential risk and fraud (in particular, your IP address), and more generally to improve and optimize our Site (for example, by generating analytics about how our customers browse and interact with the Site, and to assess the success of our marketing and advertising campaigns).</p>

            <h2 className="policy__subtitle">Sharing your personal information</h2>
            <p className="policy__text">We do not share your personal information with any third parties. However, we may use third-party services to help us operate our Site, such as Google Analytics, which may collect, use and share your information to help us understand how our Site is being used. You can read more about how Google uses your personal information here: https://www.google.com/intl/en/policies/privacy/. You can also opt-out of Google Analytics here: https://tools.google.com/dlpage/gaoptout.</p>

            <h2 className="policy__subtitle">Security</h2>
            <p className="policy__text">We take reasonable precautions to protect your personal information and to prevent unauthorized access, use, or disclosure. However, we cannot guarantee that your personal information will always be secure, as no method of transmission over the Internet or electronic storage is 100% secure.</p>

            <h2 className="policy__subtitle">Changes</h2>
            <p className="policy__text">We may update this privacy policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal, or regulatory reasons.</p>

            <h2 className="policy__subtitle">Contact us</h2>
            <p className="policy__text">For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by email at <a href="mailto:info@bydanygarcia.com">info@bydanygarcia.com</a>.</p>
        </div>
    )
}