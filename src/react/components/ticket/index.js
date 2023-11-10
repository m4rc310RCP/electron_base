import React, { useRef, useEffect, useState } from 'react';
import QRCode from 'qrcode.react';

export const Ticket = ({ ticketData }) => {
	const canvasRef = useRef(null);
	const [ticketImage, setTicketImage] = useState('');

	// useEffect(() => {
	//   const canvas = canvasRef.current;
	//   const ctx = canvas.getContext("2d");

	//   // Lógica para desenhar o tíquete no canvas
	//   ctx.fillStyle = "white";
	//   ctx.fillRect(0, 0, canvas.width, canvas.height);
	//   ctx.font = "16px Arial";
	//   ctx.fillText(`Nome: ${ticketData.name}`, 20, 30);
	//   ctx.fillText(`Preço: ${ticketData.price}`, 20, 50);

	//   // Renderiza o QR Code no canvas usando a biblioteca qrcode.react
	//   const qrCodeDataUrl = canvas.toDataURL();
	//   setTicketImage(qrCodeDataUrl);
	// }, [ticketData]);

	// const handlePrintTicket = () => {
	//   // Agora, ticketImage contém a representação visual do tíquete como uma string de dados (data URL)
	//   // Você pode enviar ticketImage para o servidor via GraphQL para impressão
	//   console.log("Imagem do tíquete:", ticketImage);
	// };

	return (
		<div className="grid p-3 bg-gray-300">
			<h2>Ticket</h2>
			<p>Nome: {ticketData.name}</p>
			<p>Preço: {ticketData.price}</p>
			<QRCode value={ticketData.barcodeData} />
			{/* Adicione mais elementos conforme necessário */}
		</div>
	);
};
