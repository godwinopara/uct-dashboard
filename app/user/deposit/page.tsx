"use client";

import DepositTable from "@/components/Tables/DepositTable";
import Modal from "@/components/modal/Modal";
import { useUserContext } from "@/hooks/useUserContext";
import { FormData } from "@/types/formdata";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { ChangeEvent, FormEvent, useState } from "react";
import { FaInfoCircle, FaTimes } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import { storage } from "@/config/firebase";

export default function Deposit() {
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [notificationModalIsOpen, setNotificationModalIsOpen] = useState(false);
	const [formData, setFormData] = useState<FormData>({
		paymentMethod: "",
		amount: "",
		paymentReceipt: null,
	});

	const { updateDepositHistory } = useUserContext();

	const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files ? e.target.files[0] : null;
		const storageRef = ref(storage, `payment_receipt/${file?.name}`);
		await uploadBytes(storageRef, file as Blob);

		const imgUrl = await getDownloadURL(storageRef);
		setFormData((prevData) => ({
			...prevData,
			paymentReceipt: imgUrl,
		}));
	};

	const closeModal = () => {
		setModalIsOpen(false);
	};

	const closeNotificationModal = () => {
		setNotificationModalIsOpen(false);
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const payload = {
			method: formData.paymentMethod,
			amount: formData.amount,
			status: "Pending",
			id: uuidv4(),
			screenshot: formData.paymentReceipt,
			date: new Date().toDateString(),
		};

		if (formData.paymentReceipt) {
			updateDepositHistory(payload);
			closeModal();
			setNotificationModalIsOpen(true);
		}
	};
	return (
		<div>
			<Modal modalIsOpen={notificationModalIsOpen}>
				<div className="mt-14 md:mt-0 flex items-center justify-between mb-5 overflow-auto">
					<h3 className="text-xl font-bold">Transaction Notification</h3>
					<button
						className="dark:text-white text-xl border border-black"
						onClick={closeNotificationModal}
					>
						<FaTimes />
					</button>
				</div>
				<div className="flex items-center gap-x-5">
					<div className="text-3xl text-meta-3">
						<FaInfoCircle />
					</div>
					<p className="text-meta-3 text-lg">
						You Deposit has been received. You will receive a confirmation via email!
					</p>
				</div>
			</Modal>
			<Modal modalIsOpen={modalIsOpen}>
				<div className="mt-14 md:mt-0 flex items-center justify-between mb-5 overflow-auto">
					<h3 className="text-xl font-bold">Submit Notification for Deposit</h3>
					<button className="dark:text-white text-xl border border-black" onClick={closeModal}>
						<FaTimes />
					</button>
				</div>
				<p className="text-sm italic mb-8">
					To deposit, please choose the payment method at the Payment Methods panel and make the
					payment. After completing the payment come back here and fill the deposit notification
					form.
				</p>
				<form onSubmit={handleSubmit}>
					<div className="relative z-20 bg-transparent mb-4">
						<label className="mb-2.5 block text-black dark:text-white">Select Payment Method</label>
						<select
							name="paymentMethod"
							value={formData.paymentMethod}
							required
							onChange={handleInputChange}
							className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-meta-3 active:border-meta-3 dark:border-form-strokedark dark:bg-form-input dark:focus:border-meta-3"
						>
							<option value="">Select Payment</option>
							<option value="Bitcoin">Bitcoin Payment</option>
							<option value="Ethereum">Ethereum Payment</option>
						</select>
					</div>
					<div className="relative z-20 bg-transparent mb-4">
						<label className="mb-2.5 block text-black dark:text-white">Amount In Dollar($)</label>
						<input
							type="text"
							placeholder="5000"
							name="amount"
							required
							value={formData.amount}
							onChange={handleInputChange}
							className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-meta-3 active:border-meta-3 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-meta-3"
						/>
					</div>
					<div className="mb-8">
						<label className="mb-3 block text-black dark:text-white">Upload Payment Receipt</label>
						<input
							type="file"
							name="paymentReceipt"
							required
							onChange={handleFileChange}
							className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-meta-3 file:hover:bg-opacity-10 focus:border-meta-3 active:border-meta-3 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-meta-3"
						/>
					</div>

					<button
						type="submit"
						className="inline-flex items-center justify-center rounded-md bg-meta-3 w-full py-3 px-10 text-center font-medium text-black hover:bg-opacity-90 lg:px-8 xl:px-10"
					>
						Notify for Deposit
					</button>
				</form>
			</Modal>
			<div>
				<div className="mb-10 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
					<div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
						<h3 className="font-medium text-black dark:text-white">DEPOSIT USING BITCOIN</h3>
					</div>
					<div className="p-6.5">
						<div className="mb-4.5">
							<label className="mb-2.5 block text-black dark:text-white">BITCOIN WALLET</label>
							<input
								type="text"
								readOnly
								value="1A1zP1eP5QGefi2DMPVsLCrSVfgCv"
								className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-meta-3 active:border-meta-3 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-meta-3"
							/>
						</div>
					</div>
				</div>
				<div className="mb-5 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
					<div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
						<h3 className="font-medium text-black dark:text-white">DEPOSIT USING ETHEREUM</h3>
					</div>
					<div className="p-6.5">
						<div className="mb-4.5">
							<label className="mb-2.5 block text-black dark:text-white">ETHEREUM WALLET</label>
							<input
								type="text"
								readOnly
								value="1A1zP1eP5QGefi2DMPVsLCrSVfgCv"
								className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-meta-3 active:border-meta-3 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-meta-3"
							/>
						</div>
					</div>
				</div>

				<button
					className="flex w-full justify-center rounded bg-meta-3 p-3 font-medium text-gray"
					onClick={() => setModalIsOpen(true)}
				>
					Notify Payment
				</button>

				<br />
				<DepositTable />
			</div>
		</div>
	);
}
