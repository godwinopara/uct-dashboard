"use client";
import { ReactNode } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
	children: ReactNode;
	modalIsOpen: boolean;
}

const Modal = ({ modalIsOpen, children }: ModalProps) => {
	return createPortal(
		<>
			{modalIsOpen && (
				<div className="fixed inset-0 flex items-center justify-center dark:text-white">
					<div className="bg-black bg-opacity-70 absolute inset-0"></div>
					<div className="relative  bg-white dark:bg-boxdark-2 rounded-lg p-6  max-w-[600px] mx-auto">
						{children}
					</div>
				</div>
			)}
		</>,
		document.body
	);
};

export default Modal;
