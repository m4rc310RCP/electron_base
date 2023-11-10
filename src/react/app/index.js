import React, { useState, useEffect } from 'react';
import { useRegister } from '../hooks';
import { MRegisterDevice } from '../containers';
import { ApolloAuthWrapper } from '../api/graphql';

const App = () => {
	const { deviceCode, resetDeviceCode, hostname } = useRegister();

	if (!deviceCode) {
		return (
			<ApolloAuthWrapper>
				<MRegisterDevice />
			</ApolloAuthWrapper>
		);
	}

	return (
		<>
			<h1>---| {hostname} </h1>
			<div>{deviceCode}</div>
			<button onClick={() => resetDeviceCode()}>RESET CODE</button>
		</>
	);
};

export default App;
