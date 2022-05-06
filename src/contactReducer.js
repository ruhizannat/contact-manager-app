import {
	ADD_CONTACT,
	DELETE_CONTACT,
	DETAILS_CONTACT,
	UPDATE_CONTACT,
} from './actions';

export const contactReducer = (state, action) => {
	const { type, payload } = action;
	switch (type) {
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

		// case DETAILS_CONTACT:
		// 	const foundContact = state.find((contact) => contact.id === payload);

		// 	return [...foundContact];

		default:
			return state;
	}
};
