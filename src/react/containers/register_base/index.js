import React, { useState, useEffect, useRef } from 'react';
import { gql, useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { FaComputer } from 'react-icons/fa6';

import { useScreenshot, useRegister } from '../../hooks';

export const MPosRegister = () => {
	const [code, setCode] = useState('');
	const [disabled, setDisabled] = useState(true);
	//const [loading, setLoading] = useState(false);
	const codeRef = useRef(null);

	const { setModeScreenshot } = useScreenshot();
	const { storeDeviceCode } = useRegister();

	useEffect(() => {
		codeRef.current.focus();
	}, []);

	const MUTATION_VLD_CODE = gql`
		mutation vldPos($code: String!) {
			VALIDAR_POS(cd_registro: $code) {
				cd_registro
				dt_confirmacao
				dt_requisicao
				in_valido
				id_dispositivo
			}
		}
	`;

	const [vldPos, { loading, error }] = useMutation(MUTATION_VLD_CODE, {
		onCompleted: (data) => {
			const { id_dispositivo } = data.VALIDAR_POS;
			storeDeviceCode(id_dispositivo);
			console.log(id_dispositivo);
		},
	});

	const handleRegisterTerminal = () => {
		//const value = codeRef.current.value;

		//const message = { title: 'Incidente Urgente', body: 'Atenção novo incidente urgente foi registrado!' };
		//electron.notificationApi.sendNotification(message);
		//electron.windowApi.setTitle('Empresa de testes - Filial Centro');

		vldPos({ variables: { code: codeRef.current.value } });
	};

	return (
		<div className="flex w-scren h-screen items-center justify-center">
			<div className="flex flex-col w-96 p-3 gap-5 items-center justify-center">
				<div className="flex flex-row">
					<FaComputer className="w-32 h-auto mr-4" />
					<h1 className="text-sm">Solicite ao seu administrador a geração de um código de acesso em outro terminal.</h1>
				</div>

				<div className="flex flex-col w-72 gap-1 items-center justify-center">
					<input
						className="text-center p-1 mb-5 border border-gray-700 rounded-md font-bold text-gray-800 placeholder:italic placeholder:text-gray-200 placeholder:text-sm disabled:opacity-25"
						type="text"
						maxLength={5}
						value={code}
						placeholder="Código de Registro"
						ref={codeRef}
						onChange={(e) => {
							const res = e.target.value.toUpperCase();
							setDisabled(res.length < 5);
							setCode(res);
						}}
						onKeyDown={(e) => {
							if (e.key === 'Enter') {
								handleRegisterTerminal();
							}
						}}
						disabled={loading}
					/>

					<button
						className="px-6 py-3 text-white bg-blue-600 rounded focus:bg-blue-800 text-sm  disabled:opacity-25"
						disabled={disabled || loading}
						onClick={() => handleRegisterTerminal()}
					>
						{loading ? 'Carregando...' : 'Registrar Terminal'}
					</button>
				</div>
				<button
					onClick={() => {
						setModeScreenshot(true);
						electron.windowApi.setModeCaptureScreenshot(true);
					}}
				>
					Teste
				</button>
				<h1 className="text-xs text-red-500 h-3">{error && error?.message}</h1>
			</div>
		</div>
	);
};
