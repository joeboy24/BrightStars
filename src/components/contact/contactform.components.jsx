

import { Button, Card, Input, Typography } from '@material-tailwind/react'
import React, { useContext, useState } from 'react'
import './contactform.styles.scss'
import { BiSupport } from 'react-icons/bi'
import { SignUpContext } from '../../context/signup.context'
import { successToast } from '../../utils/firebase/firebase.utils'
import { BsFillQuestionCircleFill } from 'react-icons/bs'
import { IoWarning } from 'react-icons/io5'
import { FaRegCircleCheck } from 'react-icons/fa6'


const ContactForm = () => {


    const { addInquiry } = useContext(SignUpContext);

    const defaultValues = {
        name: '',
        email: '',
        message: '',
        del: 'no',
        created_at: new Date(),
        updated_at: null,
    }
    
    const [ inquire, setInquire ] = useState(false);
    const [ inquiryText, setInquirText ] = useState('');
    const [ formFields, setFormFields ] = useState(defaultValues);

    const inquireClick = () => {
        setInquire(!inquire)
        setInquirText('')
    }

    const changeFieldText = (event) => {
        const { name, value } = event.target;
        setFormFields({...formFields, [name]: value})
        // console.log(value)
    }

    const submitInquiry = async (event) => {
        event.preventDefault()

        // return successToast('Inquiry Submited. Our team will reach out to you in 24hrs');
        
        // if (termsChecked == false) {
        //     return console.log('Oops..! Read and accept Terms & Conditions to proceed')
        // }

        // Save to database
        await addInquiry(formFields).then(
            setInquirText('y'),
            setInquire(!inquire),
            setFormFields([])
        );
        
    }



  return (
    <Card className='contact-form'>
        <BiSupport size={90} className='mx-auto text-white animate-pulse'/>
        <h2>Have Questions?</h2>
        <p>Click Button to Reach Out to Us</p>
        

        { inquire == false ?
        <Button color='white' size='lg' className={ inquiryText === '' ? 'mx-4 my-6 rounded-full' : 'mx-4 mt-6 rounded-full' } onClick={inquireClick}>Contact Us</Button>
        :null}

        { inquiryText === 'y' ?
            <Button type="button" variant='outlined' color='green' size='lg' className="flex text-center text-xs tracking-wider font-light mx-4 my-6 rounded-full"><FaRegCircleCheck size={16} />&nbsp;Inquiry Submitted</Button>
        : inquiryText === 'x' ?
            <Button type="button" variant='outlined' color='red' size='lg' className="flex text-center text-xs tracking-wider font-light mx-4 my-6 rounded-full"><IoWarning size={16} />&nbsp;Oops..! An Error Occured</Button>
        :null }


        { inquire == true ?
        <form id='contact-form' onSubmit={submitInquiry}>
            <div className="input-div">
                <input className='darkInput' name="name" value={formFields.name} onChange={changeFieldText} type="text" size="lg" label="Your Name" placeholder="Name *" required/>
            </div>

            <div className="input-div">
                <input className='darkInput' name="email" value={formFields.email} onChange={changeFieldText} type="email" size="lg" label="Email" placeholder="Email *" required/>
            </div>

            <div className="input-div">
                <textarea className='darkInput' name="message" value={formFields.message} rows={4} onChange={changeFieldText} type="email" size="lg" label="Message" placeholder="Message *" required/>
            </div>

            <Button type="submit" variant='outlined' color='white' size='lg' className="mt-6 rounded-full float-right">Submit Inquiry</Button>
        </form>
        :null}
    </Card>
  )
}

export default ContactForm