
import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
    Select,
    Option,
    Textarea,
  } from "@material-tailwind/react";
import './forms.styles.scss'
import { BsPlusCircle } from "react-icons/bs";
import { FaRegCircleCheck, FaTimeline } from "react-icons/fa6";
import { FaRegTimesCircle, FaTimes, FaTimesCircle } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { IoWarning } from "react-icons/io5";
import { infoToast, successToast } from "../../utils/firebase/firebase.utils";
import { SignUpContext } from "../../context/signup.context";


   
export function Form1({ sendSignUpStatus }) {

    // console.log('Started')
    const defaultValues = {
        // newEntry: {
        //     fname: '',
        //     sname: '',
        //     age: '',
        // },
        mid: '',
        program: 'Beginer - Seasonal Program',
        kids_list: [],
        gfullname: '',
        gphone: '',
        gemail: '',
        terms: false,
        del: 'no',
        created_at: new Date(),
        updated_at: null,
    }
    const defaultKidName = {
        fname: '',
        sname: '',
        age: '',
        gender: '',
        medical_condition: ''
    }

    const { addClient, clients, getClients, updateClient } = useContext(SignUpContext);
    
    const [ allClients, setAllClients ] = useState(clients);
    const [ formFields, setFormFields ] = useState(defaultValues);
    const [ kidNameField, setKidNameField ] = useState(defaultKidName);
    // const [ signUpStatus, setSignUpStatus ] = useState(0);
    const [termsChecked, setTermsChecked] = useState(false);
    const [ inquiryText, setInquirText ] = useState('');



    const handleCheckboxChange = (event) => {
        setTermsChecked(event.target.checked);
        console.log(event.target.checked)
    };

    const changeFieldText = (event) => {
        const { name, value } = event.target;
        // if (name == 'gfullname') {
        //     const findMember = allClients.find(el => el.mid === value.toUpperCase());
        //     if (findMember) {
        //         return setFormFields(findMember)
        //     }
        // }
        setFormFields({...formFields, [name]: value})
    }

    const changeListField = (event) => {
        const { name, value } = event.target;
        setKidNameField({...kidNameField, [name]: value})
        // console.log(kidNameField)
    }

    const addToList = () => {

        if (kidNameField.fname === '' || kidNameField.sname === '' || kidNameField.age === '') {
            return infoToast('Oops..! Add names to list and provide required details for guardian')
        }
        const checkName = formFields.kids_list.find(el => el.fname === kidNameField.fname && el.sname === kidNameField.sname && el.age === kidNameField.age)
        if (checkName) {
            infoToast('Name already exists')
        } else {
            formFields.kids_list.push(kidNameField)
            setFormFields(formFields)
            // const upc = formFields.upc + 1;
            // formFields.upc = upc
            // setFormFields(formFields)
            // console.log(formFields)
            setKidNameField(defaultKidName)
        }

    }

    const delName = (item) => {
        const newList = formFields.kids_list.filter(el => el.fname != item.fname && el.sname != item.sname && el.age != item.age)
        formFields['kids_list'] = newList
        setFormFields(formFields)
        setKidNameField(defaultKidName)
        successToast(item.fname+' has been removed from the list')
    }

    const submitSignUp = async (event) => {
        event.preventDefault()
        if (formFields.kids_list.length == 0) {
            return infoToast('Oops..! Add names to proceed')
        }

        if (termsChecked == false) {
            setInquirText('x')
            return infoToast('Oops..! Read and accept Terms & Conditions to proceed')
        }

        formFields['terms'] = termsChecked;
        formFields['mid'] = 'M00' + (allClients.length + 1);

        // Set Terms before db save
        // Save status to local storage
        await addClient(formFields).then(
            setInquirText('y'),
            sendSignUpStatus(1),
            // setFormFields([])
        );
    }


    useEffect(() => {
        setAllClients(clients)
        // console.log(clients)
    }, [clients])



    return (
        <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
            Sign Up
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
            Nice to meet you! Enter your details to register.
        </Typography>

        <form id='' onSubmit={submitSignUp} className="mt-8 mb-2 w-full max-w-screen-lg">
            <div className="mb-1 flex flex-col gap-5">

                { inquiryText === 'y' ?
                    <Button type="button" variant='outlined' color='green' size='lg' className="flex text-center text-xs tracking-wider my-2 rounded-md"><FaRegCircleCheck size={16} />&nbsp;Sign Up Successful</Button>
                : inquiryText === 'x' ?
                    <Button type="button" variant='outlined' color='red' size='lg' className="flex text-center text-xs tracking-wider my-2 rounded-md" fullWidth><IoWarning size={16} />&nbsp;Oops..! Read and accept Terms & Conditions to proceed</Button>
                :null }

                {/* <div className="input-div">
                    <Input variant="outlined" name="no_of_kids" type="number" min={1} size="lg" label="Number of Kids" placeholder=""/>
                </div> */}

                <div className="input-div">
                    <select className="mySelect" variant="outlined" name="program" size="lg">
                        <option>Beginer - Seasonal Program</option>
                    </select>
                </div>
                
                {/* <div className="w-72">
                    <Select label="Select Version">
                        <Option>Material Tailwind HTML</Option>
                        <Option>Material Tailwind React</Option>
                        <Option>Material Tailwind Vue</Option>
                        <Option>Material Tailwind Angular</Option>
                        <Option>Material Tailwind Svelte</Option>
                    </Select>
                </div> */}

                <div className="form-top flex flex-col gap-3 border rounded-md px-2 py-4">
                    
                    <div className="input-div">
                        <Input variant="outlined" name="fname" value={kidNameField.fname} onChange={changeListField} type="text" size="lg" label="Firstname" placeholder=""/>
                    </div>

                    <div className="input-div">
                        <Input variant="outlined" name="sname" value={kidNameField.sname} onChange={changeListField} type="text" size="lg" label="Other Names" placeholder=""/>
                    </div>

                    <div className="flex">
                        <div className="input-div w-1/2">
                            <Input variant="outlined" name="age" value={kidNameField.age} onChange={changeListField} type="number" min={5} size="lg" label="Age" placeholder="Should be 5+"/>
                        </div>

                        <div className="input-div mx-2 w-1/3">
                            <select className="mySelect" variant="outlined" name="gender" size="lg">
                                <option value='M'>Gender</option>
                                <option value='M'>Male</option>
                                <option value='F'>Female</option>
                                {/* <option>Other</option> */}
                            </select>
                        </div>
                    </div>

                    <div className="input-div">
                        <Textarea label="Medical Condition" name="medical_condition" value={kidNameField.medical_condition} onChange={changeListField} />
                    </div>

                    <div className="input-div w-1/2">
                        <Button variant="outlined" size="sm" className="flex mx-6 my-1 rounded-md" onClick={addToList}><BsPlusCircle size={16} />&nbsp; Add to List</Button>
                    </div>

                    <div className="kids-list">

                        { formFields && formFields.kids_list.length > 1 ?
                            <p className="blue-p border-b p-2 text-xs font-medium"> {formFields.kids_list.length} Names Added To List</p>
                        : formFields.kids_list.length === 1 ?
                            <p className="blue-p border-b p-2 text-xs font-medium"> {formFields.kids_list.length} Name Added To List</p>
                        :<p className="blue-p border-b p-2 text-xs font-medium"> No Name Added To List</p>
                        }

                        { formFields && formFields.kids_list.length > 0 ? formFields.kids_list.map((el, i) => 
                            <p key={i} className="border-b px-4 py-1 text-xs capitalize text-gray-600">{el.fname+' '+el.sname+', '+el.age+'yrs'}<FaRegTimesCircle size={16} onClick={() => delName(el)} className="text-red-500 float-right hover:text-gray-600" /></p>
                        )
                        :null}
                        
                    </div>
                    
                </div>

                <div className="input-div">
                    <Input variant="outlined" name="gfullname" value={formFields.gfullname} onChange={changeFieldText} type="text" size="lg" label="Guardian's Fullname / Member ID" placeholder="" required/>
                </div>

                <div className="input-div">
                    <Input variant="outlined" name="gphone" value={formFields.gphone} onChange={changeFieldText} type="phone" size="lg" label="Phone" placeholder="" required/>
                </div>

                <div className="input-div">
                    <Input variant="outlined" name="gemail" value={formFields.gemail} onChange={changeFieldText} type="email" size="lg" label="Email" placeholder="" required/>
                </div>

                {/* <div className="input-div">
                    <Input
                    type="password"
                    size="lg"
                    placeholder="********"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                        className: "before:content-none after:content-none",
                    }}
                    />
                </div> */}

            </div>

            <Checkbox
                type="checkbox"
                checked={termsChecked} 
                onChange={handleCheckboxChange}
                label={
                <Typography
                    variant="small"
                    color="gray"
                    className="flex items-center font-normal"
                >
                    I agree to the
                    <a href="/terms"
                        className="font-medium transition-colors text-blue-500 border-b">
                        &nbsp;Terms and Conditions
                    </a>
                </Typography>
                }
                containerProps={{ className: "-ml-2.5" }}
            />

            <Button className="mt-6" type="submit" fullWidth>Sign Up</Button>

            <Typography color="gray" className="mt-4 text-center font-normal">
                Already have an account?{" "}
                <a href="#" className="font-medium text-gray-900">
                Sign In
                </a>
            </Typography>
        </form>
        
        </Card>
    );
}