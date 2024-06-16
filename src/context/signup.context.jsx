import { Children, createContext, useEffect, useState } from "react";
import { createClientDoc, createInquiryDoc, getClientDocs, getInquiryDocs, successToast, updateClientDoc } from "../utils/firebase/firebase.utils";


export const SignUpContext = createContext({
    inquiries: [],
    addInquiry: () => {},
    getInquiry: () => {},
    clients: [],
    addClient: () => {},
    getClients: () => {},
    updateClient: () => {},
});


export const SignUpProvider = ({children}) => {
  const [ clients, setClients ] = useState([]);
  const [ inquiries, setInquiries ] = useState([]);


  // Inquiry

  const addInquiry = async (docToAdd) => {
    await createInquiryDoc(docToAdd).then(
      // getInquiry(),
      successToast('Inquiry Submited. Our team will reach out to you in 24hrs'),
      // console.log('Inquiry Submited. Our team will reach out to you in 24hrs')
    );
  }

  const getInquiry = async () => {
    const inquiryMap = await getInquiryDocs();
    setInquiries(inquiryMap);
  }



  // Client

  const addClient = async (docToAdd) => {
    await createClientDoc(docToAdd).then(
      getClients(),
      successToast('Registration successful. Our team will get back to you in less than 24 hours'),
    );
  }

  const getClients = async () => {
    const clientMap = await getClientDocs();
    setClients(clientMap);
    // console.log(clientMap)
  }

  const updateClient = async (docToUpdate) => {
    await updateClientDoc(docToUpdate).then(
      getClients(),
      successToast('Update successful')
    );
  }

  useEffect(() => {
    // getInquiry();
    getClients();
  }, [])




  const value = { 
    inquiries, addInquiry, 
    clients, addClient, getClients, updateClient
  };
  return (<SignUpContext.Provider value={value}>{children}</SignUpContext.Provider>)
}