import { Trade } from "@/types/trade";
import { useAppContext } from "@/hooks/useAppContext";
import { useUserContext } from "@/hooks/useUserContext";

const TableThree = () => {
	const { state } = useAppContext();

	// const { userStateData } = useUserContext();
	const userDataState = {
		totalBalance: 10000,
		totalProfit: 5000,
		totalBonus: 800,
		tradingSession: [],
		firstname: "Franklin",
		lastname: "Doge",
	};

	return (
		<>
			{userDataState.tradingSession.length > 0 && (
				<div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
					<h2 className="font-bold text-xl mb-5">Latest Trades</h2>
					<div className="max-w-full overflow-x-auto">
						<table className="w-full table-auto">
							<thead>
								<tr className="bg-gray-2 text-left dark:bg-meta-4">
									<th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white">
										Options
									</th>
									<th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white">
										Type
									</th>
									<th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white">
										Pair
									</th>
									<th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
										Amount
									</th>
									<th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white">
										Size
									</th>
									<th className="min-w-[80px] py-4 px-4 font-medium text-black dark:text-white">
										T-Profit
									</th>
									<th className="min-w-[80px] py-4 px-4 font-medium text-black dark:text-white">
										S-Loss
									</th>
									<th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
										Profit
									</th>
									<th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
										Status
									</th>
								</tr>
							</thead>
							<tbody>
								{userDataState.tradingSession.map((tradeItem: Trade, key: number) => (
									<tr key={key}>
										<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
											<h5 className="text-black  dark:text-white">{tradeItem.tradeType}</h5>
										</td>
										<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
											<h5 className="font-medium text-black dark:text-white">
												{tradeItem.tradeOption}
											</h5>
										</td>
										<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
											<h5 className="font-medium text-black dark:text-white">{tradeItem.pairs}</h5>
										</td>
										<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
											<p className="text-black dark:text-white">${tradeItem.amount}</p>
										</td>
										<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
											<p className="text-black dark:text-white">{tradeItem.lotSize}</p>
										</td>
										<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
											<p className="text-black dark:text-white">{tradeItem.takeProfit}</p>
										</td>
										<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
											<p className="text-black dark:text-white">{tradeItem.stopLoss}</p>
										</td>
										<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
											<p className="text-black dark:text-white">{tradeItem.profit}</p>
										</td>

										<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
											<p
												className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
													tradeItem.status === "Paid"
														? "text-success bg-success"
														: tradeItem.status === "Unpaid"
														? "text-danger bg-danger"
														: "text-warning bg-warning"
												}`}
											>
												{tradeItem.status}
											</p>
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
};

export default TableThree;
