"use client";

import Modal from "@/components/Modals/Modal";
import UploadButton from "@/components/UploadButtons/UploadButton";
import { useAdminContext } from "@/hooks/useAdminContext";
import { ChangeEvent, FormEvent, useState } from "react";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

interface UserTradeHistoriesProps {
	fullname: string;
	tradeType: string;
	tradeOption: string;
	pairs: string;
	lotSize: string;
	entry: string;
	stopLoss: string;
	takeProfit: string;
	profit: string;
	status: string;
	result: string;
	date: string;
	userId: string;
	id: string;
}

export default function TradeHistories() {
	const { usersData, updateTrade } = useAdminContext();

	const [loading, setLoading] = useState<{ [id: string]: boolean }>({});
	const [showModal, setShowModal] = useState(false);
	const [userId, setUserId] = useState("");
	const [tradeId, setTradeId] = useState("");
	const [updateTradeStatus, setUpdateTradeState] = useState({
		profit: "",
		status: "",
	});

	const history: any = [];

	usersData.forEach((data: any) => {
		data.tradingSession.forEach((tradingHistory: any) => {
			history.push({
				...tradingHistory,
				fullname: `${data.user.firstname} ${data.user.lastname}`,
				userId: data.userId,
			});
		});
	});

	const closeModal = () => {
		setShowModal(false);
	};

	const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		setUpdateTradeState((prev) => ({ ...prev, [name]: value }));
	};

	const handleShowModal = (userId: string, id: string) => {
		setShowModal(true);
		setUserId(userId);
		setTradeId(id);
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const data = {
			profit: updateTradeStatus.profit,
			status: updateTradeStatus.status,
		};

		setLoading((prevLoading) => ({ ...prevLoading, [tradeId]: true }));

		setTimeout(() => {
			try {
				updateTrade(userId, data, tradeId);
			} catch (error) {
				console.log(error);
			} finally {
				setLoading((prevLoading) => ({ ...prevLoading, [tradeId]: false }));
			}
		}, 1000);

		closeModal();
	};

	return (
		<>
			<Modal
				show={showModal}
				closeModal={closeModal}
				title="Update Trade Session"
				width={500}
				height={380}
			>
				<form onSubmit={handleSubmit}>
					<div className="mb-5 mt-10">
						<label className="mb-2.5 block font-medium text-black">Profit</label>
						<div className="relative">
							<input
								type="text"
								name="profit"
								required
								value={updateTradeStatus.profit}
								onChange={handleInputChange}
								placeholder="Profit"
								className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none"
							/>
						</div>
					</div>
					<div className="w-full relative z-20 bg-transparent mb-4">
						<label className="mb-2.5 block text-black">Trade Status</label>
						<select
							name="status"
							required
							value={updateTradeStatus.status}
							onChange={handleInputChange}
							className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-meta-3 active:border-meta-3"
						>
							<option value="">Trade Status</option>
							<option value="Pending">Pending</option>
							<option value="Win">Win</option>
							<option value="Loss">Loss</option>
						</select>
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
					<h2 className="font-bold text-xl mb-5">ALL TRADES SESSIONS</h2>
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
									<th className="min-w-[160px] py-4 px-4 font-medium text-black dark:text-white">
										Trade Type
									</th>
									<th className="min-w-[130px] py-4 px-4 font-medium text-black dark:text-white">
										Trade Option
									</th>
									<th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
										Pairs
									</th>
									<th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white">
										Lot Size
									</th>
									<th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
										Entry Price
									</th>
									<th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
										Stop Loss
									</th>
									<th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
										Take Profit
									</th>

									<th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white">
										Profit
									</th>
									<th className="min-w-[160px] py-4 px-4 font-medium text-black dark:text-white">
										Date
									</th>
									<th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white">
										Result
									</th>
									<th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
										Action
									</th>
								</tr>
							</thead>
							<tbody>
								{history.map((userHistory: UserTradeHistoriesProps, key: number) => (
									<tr key={key}>
										<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
											<h5 className="text-black  dark:text-white">{key + 1}</h5>
										</td>
										<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
											<h5 className="font-medium text-black dark:text-white">
												{userHistory.fullname}
											</h5>
										</td>

										<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
											<p className="text-black dark:text-white">{userHistory.tradeType}</p>
										</td>
										<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
											<p className="text-black dark:text-white">{userHistory.tradeOption}</p>
										</td>
										<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
											<p className="text-black dark:text-white">{userHistory.pairs}</p>
										</td>
										<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
											<p className="text-black dark:text-white">{userHistory.lotSize}</p>
										</td>
										<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
											<p className="text-black dark:text-white">${userHistory.entry}</p>
										</td>
										<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
											<p className="text-black dark:text-white">{userHistory.stopLoss}</p>
										</td>
										<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
											<p className="text-black dark:text-white">{userHistory.takeProfit}</p>
										</td>

										<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
											<p className="text-black dark:text-white">${userHistory.profit}</p>
										</td>
										<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
											<p className="text-black dark:text-white">{userHistory.date}</p>
										</td>

										<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
											<p
												className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
													userHistory.status === "Win"
														? "text-success bg-success"
														: userHistory.result === "Loss"
														? "text-danger bg-danger"
														: "text-warning bg-warning"
												}`}
											>
												{userHistory.status}
											</p>
										</td>

										<td className="border-b border-[#eee] py-5 px-4 flex items-center gap-x-2 dark:border-strokedark">
											<UploadButton
												approveBtnClick={handleShowModal}
												userId={userHistory.userId}
												id={userHistory.id}
												loading={loading[userHistory.id] || false}
												btnText="Approve"
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
