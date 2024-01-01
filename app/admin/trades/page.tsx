import { usersData } from "@/components/data/data";
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
}

export default function TradeHistories() {
	const history: any = [];

	usersData.forEach((data) => {
		data.tradingSession.forEach((tradingHistory) => {
			history.push({ ...tradingHistory, fullname: `${data.user.firstname} ${data.user.lastname}` });
		});
	});

	return (
		<>
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
										Status
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
											<p className="text-black dark:text-white">{userHistory.entry}</p>
										</td>
										<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
											<p className="text-black dark:text-white">{userHistory.stopLoss}</p>
										</td>
										<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
											<p className="text-black dark:text-white">{userHistory.takeProfit}</p>
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
										<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
											<p className="text-black dark:text-white">${userHistory.profit}</p>
										</td>
										<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
											<p className="text-black dark:text-white">{userHistory.date}</p>
										</td>

										<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
											<p
												className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
													userHistory.result === "Win"
														? "text-success bg-success"
														: userHistory.result === "Loss"
														? "text-danger bg-danger"
														: "text-warning bg-warning"
												}`}
											>
												{userHistory.result}
											</p>
										</td>

										<td className="border-b border-[#eee] py-5 px-4 flex items-center gap-x-2 dark:border-strokedark">
											<button className="w-[100px] rounded-md  bg-meta-3 text-white py-2 px-3 flex items-center justify-center  gap-x-2">
												<IoIosCheckmarkCircleOutline />
												Update
											</button>
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
