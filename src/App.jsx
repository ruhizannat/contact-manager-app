import { Row, Col, Container } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import AddContact from "./AddContact"
import EditContact from "./EditContact"
import Contacts from "./Contacts"
import Navigation from "./Navigation"

import About from './About';
import Home from './Home';
import { useEffect, useState } from 'react';
import { contactsData } from './data';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import NotFound from './NotFound';
import ContactDetails from './ContactDetails';



const App = () =>{
  
  const [contacts, setContacts] =useState(contactsData)
  const addContact = (contact) =>{
     setContacts([...contacts, contact])
  }
  const deleteContact = (id) =>{
    const contactAfterDelete =  contacts.filter(contact => contact.id !== id)
    setContacts(contactAfterDelete)
  }

  const updateContact = (contactToUpdate) =>{
   const contactAfterUpdate = contacts.map(contact =>{
      if(contact.id === contactToUpdate.id){
         return{
           id: contact.id,
           ...contactToUpdate
         }
      }else{
        return contact
      }
    })
    console.log(contactAfterUpdate)
    setContacts(contactAfterUpdate)
  }
    return(
       
        <>
           <ToastContainer 
              autoClose={2000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              
           />
           <Row>

        <BrowserRouter>
        <Navigation />
        <Col sm={ {span:10, offset:2}}>
            <Container>
            <Routes>
              <Route path='/' index element={ <Home />} />
              <Route path='/about' element={  <About />} />
              <Route path='/add' element={ <AddContact addContact={addContact} />} />
              <Route path='/edit/:id' element={<EditContact contacts={contacts} updateContact={updateContact} />} />
              <Route path='/details/:id' element={<ContactDetails contacts={contacts}/>} />
              <Route path='/contacts' element={ <Contacts contacts={contacts} deleteContact={deleteContact} />
          } />

            <Route path='*' element={<NotFound />} />
           
           

            </Routes>
            </Container>
           
            
            
         
           

        </Col>
        </BrowserRouter>
   </Row>
         
        </>
    )
}
export default App