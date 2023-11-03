import React, { useState, useEffect } from 'react';

import { MPosRegister } from '../containers';
import { isRegister } from '../api';
import { ApolloAuthWrapper } from '../api/graphql/index';


const App = () => {
	if (!isRegister) {
		return <ApolloAuthWrapper> <MPosRegister /> </ApolloAuthWrapper>;
	}
	return <div>APP</div>;
};

export default App;
