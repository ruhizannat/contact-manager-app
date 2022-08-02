import axios from 'axios';
import qs from 'qs';
import { createContext, useContext, useEffect, useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
	ADD_CONTACT,
	DELETE_CONTACT,
	DETAILS_CONTACT,
	GET_CONTACTS,
	UPDATE_CONTACT,
} from '../actions';
import { contactReducer } from '../contactReducer';
import useToken from '../hooks/useToken';
import { formatContacts } from '../utils/fomatContacts';
import formatContact from '../utils/formatContact';
import { AuthContext } from './AuthContext';

export const ContactContext = createContext();

const initialState = [];

export const ContactProvider = ({ children }) => {
	const [contacts, dispatch] = useReducer(contactReducer, initialState);
	const navigate = useNavigate();
    // contact with author(don't work)
	const { token, tokenLoaded } = useToken();

	const loadContacts = async () => {
		const query = qs.stringify(
			{
				populate: ['picture'],
			},
			{
				encodeValuesOnly: true,
			}
		);

		try {
			const res = await axios.get(
				`http://localhost:1337/api/contacts?${query}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			const contacts = formatContacts(res.data.data);
			dispatch({ type: GET_CONTACTS, payload: contacts });
		} catch (err) {
			console.log(err);
			console.log(err.response);
		}
	};

	useEffect(() => {
		if (tokenLoaded && token) {
			//    load contact from server
			loadContacts();
		}
	}, [tokenLoaded, token]);
	const addContact = async (formData) => {
		// setContacts([...contacts, contact])
		// const formatted_contacts = {
		// 	...contact,

		// 	first_name: contact.firstName,
		// 	last_name: contact.lastName,
		// 	email_address: contact.emailAddress,
		// 	date_of_birth: contact.dateOfBirth,
		// 	gender: contact.gender,
		// 	picture: contact.picture,
		// 	slug: contact.firstName + contact.lastName,
		// };
		// console.log(formatted_contacts);
		try {
			const res = await axios({
				method: 'post',
				url: `http://localhost:1337/api/contacts?populate=picture`,
				data: formData,

				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			console.log(formData);

			console.log(res.data);
			const addedContact = formatContact(res.data.data);

			const contact = {
				firstName: 'ruhi',
				lastName: 'zannat',
				emailAddress: 'ruhizannat71@gmail.com',
				dateOfBirth: new Date(),
				gender: 'female',
				picture:
					'/uploads/medium_pexels_karolina_grabowska_7680097_7da576b632.jpg',
			};

			dispatch({ type: ADD_CONTACT, payload: addedContact });
			toast.success('Contact is added successfully');
			navigate('/contacts');
		} catch (err) {
			console.log(err);
			console.log(err.response);
		}
	};

	const deleteContact = (id) => {
		dispatch({ type: DELETE_CONTACT, payload: id });
	};

	const updateContact = (contactToUpdate) => {
		dispatch({ type: UPDATE_CONTACT, payload: contactToUpdate });
	};

	// const ContactDetails = (id) => {
	// 	dispatch({ type: DETAILS_CONTACT, payload: id });
	// };
	const value = {
		contacts,
		addContact,
		deleteContact,
		updateContact,
		
		// ContactDetails,
	};
	return (
		<ContactContext.Provider value={value}>{children}</ContactContext.Provider>
	);
};
