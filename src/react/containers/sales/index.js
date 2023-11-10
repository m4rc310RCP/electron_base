import React from 'react';

const MSales = () => {
	return (
		<div>
			<button onClick={() => resetDevice()}>Reset Dispositivo</button>
		</div>
	);
};

const MOfflineView = () => {
	return <>OFF-LINE</>;
};

export const MSalesView = () => {
	if (true) {
		return <MSales />;
	} else {
		return <MOfflineView />;
	}
};
