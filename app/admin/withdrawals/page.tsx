import { usersData } from "@/components/data/data";
import { MdDeleteForever } from "react-icons/md";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

interface UserHistoryProps {
	amount: number;
	date: string;
	method: string;
	status: string;
	fullname: string;
}

export default function Withdrawals() {
	const history: any = [];

	usersData.forEach((data) => {
		data.widthdrawal.forEach((hist) => {
			history.push({ ...hist, fullname: `${data.user.firstname} ${data.user.lastname}` });
		});
	});

	return (
		<>
			{usersData?.length > 0 && (
				<div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
					<h2 className="font-bold text-xl mb-5">ALL USERS WITHDRAWALS</h2>
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
									<th className="min-w-[180px] py-4 px-4 font-medium text-black dark:text-white">
										Withdrawal Method
									</th>
									<th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white">
										Amount
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
											<p className="text-black dark:text-white">{userHistory.date}</p>
										</td>

										<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
											<p
												className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
													userHistory.status === "Completed"
														? "text-success bg-success"
														: userHistory.status === "Unpaid"
														? "text-danger bg-danger"
														: "text-warning bg-warning"
												}`}
											>
												{userHistory.status}
											</p>
										</td>
										{userHistory.status === "pending" && (
											<td className="border-b border-[#eee] py-5 px-4 flex items-center gap-x-2 dark:border-strokedark">
												<button className="w-[110px] rounded-md  bg-meta-3 text-white py-2 px-3 flex items-center justify-center  gap-x-2">
													<IoIosCheckmarkCircleOutline />
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
