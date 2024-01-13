"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import { useAdminContext } from "@/hooks/useAdminContext";
import Modal from "@/components/Modals/Modal";
import toast, { Toaster } from "react-hot-toast";
import UploadButton3 from "@/components/UploadButtons/UploadButton3";

export default function Account() {
	const { usersData, updateBalance } = useAdminContext();

	const [showModal, setShowModal] = useState(false);
	const [accountInput, setAccountInput] = useState({ balance: "", profit: "", bonus: "" });
	const [userId, setUserId] = useState("");
	const [loading, setLoading] = useState<{ [currentUserId: string]: boolean }>({});

	const closeModal = () => {
		setShowModal(false);
	};

	const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		setAccountInput((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setLoading((prevLoading) => ({ ...prevLoading, [userId]: true }));

		setTimeout(() => {
			try {
				updateBalance(userId, accountInput);
			} catch (error) {
				console.log(error);
			} finally {
				setLoading((prevLoading) => ({ ...prevLoading, [userId]: false }));
				toast.success("Account Balance was updated Successfully", {
					duration: 6000,
					position: "top-center",
					style: {
						padding: "16px",
						fontWeight: "bold",
						minWidth: "300px",
					},
					iconTheme: {
						primary: "#10B981",
						secondary: "#FFFF",
					},
				});
			}
		}, 1000);

		closeModal();
	};

	const handleClickToggleModal = (user: any, balance: string, profit: string, bonus: string) => {
		setShowModal(true);
		setUserId(user);
		setAccountInput((prev) => {
			return { ...prev, balance, profit, bonus };
		});
	};

	return (
		<>
			<Toaster />
			<Modal
				show={showModal}
				closeModal={closeModal}
				title="Update Balance"
				width={500}
				height={500}
			>
				<form onSubmit={handleSubmit}>
					<div className="mb-5 mt-10">
						<label className="mb-2.5 block font-medium text-black">Account Balance</label>
						<div className="relative">
							<input
								type="text"
								name="balance"
								required
								value={accountInput.balance}
								onChange={handleInputChange}
								placeholder="Balance"
								className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none"
							/>
						</div>
					</div>
					<div className="mb-5">
						<label className="mb-2.5 block font-medium text-black">Profit</label>
						<div className="relative">
							<input
								type="text"
								name="profit"
								required
								value={accountInput.profit}
								onChange={handleInputChange}
								placeholder="Profit"
								className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none"
							/>
						</div>
					</div>
					<div>
						<label className="mb-2.5 block font-medium text-black">Bonus</label>
						<div className="relative">
							<input
								type="text"
								name="bonus"
								required
								value={accountInput.bonus}
								onChange={handleInputChange}
								placeholder="Bonus"
								className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none"
							/>
						</div>
					</div>
					<div className="flex gap-x-4 mt-8">
						<button
							className="bg-meta-3 flex justify-center items-center text-white rounded-md font-medium px-8 py-2"
							type="submit"
						>
							Update
						</button>
						<button
							onClick={closeModal}
							className="bg-danger flex justify-center items-center text-white rounded-md font-medium px-8 py-2"
						>
							Close
						</button>
					</div>
				</form>
			</Modal>
			{usersData?.length > 0 && (
				<div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
					<h2 className="font-bold text-xl mb-5">ALL USERS ACCOUNT BALANCE</h2>
					<div className="max-w-full overflow-x-auto">
						<table className="w-full table-auto">
							<thead>
								<tr className="bg-gray-2 text-left dark:bg-meta-4">
									<th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white">
										S/N
									</th>
									<th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
										Fullname
									</th>
									<th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white">
										Balance
									</th>
									<th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white">
										Profit
									</th>
									<th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white">
										Bonus
									</th>
									<th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
										Action
									</th>
								</tr>
							</thead>
							<tbody>
								{usersData.map((userItem: any, key: number) => (
									<tr key={key}>
										<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
											<h5 className="text-black  dark:text-white">{key + 1}</h5>
										</td>
										<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
											<h5 className="font-medium text-black dark:text-white">
												{userItem.user.firstname} {userItem.user.lastname}
											</h5>
										</td>

										<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
											<p className="text-black dark:text-white">${userItem.totalBalance}</p>
										</td>
										<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
											<p className="text-black dark:text-white">${userItem.totalProfit}</p>
										</td>
										<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
											<p className="text-black dark:text-white">${userItem.totalBonus}</p>
										</td>

										<td className="border-b border-[#eee] py-5 px-4 flex items-center gap-x-2 dark:border-strokedark">
											<UploadButton3
												approveBtnClick={handleClickToggleModal}
												userId={userItem.userId}
												loading={loading[userItem.userId] || false}
												btnText="Update Account"
												balance={userItem.totalBalance}
												profit={userItem.totalProfit}
												bonus={userItem.totalBonus}
											/>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			)}
		</>
	);
}
