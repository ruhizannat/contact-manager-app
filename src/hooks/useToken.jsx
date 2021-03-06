import { useEffect, useState } from 'react';

const useToken = () => {
	const [token, setToken] = useState(null);
	const [tokenLoaded, setTokenLoaded] = useState(false);
	const loadToken = () => {
		const token = localStorage.getItem('contact-app-token');
		setToken(token);
		setTokenLoaded(true);
	};
	useEffect(() => {
		loadToken();
	}, []);
	return { token, tokenLoaded };
};
export default useToken;
