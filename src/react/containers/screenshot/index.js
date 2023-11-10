import React, { useState, useEffect } from 'react';

import { useScreenshot } from '../../hooks';

export const MScreenshot = () => {
	const [selectionBox, setSelectionBox] = useState(null);
	const { setModeScreenshot } = useScreenshot();
	useEffect(() => {
		const handleKeyPress = (event) => {
			if (event.key === 'Escape') {
				setModeScreenshot(false);
			}
		};

		//electron.windowApi.setModeCaptureScreenshot(true);

		document.addEventListener('keydown', handleKeyPress);
		return () => {
			document.removeEventListener('keydown', handleKeyPress);
		};
	}, []);

	const handleMouseDown = (event) => {
		const sx = event.clientX;
		const sy = event.clientY;

		const handleMouseMove = (me) => {
			const width = me.clientX - sx;
			const height = me.clientY - sy;

			setSelectionBox({
				left: sx,
				top: sy,
				width,
				height,
			});
		};

		const handleMouseUp = (mu) => {
			document.removeEventListener('mousemove', handleMouseMove);
			document.removeEventListener('mouseup', handleMouseUp);

			if (selectionBox) {
				const { left, top, width, height } = selectionBox;
				console.log('Área selecionada:', { left, top, width, height });
			}
		};

		document.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('mouseup', handleMouseUp);
	};

	const handleModeCapture = () => {
		electron.windowApi.capture(selectionBox);
		console.log(`Capture`);
	};

	return (
		<div className="w-screen h-screen relative border-red-600 border ">
			{selectionBox && (
				<div
					style={{
						position: 'absolute',
						border: '1px dashed #007bff',
						backgroundColor: 'rgba(204, 229, 255, 0.5)',
						cursor: 'grab',
						pointerEvents: 'none',
						...selectionBox,
					}}
				>
					<h1 className="text-xs text-orange-300">{`x: ${selectionBox.left} y: ${selectionBox.top} w: ${selectionBox.width} h:${selectionBox.height}`}</h1>
				</div>
			)}
			<div className="w-full h-full" onMouseDown={handleMouseDown} onDoubleClick={() => handleModeCapture()}>
				{/* Conteúdo da área onde a seleção pode ocorrer */}
			</div>
		</div>
	);
};
