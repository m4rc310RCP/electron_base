import React, { useState } from 'react';
import { useAuth, useClock } from './hooks';
import {CgMenuGridR} from 'react-icons/cg';

import '../style.css';

export default () => {
	const { pbkdf2Key, signin, loading } = useAuth();
	const { sdate, inactiveApp } = useClock();
	const status = {
		false: 'bg-green-500',
		true: 'bg-yellow-500'
	} 

	return (
		<div>
			<button className='rounded-md m-2 bg-[#E14B4B] text-white'>
				<div className='flex flex-col text-xs p-1 h-24 '>
					<h1>Chicken Wings</h1>
					<div className='flex-1' />
					<div className='flex text-xs justify-between'>
						<p>-16</p>
						<p className='font-bold'>R$ 7,39</p>
					</div>
				</div>
			</button>
			<button
				className="p-1 pl-3 pr-3 bg-gray-400 rounded-md hover:bg-gray-500 text-gray-50 text-xs"
				onClick={() => {
					signin('mls', '..');
				}}
			>
				{loading ? 'Carregando...' : 'Login'}
			</button>
			<p className="text-xs">{sdate}</p>
			<div className={`rounded-full w-3 h-3 ${status[inactiveApp]}`} />
			<p className="text-xs">{inactiveApp?'Inactive':'Active'}</p>
			<p className="text-xs">{pbkdf2Key()}</p>
		</div>
	);
};
