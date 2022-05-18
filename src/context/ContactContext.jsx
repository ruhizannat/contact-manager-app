import axios from 'axios';
import { createContext, useEffect, useReducer } from 'react';
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
	{
		id: '1',
		firstName: 'Lisabeth',
		lastName: 'Treslove',
		emailAddress: 'ltreslove0@dropbox.com',
		gender: 'Male',
		dateOfBirth: new Date(),
		picture:
			'https://e7.pngegg.com/pngimages/954/328/png-clipart-computer-icons-user-profile-avatar-heroes-head.png',
	},
	{
		id: '2',
		firstName: 'Johnathan',
		lastName: 'Molnar',
		emailAddress: 'jmolnar1@weather.com',
		gender: 'Male',
		dateOfBirth: new Date(),
		picture:
			'https://e7.pngegg.com/pngimages/954/328/png-clipart-computer-icons-user-profile-avatar-heroes-head.png',
	},
	{
		id: '3',
		firstName: 'Judie',
		lastName: 'Mackrill',
		emailAddress: 'jmackrill2@accuweather.com',
		gender: 'Female',
		dateOfBirth: new Date(),
		picture: 'https://cdn-icons-png.flaticon.com/512/219/219969.png ',
	},
	{
		id: '4',
		firstName: 'Yvonne',
		lastName: 'Wheater',
		emailAddress: 'ywheater3@mac.com',
		gender: 'Male',
		dateOfBirth: new Date(),
		picture:
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJ7m06X6vsmiHCcyIUoW7Afl_XhoHW58WrMg&usqp=CAU',
	},
	{
		id: '5',
		firstName: 'Herculie',
		lastName: 'Riolfi',
		emailAddress: 'hriolfi4@amazon.co.jp',
		gender: 'Male',
		dateOfBirth: new Date(),
		picture:
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRF8EZQrzI_ybF6HM0sVb2vY5WrOMKuIcGK7g&usqp=CAU ',
	},
	{
		id: '6',
		firstName: 'Nichols',
		lastName: 'Sherwen',
		emailAddress: 'nsherwen5@prweb.com',
		gender: 'Female',
		dateOfBirth: new Date(),
		picture:
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJ7QaI5DTqv_k8EyPj3-QeT-5IpWTj_IHRqQ&usqp=CAU ',
	},
	{
		id: '7',
		firstName: 'Waring',
		lastName: 'Cowden',
		emailAddress: 'wcowden6@ameblo.jp',
		gender: 'Female',
		dateOfBirth: new Date(),
		picture:
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQprjP-BMSaPG1L-_gGNVEVpP9pqXbmkUJk2g&usqp=CAU',
	},
	{
		id: '8',
		firstName: 'Virge',
		lastName: 'Routledge',
		emailAddress: 'vroutledge7@ucoz.ru',
		gender: 'Female',
		dateOfBirth: new Date(),
		picture:
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNiQ63wXcfaE7w3wFexsqcuvwGwevpQHfEvw&usqp=CAU ',
	},
	{
		id: '9',
		firstName: 'Kara-lynn',
		lastName: 'Palliser',
		emailAddress: 'kpalliser8@upenn.edu',
		gender: 'Male',
		dateOfBirth: new Date(),
		picture:
			'https://cdn.iconscout.com/icon/free/png-256/laptop-user-1-1179329.png ',
	},
	{
		id: '10',
		firstName: 'Julianne',
		lastName: 'Emptage',
		emailAddress: 'jemptage9@ted.com',
		gender: 'Female',
		dateOfBirth: new Date(),
		picture:
			'https://thumbs.dreamstime.com/b/woman-laptop-icon-flat-style-illustration-vector-web-design-163519381.jpg ',
	},
];

export const ContactProvider = ({ children }) => {
	const [contacts, dispatch] = useReducer(contactReducer, initialState);

	const { token, tokenLoaded } = useToken();

	const loadContacts = async () => {
		try {
			const res = await axios.get('http://localhost:1337/api/contacts', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			const contacts = formatContacts(res.data.data);
			dispatch({ type: GET_CONTACTS, payload: contacts });
			console.log(contacts);
			console.log(res.data);
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
