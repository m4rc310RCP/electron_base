import React, { createContext, useContext, useState } from 'react';

const MRegisterContext = createContext(null);

export const useRegister = () => useContext(MRegisterContext);

export const MRegisterProvider = ({ children }) => {
	const data = {
	};
	return (
		<MRegisterContext.Provider value={data}>
			{children}
		</MRegisterContext.Provider>
	);
};

