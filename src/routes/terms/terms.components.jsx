

import React, { useState } from 'react'
import './terms.styles.scss'
import { BsFillQuestionCircleFill } from 'react-icons/bs'
import SubHeader from '../../components/subheader/subheader.components'
import { IoWarning } from 'react-icons/io5'
import { MdPrivacyTip } from 'react-icons/md'


const TermsAndConditions = () => {

    // const [ pageStatus, setPageStatus ] = useState(0);

    // const getSignUpStatus = (data) => {
    //     setPageStatus(data)
    //     console.log('Submitted: Parent ', data)
    // }

    
  return (
    <>

    <SubHeader h2='Terms & Conditions' h6='Read and accepts our terms to register' />

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

                <h2>Introduction</h2>
                <p>Welcome to Bright Stars Coaching Academy. By using our website and enrolling your child in our programs, you agree to comply with and be bound by the following terms and conditions.</p>

                <h2>Eligibility</h2>
                <p>Our programs are open to children aged 5-15. Parents or legal guardians must complete the registration process on behalf of their children.</p>

                <h2>Registration and Payment</h2>
                <p><strong>Registration:</strong> Parents must provide accurate information during registration. Any changes in contact details or medical conditions must be promptly communicated.</p>
                <p><strong>Payment:</strong> Program fees must be paid in full prior to the start date. We accept all card payment methods. Failure to pay fees on time may result in the cancellation of your child's enrollment.</p>

                <h2>Cancellation and Refund Policy</h2>
                <p><strong>Cancellations:</strong> Cancellations made at least two weeks before the program start date will receive a full refund. Cancellations made within two weeks of the start date are non-refundable.</p>
                <p><strong>Refunds:</strong> Refunds will be processed within 14 days of the cancellation request.</p>

                <h2>Code of Conduct</h2>
                <p><strong>Behavior:</strong> All participants are expected to behave respectfully towards coaches, staff, and other children. Bullying, harassment, or any form of misconduct will not be tolerated.</p>
                <p><strong>Discipline:</strong> The academy reserves the right to remove any child from the program due to inappropriate behavior without a refund.</p>

                <h2>Health and Safety</h2>
                <p><strong>Medical Conditions:</strong> Parents must disclose any medical conditions or allergies during registration. Children requiring medication must have a parent/guardian present to administer it.</p>
                <p><strong>Injuries:</strong> While we prioritize safety, the academy is not liable for injuries sustained during training. Parents are advised to ensure their child has adequate health insurance.</p>

                <h2>Use of Images</h2>
                <p>By enrolling your child, you consent to the use of photographs and videos taken during sessions for promotional purposes. If you do not consent, please notify us in writing.</p>

                <h2>Privacy Policy</h2>
                <p>We respect your privacy. Personal information collected during registration will be used solely for administrative purposes and will not be shared with third parties without consent. For more details, please refer to our <a href="">Privacy Policy</a>.</p>

                <h2>Changes to Terms and Conditions</h2>
                <p>The academy reserves the right to modify these terms and conditions at any time. Any changes will be communicated via email and updated on our website. Continued participation in our programs constitutes acceptance of the revised terms.</p>

                <h2>Contact Us</h2>
                <p>For any questions or concerns regarding these terms and conditions, please contact us at:</p>
                <p>Bright Stars Coaching Academy</p>
                <p>144 State Street</p>
                <p>info@brightstars.com</p>

                <h2>By enrolling your child in our programs, you acknowledge that you have read, understood, and agree to these terms and conditions.</h2>

            </div>
        </div>

    </div>

    </>
  )
}

export default TermsAndConditions