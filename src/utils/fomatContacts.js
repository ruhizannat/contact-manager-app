export const formatContacts = (data) => {
	return data.map((contact) => ({ id: contact.id, ...contact.attributes }));
};
