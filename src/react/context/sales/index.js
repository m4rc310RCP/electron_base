import React, { createContext, useContext, useEffect, useState } from 'react';

import { findAllProducts } from '../../api';

const MSalesContetxt = createContext(null);

export const useSales = () => useContext(MSalesContetxt);

export const MSalesProvider = ({ children }) => {
	const data = {
		findAllProducts,
	};
	return <MSalesContetxt.Provider value={data}>{children}</MSalesContetxt.Provider>;
};
