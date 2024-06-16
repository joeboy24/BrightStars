

import React, { useState } from 'react'
import './terms.styles.scss'
import { BsFillQuestionCircleFill } from 'react-icons/bs'
import SubHeader from '../../components/subheader/subheader.components'
import { IoWarning } from 'react-icons/io5'
import { MdPrivacyTip } from 'react-icons/md'

const PrivacyPolicy = () => {
  return (
    <>

    <SubHeader h2='Privacy Policy' h6='Read more about our policies' />

    <div className="content-wrapper">
        <div className="signup-page">
            <div className="signup-left">
                <a href="/terms">
                    <div className="steps">
                        <h2><IoWarning size='18' className='float-left mr-2 mt-1'/>&nbsp; Terms & Conditions</h2>
                        <p>Fill in your personal/contact details</p>
                    </div>
                </a>

                <a href="/privacy">
                    <div className="steps">
                        <h2><MdPrivacyTip size='18' className='float-left mr-2 mt-1'/>&nbsp; Privacy Policy</h2>
                        <p>Make registration payment here</p>
                    </div>
                </a>
            </div>

            <div className="signup-right TandCs">

                <p>At Bright Stars Coaching Academy, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and enroll your child in our programs.</p>

                <h2>Information We Collect</h2>
                <p>We may collect personal information that you provide directly to us when you register your child for our programs, including:</p>
                <ul>
                    <li>Parent/Guardian name</li>
                    <li>Contact information (email address, phone number, mailing address)</li>
                    <li>Child’s name, age, and date of birth</li>
                    <li>Medical conditions or allergies</li>
                    <li>Payment information</li>
                </ul>

                <h2>How We Use Your Information</h2>
                <p>We use the information we collect for various purposes, including to:</p>
                <ul>
                    <li>Process registrations and payments</li>
                    <li>Communicate with you about our programs and updates</li>
                    <li>Ensure the safety and well-being of participants</li>
                    <li>Improve our website and services</li>
                    <li>Comply with legal obligations</li>
                </ul>

                <h2>Information Sharing and Disclosure</h2>
                <p>We do not sell, trade, or otherwise transfer your personal information to outside parties except as described below:</p>
                <ul>
                    <li>**Service Providers:** We may share your information with third-party service providers who assist us in operating our website, conducting our business, or serving our users, provided those parties agree to keep this information confidential.</li>
                    <li>**Legal Requirements:** We may disclose your information if required to do so by law or in response to valid requests by public authorities.</li>
                    <li>**Protection of Rights:** We may disclose your information when we believe disclosure is necessary to protect our rights, enforce our site policies, or protect the safety of others.</li>
                </ul>

                <h2>Data Security</h2>
                <p>We implement a variety of security measures to maintain the safety of your personal information. However, please note that no method of transmission over the Internet or method of electronic storage is 100% secure.</p>

                <h2>Your Rights</h2>
                <p>You have the right to:</p>
                <ul>
                    <li>Access the personal information we hold about you</li>
                    <li>Request correction of any incorrect or outdated information</li>
                    <li>Request deletion of your personal information</li>
                    <li>Object to the processing of your personal information</li>
                </ul>
                <p>To exercise any of these rights, please contact us using the information provided below.</p>

                <h2>Third-Party Links</h2>
                <p>Our website may contain links to third-party sites. We are not responsible for the privacy practices or content of these third-party sites.</p>

                <h2>Changes to This Privacy Policy</h2>
                <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date. We encourage you to review this Privacy Policy periodically to stay informed about how we are protecting your information.</p>

                <h2>Contact Us</h2>
                <p>If you have any questions or concerns about this Privacy Policy, please contact us at:</p>

                <p>Bright Stars Coaching Academy</p>
                <p>144 State Street</p>
                <p>info@brightstars.com</p>

            </div>
        </div>

    </div>
    
    </>
  )
}

export default PrivacyPolicy