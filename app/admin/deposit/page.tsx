"use client";
// import { usersData } from "@/components/data/data";
import { MdDeleteForever } from "react-icons/md";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { useAdminContext } from "@/hooks/useAdminContext";
import { useState } from "react";
import loader from "@/public/images/icon/spinner.svg";
import Image from "next/image";

interface UserHistoryProps {
	amount: number;
	date: string;
	method: string;
	status: string;
	fullname: string;
	id: string;
	userId: string;
}

export default function Deposits() {
	const { usersData, updateDeposit } = useAdminContext();
	const [loading, setLoading] = useState(false);

	const history: any = [];

	usersData.forEach((data: any) => {
		data.depositHistory.forEach((hist: any) => {
			history.push({
				...hist,
				fullname: `${data.user.firstname} ${data.user.lastname}`,
				userId: data.userId,
			});
		});
	});

	const handleUpdateDepositStatus = (userId: string, id: string) => {
		let success = false;
		setLoading(true);

		setTimeout(() => {
			if (updateDeposit(userId, id)) {
				success = true;
			}
		}, 1000);

		setTimeout(() => {
			if (success) {
				setLoading(false);
			}
		}, 500);
	};

	return (
		<>
			{usersData?.length > 0 && (
				<div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
					<h2 className="font-bold text-xl mb-5">ALL USERS DEPOSITS</h2>
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
										Payment Method
									</th>
									<th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white">
										Amount
									</th>
									<th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white">
										Screenshot
									</th>
									<th className="min-w-[160px] py-4 px-4 font-medium text-black dark:text-white">
										Date
									</th>
									<th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
										Status
									</th>
									<th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
										Action
									</th>
								</tr>
							</thead>
							<tbody>
								{history.map((userHistory: UserHistoryProps, key: number) => (
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
											<p className="text-black dark:text-white">{userHistory.method}</p>
										</td>
										<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
											<p className="text-black dark:text-white">${userHistory.amount}</p>
										</td>
										<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
											<p className="text-black dark:text-white">Screenshot</p>
										</td>
										<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
											<p className="text-black dark:text-white">{userHistory.date}</p>
										</td>

										<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
											<p
												className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
													userHistory.status === "Completed"
														? "text-success bg-success"
														: "text-warning bg-warning"
												}`}
											>
												{userHistory.status}
											</p>
										</td>
										{userHistory.status === "Pending" && (
											<td className="border-b border-[#eee] py-5 px-4 flex items-center gap-x-2 dark:border-strokedark">
												<button
													onClick={() =>
														handleUpdateDepositStatus(userHistory.userId, userHistory.id)
													}
													className="w-[110px] rounded-md  bg-meta-3 text-white py-2 px-3 flex items-center justify-center  gap-x-2"
												>
													{loading ? (
														<Image src={loader} alt="loading icon" height={20} width={20} />
													) : (
														<IoIosCheckmarkCircleOutline />
													)}
													Approve
												</button>
												<button className="w-[110px] rounded-md  bg-danger text-white py-2 px-3 flex items-center justify-center  gap-x-2">
													<MdDeleteForever />
													Remove
												</button>
											</td>
										)}
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
