import React, { useState, useEffect, useRef } from 'react';
import { FaComputer } from 'react-icons/fa6';

export const MPosRegister = () => {
	const [code, setCode] = useState('');
	const [disabled, setDisabled] = useState(true);
	const [loading, setLoading] = useState(false);
	const codeRef = useRef(null);
	useEffect(() => {
		codeRef.current.focus();
	}, []);

	const handleRegisterTerminal = () => {
		setLoading(true)
		console.log(`Loading: ${codeRef.current.value}`)
	}

	return (
		<div className="flex w-scren h-screen items-center justify-center">
			<div className="flex flex-col w-96 p-3 gap-5 items-center justify-center">
				<div className="flex flex-row">
					<FaComputer className="w-32 h-auto mr-4" />
					<h1>Solicite ao seu administrador a geração de um código de acesso em outro terminal.</h1>
				</div>
				<div className="flex flex-col w-72 gap-1 items-center justify-center">
					<input
						className="text-center p-1 mb-5 border border-gray-700 rounded-md font-bold text-gray-800 placeholder:italic placeholder:text-gray-200 placeholder:text-sm disabled:opacity-25"
						type="text"
						maxLength={5}
						value={code}
						placeholder='Código de Registro'
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
					<button className='px-6 py-3 text-white bg-blue-600 rounded focus:bg-blue-800 text-sm  disabled:opacity-25' disabled={disabled || loading} onClick={handleRegisterTerminal}>
						{loading ? 'Carregando...' : 'Registrar Terminal'}
					</button>
				</div>
			</div>
		</div>
	);
};

