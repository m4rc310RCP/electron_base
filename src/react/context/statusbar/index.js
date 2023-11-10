import React, { createContext, useContext, useState } from 'react';
import { MStatusBar, BuildCard, AuthCard } from '../../components';
import { AuthProvider } from '../../context';

const MStatusBarContext = createContext(null);

export const useStatusBar = () => useContext(MStatusBarContext);

export const MStatusBarProvider = ({ children }) => {
	const [message, setMessage] = useState(' ');
	const data = {
		BuildCard,
		AuthCard,
		message,
		updateMessage: (msg) => {
			setMessage(msg);
		},
	};
	return (
		<MStatusBarContext.Provider value={data}>
			<div className="grid w-screen h-screen">
				<AuthProvider>{children}</AuthProvider>
				<div className="mt-auto">
					<MStatusBar {...data} />
				</div>
			</div>
		</MStatusBarContext.Provider>
	);
};
