import React from 'react';
import { v4 as uuidV4 } from 'uuid';
import CryptoJS from 'crypto-js';

const UUID_KEY = 'uuid.key';
const APP_TOKEN = 'app.token';

export const authenticate = (username, password, pbkdf2Key) => {
	const uuid = uuidV4();
	// localStorage.setItem(UUID_KEY, uuid);
	let data = {
		uuid,
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
