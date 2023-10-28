import React, { createContext, useContext, useState } from 'react';

import { useStatusBar } from '../../hooks';

const MMessage = (props) => {
	const { message } = props;

	return <div {...props}>{message}</div>;
};

export const MStatusBar = () => {
	const { message, BuildCard, AuthCard } = useStatusBar();

	const Sp = () => <div className="w-px h-auto bg-gray-600" />;
	const Stretch = () => <div className="flex-grow" />;

	return (
		<div className="flex flex-row font-semibold select-none gap-1 w-screen p-1 bg-slate-400 text-tiny">
			<MMessage className="h-auto w-96 " message={message} />
			<Sp />
			<BuildCard />
			<Sp />
			<Stretch />
			<Sp/>
			<AuthCard />
		</div>
	);
};

