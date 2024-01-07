"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CardDataStats from "@/components/CardDataStats";
import WithdrawalTable from "@/components/Tables/WithdrawalTable";
import Modal from "@/components/modal/Modal";
import { useAppContext } from "@/hooks/useAppContext";
import { useUserContext } from "@/hooks/useUserContext";
import { ChangeEvent, FormEvent, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaInfoCircle, FaTimes } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";

export default function Withdrawal() {
	const [modalIsOpen, setModalIsOpen] = useState(false);

	const { state } = useAppContext();
	const { userDataState, updateWithdrawalHistory } = useUserContext();

	const [formData, setFormData] = useState({
		paymentMethod: "",
		amount: "",
		walletAddress: "",
		bankName: "",
		accountName: "",
		accountNumber: "",
	});

	const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const payload = {
			method: formData.paymentMethod,
			amount: formData.amount,
			status: "Pending",
			date: new Date().toDateString(),
			id: uuidv4(),
		};

		updateWithdrawalHistory(payload);

		toast.success(
			"You withdrawal request has been received. You will receive a confirmation via email!",
			{
				duration: 6000,
				position: "top-right",
				style: {
					padding: "16px",
					fontWeight: "bold",
					minWidth: "400px",
				},
				iconTheme: {
					primary: "#10B981",
					secondary: "#FFFF",
				},
			}
		);

		//
		setFormData({
			paymentMethod: "",
			amount: "",
			walletAddress: "",
			bankName: "",
			accountName: "",
			accountNumber: "",
		});
	};

	const closeModal = () => {
		setModalIsOpen(false);
	};

	return (
		<>
			<Breadcrumb pageName="Withdrawals" />
			<Toaster />
			<div className="grid xl:grid-cols-3 gap-y-8 xl:gap-y-0 xl:gap-x-10 mb-16">
				<CardDataStats title="Total Balance in Dollars" totalUsd={userDataState.totalBalance} />
				<CardDataStats
					title="Total Balance in Bitcoin"
					totalBtc={(userDataState.totalBalance / state.bitcoinRate).toFixed(8)}
				/>
				<CardDataStats
					title="Total Balance in Etherium"
					totalEth={(userDataState.totalBalance / state.ethereumRate).toFixed(8)}
				/>
			</div>
			<div className="mb-20 rounded-sm  xl:w-1/2 p-6  bg-white shadow-default  dark:bg-transparent">
				<div className="border-b border-stroke py-4 dark:border-strokedark">
					<h3 className="font-medium text-black dark:text-white">Withdrawal Transaction</h3>
				</div>
				<div>
					<p className="my-8">
						To make a withdrawal, Enter amount and verify the address you wish for payment to be
						made into.
					</p>
				</div>
				<form onSubmit={handleSubmit}>
					<div className="">
						<div className="mb-5">
							<label className="mb-3 block text-black dark:text-white">
								Account To Withdraw from
							</label>
							<input
								type="text"
								readOnly
								value="Withdraw from Account Balance"
								className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-meta-3 active:border-meta-3 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-meta-3"
							/>
						</div>

						<div className="mb-5">
							<label className="mb-3 block text-black dark:text-white">Select Payment Method</label>
							<div className="bg-white dark:bg-form-input mb-3">
								<select
									value={formData.paymentMethod}
									name="paymentMethod"
									onChange={handleInputChange}
									required
									className="z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-meta-3 active:border-meta-3 dark:border-form-strokedark dark:bg-form-input"
								>
									<option value="">Select Payment Method</option>
									<option value="Bitcoin">Bitcoin</option>
									<option value="Ethereum">Ethereum</option>
									<option value="Bank Transfer">Bank Transfer</option>
								</select>
							</div>
						</div>
						<div className="mb-5">
							<label className="mb-3 block text-black dark:text-white">Amount</label>
							<input
								value={formData.amount}
								name="amount"
								onChange={handleInputChange}
								required
								type="text"
								placeholder="500"
								className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-meta-3 active:border-meta-3 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-meta-3"
							/>
						</div>
						{(formData.paymentMethod === "Bitcoin" || formData.paymentMethod === "Ethereum") && (
							<div>
								<div className="mb-5">
									<label className="mb-3 block text-black dark:text-white">Wallet Address</label>
									<input
										type="text"
										name="walletAddress"
										value={formData.walletAddress}
										onChange={handleInputChange}
										placeholder="Wallet Address"
										className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-meta-3 active:border-meta-3 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-meta-3"
									/>
								</div>
							</div>
						)}

						{formData.paymentMethod === "Bank Transfer" && (
							<div>
								<div className="mb-5">
									<label className="mb-3 block text-black dark:text-white">Bank Name</label>
									<input
										type="text"
										value={formData.bankName}
										name="bankName"
										onChange={handleInputChange}
										placeholder="Chase Bank"
										className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-meta-3 active:border-meta-3 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-meta-3"
									/>
								</div>
								<div className="mb-5">
									<label className="mb-3 block text-black dark:text-white">Account Name</label>
									<input
										type="text"
										value={formData.accountName}
										name="accountName"
										onChange={handleInputChange}
										placeholder="Benjamin Chad"
										className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-meta-3 active:border-meta-3 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-meta-3"
									/>
								</div>
								<div className="mb-5">
									<label className="mb-3 block text-black dark:text-white">Account Number</label>
									<input
										type="text"
										value={formData.accountNumber}
										name="accountNumber"
										onChange={handleInputChange}
										placeholder="001578903344"
										className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-meta-3 active:border-meta-3 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-meta-3"
									/>
								</div>
							</div>
						)}

						<button className="flex w-full justify-center rounded bg-meta-3 p-3 font-medium text-gray">
							Withdraw
						</button>
					</div>
				</form>
			</div>

			<WithdrawalTable />
		</>
	);
}
