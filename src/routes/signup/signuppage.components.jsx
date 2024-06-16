

import React, { useState } from 'react'
import './signup.styles.scss'
import { Form1 } from '../../components/forms/form1.components'
import { Button } from '@material-tailwind/react'
import { FaCheck, FaRegCircleCheck } from 'react-icons/fa6'
import { FaCheckCircle } from 'react-icons/fa'
import { BsFillQuestionCircleFill } from 'react-icons/bs'
import SubHeader from '../../components/subheader/subheader.components'


const SignUpPage = () => {

    const [ pageStatus, setPageStatus ] = useState(0);

    const getSignUpStatus = (data) => {
        setPageStatus(data)
        console.log('Submitted: Parent ', data)
    }

    
  return (
    <>

    <SubHeader h2='Programs Sign Up' h6='Enroll in our engaging coaching programs' />

    <div className="content-wrapper">
        <div className="signup-page">
            <div className="signup-left">
                <div className="steps">
                    <h2>
                        { pageStatus >= 1 ? 
                        <FaRegCircleCheck size='18' className='float-left mr-2 mt-1 text-green-600'/>
                        :
                        <BsFillQuestionCircleFill size='18' className='float-left mr-2 mt-1'/>
                        }
                        &nbsp; Step 1 - Details
                    </h2>
                    <p>Fill in your personal/contact details</p>
                </div>

                <div className="steps" onClick={getSignUpStatus}>
                    <h2>

                        { pageStatus >= 2 ? 
                        <FaRegCircleCheck size='18' className='float-left mr-2 mt-1 text-green-600'/>
                        :
                        <BsFillQuestionCircleFill size='18' className='float-left mr-2 mt-1'/>
                        }
                        &nbsp; Step 2 - Checkout
                    </h2>
                    <p>Make registration payment here</p>
                </div>
            </div>

            <div className="signup-right">
                <Form1 sendSignUpStatus={getSignUpStatus} />
            </div>
        </div>

    </div>
    </>
  )
}

export default SignUpPage