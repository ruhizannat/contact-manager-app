import React from 'react';

export default function formatContact(data) {
	return {
        id: data.id,
        ...data.attributes
    }
}
