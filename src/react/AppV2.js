import React, { useState } from 'react';
import { gql, useMutation, useSubscription } from '@apollo/client';
import { Modal} from './components';
import { useStatusBar } from './hooks';

import '../style.css';

const MUTA_REQUEST_CODE = gql`
	mutation registerDevice($nr_parceiro: Long) {
		REGISTRO_DISPOSITIVO(nr_parceiro: $nr_parceiro) {
			cd_registro
		}
	}
`;

const MUTA_TEST = gql`
	mutation {
		SALVAR_PF(Pessoa_fisica: { nr_cpfcnpj: "03057532900", nm_pessoa: "Marcelo" }) {
			nm_pessoa
		}
	}
`;

const S_DISPOSITIVO = gql`
	subscription sub_dispositivo {
		testPublish(id: "A") {
			cd_registro
		}
	}
`;

const ModalRequestRegistryDevice = ({close}) =>{
	const { updateMessage } = useStatusBar();
    return (
        <div className="p-3 grid gap-5shadow-lg ml-auto mr-auto gap-7 text-white place-items-center text-xs">
			<h1 className='text-sm text-indigo-600'>Ao clicar no botão abaixo, um código de registro será gerado. Digite este código no Terminal que deseja registar para completar o processo.</h1>
            <button className=" bg-slate-500 py-2 px-6 rounded-md" onClick={()=>updateMessage('Gerando código de acesso!')} >Gerar Código de Registro</button>
            <button className="  bg-slate-500 py-2 px-6 rounded-md" onClick={()=>close()}>Sair</button>
        </div>
    );
}

const Main = () => {
	const [numberRegister, setNumberRegister] = useState(undefined);
	const [isSkip, setIsSkip] = useState(true);
	const [isOpen, setOpen] = useState(false);
	const { updateMessage } = useStatusBar();


	const [requestCodeHandler, { loading }] = useMutation(MUTA_REQUEST_CODE, {
		onCompleted: (data) => {
			setNumberRegister(data?.REGISTRO_DISPOSITIVO?.cd_registro);
		},
	});

	useSubscription(S_DISPOSITIVO, {
		variables: {},
		skip: isSkip,
		onSubscriptionData: (data) => {
			console.log(`Data: ${data}`);
		},
	});

	const handleModal = () => {
		updateMessage('Testando o status bar...')
        setOpen(!isOpen);
    };

	return (
		<div>
			<Modal isOpen={isOpen} close={() => handleModal()} >
				<ModalRequestRegistryDevice close={handleModal} />
			</Modal>

			<button onClick={() => handleModal()}>Connect Sub</button>
			<button onClick={() => requestCodeHandler({ variables: { nr_parceiro: 1 } })}>
				{loading ? 'Carregando...' : numberRegister ? numberRegister : 'Obter Registro'}
			</button>
		</div>
	);
};

export default () => {
	return <Main />;
};

