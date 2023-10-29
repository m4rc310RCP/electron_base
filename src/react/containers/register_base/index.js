import React, { useState } from 'react';

export const MPosRegister = () => {
	const [code, setCode] = useState('');
	const [disabled, setDisabled] = useState(true);

	return (
		<div className="flex w-scren h-screen items-center justify-center bg-zinc-700">
			<div className="grid  w-96 p-3 bg-slate-400">
				<p>Solicite ao seu administrador a geração de um código de acesso em outro terminal.</p>

				<input
					type="text"
					maxLength={5}
					value={code}
					onChange={(e) => {
						const res = e.target.value.toUpperCase();
						setDisabled(res.length < 5);
						setCode(res);
					}}
				/>

				<button disabled={disabled}>Validar Código Acesso</button>
			</div>
		</div>
	);
};

