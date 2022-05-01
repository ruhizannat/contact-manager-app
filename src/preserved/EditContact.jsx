import { useEffect, useState } from "react"
import { Form, Row, Col, Button } from "react-bootstrap"
import { v4 as uuidv4 } from 'uuid';
import { useNavigate, useParams } from "react-router-dom";
import {  toast } from 'react-toastify';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";


const defaultContact = {
    firstName: '',
    lastName: '',
    emailAddress: '',
    dateOfBirth: new Date(),
    picture: '',
    gender: '',


}

const EditContact = ({addContact, contacts, updateContact}) =>{

    const [contact, setContact] = useState(defaultContact)
    const navigate = useNavigate()
   const {id} = useParams()
   console.log(id)

   const contactToEdit = () =>{
     const foundContact =  contacts.find(contact => contact.id === id)
     if(!foundContact){
         toast.error('contacts is not found to be updated')
         return navigate('/contacts')
     }
     console.log(foundContact)
     setContact(foundContact)
   }
    
    useEffect(() =>{
          contactToEdit()
    }, [id])

    
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        emailAddress: '',
        dateOfBirth: '',
        picture:'',
        
       
        

    }) 
   

    const handelChange = (evt) =>{
       setContact({
           ...contact,
           [evt.target.name]: evt.target.value,
       })
       setErrors({
           ...errors,
           [evt.target.name]: ''
       })
      
      
    }

    const handelSubmit = (evt) =>{
       evt.preventDefault()
       const {picture, firstName, lastName, emailAddress, dateOfBirth} = contact
            //    checking error
            if(firstName === ''){
               setErrors(prevErrors =>({
                ...prevErrors,
                firstName: 'First Name is Required'    
               
               }))
            }

            if(lastName === ''){
                setErrors( (prevErrors) =>({
                 ...prevErrors,
                 lastName: 'Last Name is Required'
                }))
             }

             if(emailAddress === ''){
                setErrors( (prevErrors) =>({
                    ...prevErrors,
                     emailAddress: "Please enter valid email address."
                   }))
             }

             if(  dateOfBirth === ''){
                setErrors( (prevErrors) =>({
                    ...prevErrors,
                     dateOfBirth: 'Date of Birth is Required'
                   }))
             }

             if(  picture === ''){
                setErrors( (prevErrors) =>({
                    ...prevErrors,
                     picture: 'picture is Required'
                   }))
             }

             

            //  return true if every element true , otherwise false
            const isValid = Object.values(contact).every(elm => elm)
            if(isValid){
                // form submission
                updateContact({
                    id: uuidv4(),
                    ...contact
                })
                toast.success('Contact is Updated successfully')
                navigate('/contacts')
                // reset after submitting
                // setContact(defaultContact)
            }
    }
    
     const {picture,firstName, lastName, emailAddress, dateOfBirth, gender} = contact
     const {picture: errorPicture,firstName:errorFirstName, lastName: errorLastName, emailAddress: errorEmailAddress, dateOfBirth: errorDateOfBirth} = errors
    return(
        <>
         <h1 className="mb-4 mt-4">Edit Contact</h1>
          <Form onSubmit={handelSubmit}>
              <Form.Group as={Row} className='mb-3'>
                  <Col sm={3}>
                  <Form.Label column htmlFor="firstName">First Name</Form.Label>
                  </Col>
                   <Col sm={9}>
                        <Form.Control 
                        type="text"
                        name="firstName"
                        id="firstName"
                        onChange={handelChange}
                        value={firstName}
                        placeholder='Enter your First Name'
                        isInvalid={errorFirstName}
                       />

                        <Form.Control.Feedback type="invalid" className="d-block">
                            {errorFirstName}
                        </Form.Control.Feedback>
                   </Col>
                

              </Form.Group>

              <Form.Group as={Row} className='mb-3'>
                  <Col sm={3}>
                  <Form.Label column htmlFor="lastName">Last Name</Form.Label>
                  </Col>
                   <Col sm={9}>
                        <Form.Control 
                        type="text"
                        name="lastName"
                        id="lastName"
                        onChange={handelChange}
                        value={lastName}
                        placeholder='Enter your last Name'
                        isInvalid={errorLastName}
                     />

                 <Form.Control.Feedback type="invalid" className="d-block">
                   {errorLastName}
                 </Form.Control.Feedback>
                   </Col>
                

              </Form.Group>

              <Form.Group as={Row} className="mb-3" >
                <Col sm={3}>
                <Form.Label column htmlFor="email">Email address</Form.Label>     
                </Col>
                 
                 <Col sm={9}>
                 <Form.Control 
                 type="email" 
                 id="email"
                 name="emailAddress"
                 placeholder="Enter your email" 
                 onChange={handelChange}
                 value={emailAddress}
                 isInvalid={errorEmailAddress}
                   
                 />

            <Form.Control.Feedback type="invalid" className="d-block">
                   {errorEmailAddress}
                 </Form.Control.Feedback>

                
                 </Col>
                
            </Form.Group>

            <Form.Group as={Row} className="mb-3" >
                <Col sm={3}>
                <Form.Label column htmlFor="picture">Picture</Form.Label>     
                </Col>
                 
                 <Col sm={9}>
                 <Form.Control 
                 type="url" 
                 id="picture"
                 name="picture"
                 placeholder="Enter your Picture" 
                 onChange={handelChange}
                 value={picture}
                 isInvalid={errorPicture}
                   
                 />

            <Form.Control.Feedback type="invalid" className="d-block">
                   {errorPicture}
                 </Form.Control.Feedback>

                
                 </Col>
                
            </Form.Group>

            <Form.Group as={Row} className="mb-3" >
                <Col sm={3}>
                <Form.Label column htmlFor="dateOfBirth">Date of Birth</Form.Label>     
                </Col>
                 
                 <Col sm={9}>
                 <DatePicker 
                 type="date" 
                 selected={dateOfBirth}
                 id="dateOfBirth"
                 name="dateOfBirth"
                
                 onChange={(date) => setContact({
                     ...contact,
                     dateOfBirth:date,
                 })}
               
                 
              
                 value={dateOfBirth}
                 isInvalid={errorDateOfBirth}
                 selectsStart
                   
                 />

            <Form.Control.Feedback type="invalid" className="d-block">
                   {errorDateOfBirth}
                 </Form.Control.Feedback>

                
                 </Col>
                
            </Form.Group>


            <Form.Group as={Row} className="mb-3" >
                <Col sm={3}>
                <Form.Label column htmlFor="gender">Gender</Form.Label>     
                </Col>
                 
                 <Col sm='auto'>
                 <Form.Check
                 type="radio" 
                
                 name="gender"
                
                 onChange={handelChange}
                 value='male'
                 label='Male'
                 checked={gender === 'male'}
                   
                 />
                 </Col>
                 <Col sm='auto'>
                 <Form.Check
                 type="radio" 
                
                 name="gender"
                
                 onChange={handelChange}
                 value='female'
                 label='Female'
                 checked={gender === 'female'}
                   
                 />
                 </Col>
                
            </Form.Group>
              <div className="mt-4">
              <Button variant="warning" size='md' type='submit'>Update Contact</Button>
              <Button variant="secondary" className="ms-2" size='md'onClick={() =>navigate('/contacts')}>Back</Button>
              </div>
          </Form>
        </>
    )
}


export default EditContact