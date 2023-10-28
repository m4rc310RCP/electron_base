import React, { createContext, useContext, useState } from 'react';
import CryptoJS from 'crypto-js';

const AuthContext = createContext();
const ACCESS_TOKEN = 'key_access_token';

// const createPBKDF2Key = () => {
// 	const clientId = process.env.APP_CLIENT_ID;
// 	const clientSalt = process.env.APP_CLIENT_SALT;

// 	const mkey = CryptoJS.PBKDF2(clientId, clientSalt, {
// 		keySize: 128 / 32,
// 		iterations: 10000,
// 		hasher: CryptoJS.algo.SHA256,
// 	});

// 	return CryptoJS.enc.Base64.stringify(mkey);
// };

// const loadAccessToken = () => {
// 	const token = localStorage.getItem(ACCESS_TOKEN);
// 	if (token) {
// 		return token;
// 	}
// };

// export const AuthProvider = ({ children }) => {
// 	const [authenticated, setAuthenticated] = useState(true);
// 	const [loading, setLoading] = useState(false);

// 	const handleAuthenticate = async (username, password, createPBKDF2Key) => {
// 		await setLoading(true);
// 		await authenticate(username, password, createPBKDF2Key);
// 		//await requestRegisterPos();
// 		await setLoading(false);
// 	};

// 	const data = {
// 		loading,
// 		pbkdf2Key: createPBKDF2Key,
// 		authenticated: authenticated,
// 		access_token: loadAccessToken(),
// 		setLoading,
// 		requestRegisterPos,
// 		signin: (username, password) => {
// 			handleAuthenticate(username, password, createPBKDF2Key);
// 		},
// 		signout: () => {},
// 	};
// 	return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
// };

export const AuthProvider = ({ children }) => {
	const [username, setUsername] = useState("mlsilva");

	const handleAuthenticate = (username) =>{
		setUsername(username);
	};

	const data = {username, handleAuthenticate};
	return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
