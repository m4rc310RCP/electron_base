import React from 'react';

//==== Modal =====/
export const Modal = ({ isOpen, close, children }) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center z-50">
			<div className="modal-overlay fixed inset-0 bg-black opacity-50"></div>
			<div className="modal-container bg-white w-96 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
				<div className="modal-content p-0">
					{/* <span className="modal-close cursor-pointer" onClick={close}>
						&times;
					</span> */}
					{children}
				</div>
			</div>
		</div>
	);
};
//==== Modal =====/
