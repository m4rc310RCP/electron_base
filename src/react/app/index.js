import React, { useState, useEffect } from 'react';

import { MPosRegister } from '../containers';
import { isRegister } from '../api';

const App = () => {
	if (!isRegister) {
		return <MPosRegister />;
	}
	return <div>APP</div>;
};

export default App;
