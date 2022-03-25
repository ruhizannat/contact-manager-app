import Contact from './Contact'
import {  Row, Col } from "react-bootstrap"




const Contacts = ({contacts, deleteContact}) =>{
    
    return(
       
        <>
         <h1 className='mt-3'>All Contacts</h1>
          <Row>
            <Col sm={6}>
          {contacts.map((contact, i) => <Contact contact={contact} key={i} deleteContact={deleteContact} />)}
          </Col>
            </Row>
        </>
    )
}

export default Contacts