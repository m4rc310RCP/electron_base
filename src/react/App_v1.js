import React, { useRef, useState } from 'react';
import { useAuth, useClock, useSales } from './hooks';
import { Modal, Ticket } from './components';

import '../style.css';
import { useLazyQuery, gql, useSubscription, useMutation } from '@apollo/client';
import html2canvas from 'html2canvas';

const MButton = ({ id, description, value }) => {
	const status = {
		false: 'bg-green-500',
		true: 'bg-yellow-500',
	};

	const fvalue = new Intl.NumberFormat('pt-BR', {
		style: 'currency',
		currency: 'BRL', // Código da moeda (BRL para Real Brasileiro)
		minimumFractionDigits: 2, // Mínimo de casas decimais
	}).format(value);

	return (
		<button className="rounded-md bg-[#E14B4B]  text-white">
			<div className="flex flex-col text-xs h-20 p-1 ">
				<h1>{description}</h1>
				<div className="flex-1" />
				<div className="flex text-xs justify-between">
					<p>#{id}</p>
					<div className="w-10 min-w-24" />
					<p className="font-bold">{fvalue}</p>
				</div>
			</div>
		</button>
	);
};



const SUBS_REQUEST_CODE = gql`
	subscription subRegDevice($nr_parceiro: Long){
		DISPOSITIVO(nr_parceiro: $nr_parceiro){
			cd_registro ds_status 
		}
	}
`;




const MRequestCode = ({ closeModal }) => {
	const MUTA_REQUEST_CODE = gql`
		mutation registerDevice($nr_parceiro: Long) {
			REGISTRO_DISPOSITIVO(nr_parceiro:$nr_parceiro){
			cd_registro
			}
		}
	`;

	const MUTA_TEST = gql`
		mutation{
			SALVAR_PF(Pessoa_fisica:{nr_cpfcnpj:"03057532900", nm_pessoa:"Marcelo"}){
		  		nm_pessoa
			}
	 	 }
	`;



	//const {data} = useSubscription(SUBS_REQUEST_CODE, {variables:{nr_parceiro:1}});
	const [requestCodeHandle, {data, loading}] = useMutation(MUTA_TEST);

	return (
		<div className="p-2 grid grid-flow-row place-items-center">
			<h1>Solicitar Código de Registro de Terminal</h1>
			<code className="px-7 m-5 bg-gray-100 py-2 text-gray-600">
				<button className="bg-gray-500" onClick={()=>(requestCodeHandle())} >Obter Código</button>
				{loading&&<h1>Carregando...</h1>}
				{/* {data&&<h1>{data?.REGISTRO_DISPOSITIVO.cd_registro}</h1>} */}
			</code>
			<div className="inline-flex gap-2">
				<button className="bg-gray-500 rounded-md text-white px-4 py-2" onClick={() => closeModal()}>
					Cancelar
				</button>
			</div>
		</div>
	);
};

const Main = () => {
	const { signin, requestRegisterPos, loading } = useAuth();
	const { sdate, inactiveApp } = useClock();
	const { findAllProducts } = useSales();
	const [isOpen, setIsOpen] = useState(false);

	const openModal = () => {
		setIsOpen(true);
	};

	const closeModal = () => {
		setIsOpen(false);
	};

	const ticketData = {
		name:'MML - Product',
		price: '$10.0'
	}

	const ticketRef = useRef(null);
	const handleSendTiket = () => {
		const ticket = ticketRef.current;
		// html2canvas(ticket).then((canvas)=>{
		// 	const imgurl = canvas.toDataURL();
		// 	console.log(imgurl);
		// })
		console.log(ticket)
	}

	return (
		<div>
			<Modal isOpen={isOpen} close={() => closeModal()}>
				<MRequestCode closeModal={closeModal} />
			</Modal>

			<div className="grid grid-cols-3 gap-1 overflow-x-auto min-w-96">
				{findAllProducts.map((item) => (
					<MButton key={item.id} {...item} />
				))}
			</div>
			<button
				className="p-1 pl-3 pr-3 bg-gray-400 rounded-md hover:bg-gray-500 text-gray-50 text-xs"
				onClick={() => {
					//signin('mls', 'm4rc310');
					openModal();
				}}
			>
				{loading ? 'Carregando...' : 'Login'}
			</button>
			<p className="text-xs">{sdate}</p>
			<div className={`rounded-full w-3 h-3 ${status[inactiveApp]}`} />
			<p className="text-xs">{inactiveApp ? 'Inactive' : 'Active'}</p>
			<div className='grid' ref={ticketRef}>
				<Ticket  ticketData={ticketData}/>
				<button onClick={() => handleSendTiket()}>Send</button>
			</div>
		</div>
	);
}

export default () => {
	return (<Main />);
};
