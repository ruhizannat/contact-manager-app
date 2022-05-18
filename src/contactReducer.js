import {
	ADD_CONTACT,
	DELETE_CONTACT,
	DETAILS_CONTACT,
	GET_CONTACTS,
	UPDATE_CONTACT,
} from './actions';

export const contactReducer = (state, action) => {
	const { type, payload } = action;
	switch (type) {
		case GET_CONTACTS:
			return [...state, ...payload];
		case ADD_CONTACT:
			return [...state, payload];
		case DELETE_CONTACT:
			const contactAfterDelete = state.filter(
				(contact) => contact.id !== payload
			);
			return [...contactAfterDelete];

		case UPDATE_CONTACT:
			const contactAfterUpdate = state.map((contact) => {
				if (contact.id === payload.id) {
					return {
						id: contact.id,
						...payload,
					};
				} else {
					return contact;
				}
			});

			return [...contactAfterUpdate];

		default:
			return state;
	}
};
