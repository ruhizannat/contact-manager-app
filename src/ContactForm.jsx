import { useEffect, useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import TextInput from './contactFormInputs/TextInput';
import EmailInput from './contactFormInputs/EmailInput';
import DateInput from './contactFormInputs/DateInput';
import CheckInput from './contactFormInputs/CheckInput';
import ImagesInput from './contactFormInputs/imagesInput';

import CommonValueCheckedInput from './contactFormInputs/CommonValueCheckedInput';

const defaultContact = {
	firstName: '',
	lastName: '',
	emailAddress: '',
	dateOfBirth: new Date(),
	gender: 'female',
	picture: '',
};
const ContactForm = ({ addContact, updateContact, contact: contactToEdit }) => {
	const [contact, setContact] = useState({
		firstName: '',
		lastName: '',
		emailAddress: '',
		dateOfBirth: new Date(),
		gender: 'female',
		picture: '',
	});

	useEffect(() => {
		if (contactToEdit) {
			const {
				id,
				firstName,
				lastName,
				emailAddress,
				dateOfBirth,
				gender,
				picture,
			} = contactToEdit;
			setContact({
				id,
				firstName,
				lastName,
				emailAddress,
				dateOfBirth,
				gender,
				picture,
			});
		}
	}, [contactToEdit]);
	const navigate = useNavigate();

	const [errors, setErrors] = useState({
		firstName: '',
		lastName: '',
		emailAddress: '',
		dateOfBirth: '',
		picture: '',
	});

	const handelChange = (evt) => {
		setContact({
			...contact,
			[evt.target.name]: evt.target.value,
		});
		setErrors({
			...errors,
			[evt.target.name]: '',
		});
	};

	const handelSubmit = (evt) => {
		evt.preventDefault();
		const { picture, firstName, lastName, emailAddress, dateOfBirth } = contact;
		//    checking error
		if (firstName === '') {
			setErrors((prevErrors) => ({
				...prevErrors,
				firstName: 'First Name is Required',
			}));
		}

		if (lastName === '') {
			setErrors((prevErrors) => ({
				...prevErrors,
				lastName: 'Last Name is Required',
			}));
		}

		if (emailAddress === '') {
			setErrors((prevErrors) => ({
				...prevErrors,
				emailAddress: 'Please enter valid email address.',
			}));
		}

		if (dateOfBirth === '') {
			setErrors((prevErrors) => ({
				...prevErrors,
				dateOfBirth: 'Date of Birth is Required',
			}));
		}

		if (picture === '') {
			setErrors((prevErrors) => ({
				...prevErrors,
				picture: 'picture is Required',
			}));
		}

		//  return true if every element true , otherwise false
		const isValid = Object.values(contact).every((elm) => elm);

		if (contact.id && isValid) {
			updateContact({
				...contact,
			});
			toast.success('Contact is Updated successfully');
			return navigate('/contacts');
		}

		if (isValid && !contact.id) {
			// form submission
			addContact({
				id: uuidv4(),
				...contact,
			});

			toast.success('Contact is added successfully');
			navigate('/contacts');
			// reset after submitting
			// setContact(defaultContact)
		}
	};

	const { picture, firstName, lastName, emailAddress, dateOfBirth, gender } =
		contact;
	const {
		picture: errorPicture,
		firstName: errorFirstName,
		lastName: errorLastName,
		emailAddress: errorEmailAddress,
		dateOfBirth: errorDateOfBirth,
	} = errors;

	const genderValue = [
		{
			name: 'gender',
			type: 'radio',
			value: 'male',
			label: 'Male',
		},
		{
			name: 'gender',
			type: 'radio',
			value: 'female',
			label: 'feMale',
		},
	];
	return (
		<>
			<h1 className='mb-4 mt-4'>
				{contactToEdit ? 'Edit Contact' : 'Add Contact'}
			</h1>
			<Form onSubmit={handelSubmit}>
				<TextInput
					label='First Name'
					type='text'
					name='firstName'
					onChange={handelChange}
					value={firstName}
					placeholder='Enter your First Name'
					error={errorFirstName}
				/>

				<TextInput
					label='Last Name'
					type='text'
					name='lastName'
					onChange={handelChange}
					value={lastName}
					placeholder='Enter your Last Name'
					error={errorLastName}
				/>

				<EmailInput
					label='	Email address'
					type='email'
					name='emailAddress'
					onChange={handelChange}
					value={emailAddress}
					placeholder='Enter your email'
					error={errorEmailAddress}
				/>

				<ImagesInput
					label='Picture'
					type='url'
					name='picture'
					placeholder='Enter your Picture'
					onChange={handelChange}
					value={picture}
					error={errorPicture}
				/>

				<DateInput
					label='Date of Birth'
					type='date'
					selected={dateOfBirth}
					name='dateOfBirth'
					onChange={(date) =>
						setContact({
							...contact,
							dateOfBirth: date,
						})
					}
					value={dateOfBirth}
					error={errorDateOfBirth}
					selectsStart
				/>

				<CommonValueCheckedInput
					label='Gender'
					onChange={handelChange}
					valueToIterate={genderValue}
					valueToCheck={gender}
				/>

				<div className='mt-4'>
					<Button variant='primary' size='md' type='submit'>
						{contactToEdit ? 'Update Contact' : 'Submit Contact'}
					</Button>
					{/* <Button variant="secondary" className="ms-2" size='md'onClick={() =>navigate('/contacts')}>Back</Button> */}
				</div>
			</Form>
		</>
	);
};

export default ContactForm;
