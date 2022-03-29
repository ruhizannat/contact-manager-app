import Contact from './Contact'
import {  Row, Col, Form, Button, FormControl } from "react-bootstrap"
import { useState } from 'react'




const Contacts = ({contacts, deleteContact}) =>{
     const [search, setSearch] = useState('')
     console.log(search)
     const filteredContacts = contacts.filter(contact => contact.firstName.includes(search) || contact.lastName.includes(search)) 
    return(
       
        <>
         <h1 className='mt-3 mb-5 text-center'>All Contacts</h1>
        <Form as={Row} className="d-flex mb-5">
          <Col sm={4}>
        <FormControl
          type="search"
          value={search}
          onChange={(e) =>setSearch(e.target.value)}
          placeholder="Search"
          className="me-2"
          aria-label="Search"
        />
         </Col>
         <Col sm={2}>
        <Button variant="outline-success">Search</Button>
        </Col>
      </Form>
        
          <Row>
            <Col sm={6}>
          {filteredContacts.map((contact, i) => <Contact contact={contact} key={i} deleteContact={deleteContact} />)}
          </Col>
            </Row>
        </>
    )
}

export default Contacts