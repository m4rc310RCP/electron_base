import React, { useState, useEffect } from 'react';
import { VscTools } from 'react-icons/vsc';
import { PiUserCircle } from 'react-icons/pi';
import { LiaUserAltSlashSolid } from 'react-icons/lia';
import { useAuth } from '../../hooks';

import buildInfo from '../../../../build-info.json';

export const AuthCard = (props) => {
	const { username, handleAuthenticate } = useAuth();

	return (
		<div {...props}>
			<div className="flex flex-row gap-1">
				{!username ? (
					<>
						<LiaUserAltSlashSolid className="icon-status-bar" onClick={() => handleAuthenticate('m4rc310')} />
					</>
				) : (
					<>
						<PiUserCircle className="icon-status-bar" onClick={() => handleAuthenticate('m4rc310')} />
						<h1 className="font-bold">{username}</h1>
					</>
				)}
			</div>
		</div>
	);
};

export const BuildCard = (props) => {
	const [buildNumber, setBuildNumber] = useState(null);
	useEffect(() => {
		const fetchBuildNumber = async () => {
			try {
				setBuildNumber(buildInfo.buildNumber);
			} catch (error) {
				console.error('Erro ao obter o número do build:', error);
			}
		};
		fetchBuildNumber();
	}, []);

	return (
		<div {...props}>
			{buildNumber !== null ? (
				<div className="flex flex-row gap-1">
					<VscTools className="icon-status-bar" />
					<h1>Build: {buildNumber}</h1>
				</div>
			) : (
				<p>Carregando número do build...</p>
			)}
		</div>
	);
};
