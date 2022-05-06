import { createContext, useReducer } from 'react';
import {
	ADD_CONTACT,
	DELETE_CONTACT,
	DETAILS_CONTACT,
	UPDATE_CONTACT,
} from '../actions';
import { contactReducer } from '../contactReducer';

export const ContactContext = createContext();

const initialState = [
	{
		id: '1',
		firstName: 'ishika rubaiya',
		lastName: 'sopno',
		emailAddress: 'ishikajannath@gmail.com',
		dateOfBirth: new Date(),
		gender: 'female',
		picture:
			'https://thumbs.dreamstime.com/b/woman-laptop-icon-flat-style-illustration-vector-web-design-163519381.jpg',
	},
];

export const ContactProvider = ({ children }) => {
	const [contacts, dispatch] = useReducer(contactReducer, initialState);
	const addContact = (contact) => {
		// setContacts([...contacts, contact])
		dispatch({ type: ADD_CONTACT, payload: contact });
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
