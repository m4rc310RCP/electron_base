import React from 'react';
import { ApolloClient, ApolloProvider } from '@apollo/client';

import { clientCustom } from '../../index';

const uri = 'https://home.m4rc310.com.br/graphql';
const type_token = 'Test';
const token = '270881:mlsilva';

export const ApolloAuthWrapper = ({ children }) => {
	const data = { uri, type_token, token };
	return <ApolloProvider client={clientCustom(data)}>{children}</ApolloProvider>;
};
