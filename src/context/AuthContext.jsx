import axios from 'axios';

import { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import useToken from '../hooks/useToken';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [userLoaded, setUserLoaded] = useState(false);
	
	const { token, tokenLoaded } = useToken();

	async function loadUser() {
		try {
			const res = await axios.get('http://localhost:1337/api/users/me', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			const info = res.data;
			setUser({
				id: info.id,
				username: info.username,
				email: info.email,
			});
		} catch (err) {
			toast.warn('please login before taking action');
			console.log(err.response);
		} finally {
			setUserLoaded(true);
		}
	}

	const removeAuthInfo = () => {
		setUser(null);
		//  remove token from localStorage
		localStorage.removeItem('contact-app-token');
	};
	useEffect(() => {
		if (tokenLoaded) {
			loadUser();
		}
	}, [tokenLoaded]);
	const saveAuthInfo = (info) => {
		// save token into localStorage
		localStorage.setItem('contact-app-token', info.jwt);
		// save user info into state
		setUser({
			id: info.user.id,
			username: info.user.username,
			email: info.user.email,
		});
	};
	const value = {
		saveAuthInfo,
		removeAuthInfo,
		userLoaded,
		user,
	};
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
