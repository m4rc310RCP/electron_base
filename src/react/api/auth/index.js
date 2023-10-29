import React from 'react';
import { v4 as uuidV4 } from 'uuid';
import CryptoJS from 'crypto-js';
import { useLazyQuery, gql, useQuery, useSubscription } from '@apollo/client';

const UUID_KEY   = 'uuid.key';
const APP_TOKEN  = 'app.token';
const SERVER_URL = 'server.url';

export const authenticate = (username, password, pbkdf2Key) => {
	const key = localStorage.getItem(UUID_KEY);
	if (key) {
	}

	const uuid = uuidV4();
	const request_id = 124345;
	const code = 1234;
	// localStorage.setItem(UUID_KEY, uuid);

	const roles = ["ADMIN","USER"];

	let data = {
		uuid,
		request_id,
		code,
		roles,
		credentials: `${username}:${password}`,
	};

	const chaveBytes = CryptoJS.enc.Base64.parse(pbkdf2Key());

	const textoCriptografado = CryptoJS.AES.encrypt(JSON.stringify(data), chaveBytes, {
		mode: CryptoJS.mode.ECB,
		padding: CryptoJS.pad.Pkcs7,
	}).toString();

	// const skey = CryptoJS.enc.Base64.stringify(mkey);
	// //console.log(skey)
	// data = CryptoJS.AES.encrypt("mls", pbkdf2Key).toString();
	// localStorage.setItem(APP_TOKEN, JSON.stringify(data));
	console.log('Texto criptografado no ReactJS: ' + textoCriptografado);
};

const QUERY_REQUEST_CODE = gql`
	query obterCodigo{
		OBTER_CODIGO
  	}
`;

const SUBS_REQUEST_CODE = gql`
	subscription subRegDevice{
		DISPOSITIVO(nr_parceiro:1){
			cd_registro ds_status 
		}
	}
`;

export const requestRegisterPos = ()=>{
	//localStorage.setItem(SERVER_URL, process.env.AUTH_URL);
	//const [getCode, {data, loading}] = useQuery(QUERY_REQUEST_CODE);
	// getCode();
	//console.log(process.env.AUTH_URL);
}
