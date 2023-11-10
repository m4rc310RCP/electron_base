import React, { createContext, useContext, useState } from 'react';
import { MScreenshot } from '../../containers';

const MScreeshotContext = createContext();

export const MScreenshotProvider = ({ children }) => {
	const [modeScreenshot, setModeScreenshot] = useState(false);

	const captureScreenshot = (metrics) => {};

	const data = { captureScreenshot, setModeScreenshot };
	return <MScreeshotContext.Provider value={data}>{modeScreenshot ? <MScreenshot /> : children}</MScreeshotContext.Provider>;
};

export const useScreenshot = () => useContext(MScreeshotContext);
