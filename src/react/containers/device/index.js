import React, { useRef, useState, useEffect } from 'react';
import { useRegister } from '../../hooks';
import { gql, useMutation } from '@apollo/client';

export const MRegisterDevice = () => {
	const [code, setCode] = useState('');
	const { setDeviceCode } = useRegister();
	const codeRef = useRef(null);

	const handleFocus = (event) => event.target.select();

	useEffect(() => {
		codeRef.current.focus();
	}, []);

	const MUTATION_VALIDATE_POS = gql`
		mutation validatePos($code: String!) {
			VALIDAR_POS(cd_registro: $code) {
				id_dispositivo
			}
		}
	`;

	const [handleValidateCode, { loading, error }] = useMutation(MUTATION_VALIDATE_POS, {
		variables: { code: `${code}` },
		onCompleted: (data) => {
			setDeviceCode(data.VALIDAR_POS.id_dispositivo);
		},
		onError: () => {
			codeRef.current.focus();
		},
	});

	return (
		<div>
			{loading && <h3>'Aguarde...'</h3>}
			{error && <h3>{error.message}</h3>}
			<input
				ref={codeRef}
				value={code}
				onChange={(e) => {
					const res = e.target.value.toUpperCase();
					if (res.length <= 5) {
						setCode(res);
					}
				}}
				onKeyDown={(e) => {
					if (e.key === 'Enter') {
						handleValidateCode();
					}
				}}
				onFocus={handleFocus}
				disabled={loading}
			/>
			<button onClick={() => handleValidateCode()}>Register</button>
		</div>
	);
};
