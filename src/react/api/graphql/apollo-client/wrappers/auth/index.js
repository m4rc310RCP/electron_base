import React from 'react';
import { ApolloProvider } from '@apollo/client';

import { client } from '../../index';

const uri = 'http://localhost:8081/grapql';
const type_token = 'Test';
const token = 'mlsilva:270881';

export const ApolloAuthWrapper = ({children}) => {
	return <ApolloProvider client={client(uri, type_token, token)}>{children}</ApolloProvider>;
};

