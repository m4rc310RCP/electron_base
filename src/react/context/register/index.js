import React, { createContext, useContext, useEffect, useState } from 'react';

const MRegisterContext = createContext(null);

const KEY_LOCAL_DEVICE_CODE = 'mls-device-code';
const KEY_LOCAL_USER_USERNAME = 'mls-user-username';
const KEY_LOCAL_AUTH_TOKEN = 'mls-auth-token';
const KEY_LOCAL_SALES_TOKEN = 'mls-sales-token';

export const MRegisterProvider = ({ children }) => {
	const lg = localStorage;

	const [deviceCode, setDeviceCode] = useState(lg.getItem(KEY_LOCAL_DEVICE_CODE));
	const [username, setUsername] = useState(lg.getItem(KEY_LOCAL_USER_USERNAME));
	const [authToken, setAuthToken] = useState(lg.getItem(KEY_LOCAL_AUTH_TOKEN));
	const [salesToken, setSalesToken] = useState(lg.getItem(KEY_LOCAL_SALES_TOKEN));
	const [hostname, setHostname] = useState(undefined);

	electron.deviceApi.hostname().then((hostname) => {
		setHostname(hostname);
	});

	const data = {
		username,
		deviceCode,
		authToken,
		salesToken,
		hostname,
		setDeviceCode: (code) => {
			localStorage.setItem(KEY_LOCAL_DEVICE_CODE, code);
			setDeviceCode(code);
		},
		setUsername: (username) => {
			localStorage.setItem(KEY_LOCAL_USER_USERNAME, username);
			setUsername(username);
		},
		setAuthToken: (token) => {
			localStorage.setItem(KEY_LOCAL_AUTH_TOKEN, token);
			setAuthToken(token);
		},
		setSalesToken: (token) => {
			localStorage.setItem(KEY_LOCAL_SALES_TOKEN, token);
			setSalesToken(token);
		},
		resetDeviceCode: () => {
			localStorage.removeItem(KEY_LOCAL_DEVICE_CODE);
			setDeviceCode(null);
		},
	};

	return <MRegisterContext.Provider value={data}>{children}</MRegisterContext.Provider>;
};

/*
const MRegisterProvider__ = ({ children }) => {
	
	const [deviceCode, setDeviceCode] = useState(localStorage.getItem(KEY_LOCAL_DEVICE_CODE));
	
	const storeDeviceCode = code => {
		if (code){
			localStorage.setItem(KEY_LOCAL_DEVICE_CODE, code);
			setDeviceCode(code);
		}
	} 

	const resetDevice = () => {
		localStorage.removeItem(KEY_LOCAL_DEVICE_CODE);
		setDeviceCode(undefined);
	}
	
	const data = {
		deviceCode, storeDeviceCode, resetDevice
	};
	
	return (
		<MRegisterContext.Provider value={data}>
			{children}
		</MRegisterContext.Provider>
	);
};
*/
export const useRegister = () => useContext(MRegisterContext);
