import { useUserContext } from "@/hooks/useUserContext";
import { Deposit } from "@/types/deposit";

const DepositTable = () => {
	const { userDataState } = useUserContext();

	return (
		<>
			{userDataState.depositHistory && (
				<div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
					<h2 className="font-bold text-xl mb-5">Deposit History</h2>
					<div className="max-w-full overflow-x-auto">
						<table className="w-full table-auto">
							<thead>
								<tr className="bg-gray-2 text-left dark:bg-meta-4">
									<th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white">
										Method
									</th>
									<th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white">
										Amount
									</th>

									<th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
										Status
									</th>
									<th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white">
										Date
									</th>
								</tr>
							</thead>
							<tbody>
								{userDataState.depositHistory.length > 0 &&
									userDataState.depositHistory.map((depositItem: Deposit, key: number) => (
										<tr key={key}>
											<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
												<h5 className="text-black  dark:text-white">{depositItem.method}</h5>
											</td>
											<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
												<h5 className="font-medium text-black dark:text-white">
													${depositItem.amount}
												</h5>
											</td>
											<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
												<p
													className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
														depositItem.status === "Completed"
															? "text-success bg-success"
															: depositItem.status === "UnCompleted"
															? "text-danger bg-danger"
															: "text-warning bg-warning"
													}`}
												>
													{depositItem.status}
												</p>
											</td>
											<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
												<h5 className="font-medium text-black dark:text-white">
													{depositItem.date}
												</h5>
											</td>
										</tr>
									))}
							</tbody>
						</table>
						{userDataState.depositHistory.length < 1 && (
							<p className="text-center mt-5 py-4 text-xl">No Recent Deposit</p>
						)}
					</div>
				</div>
			)}
		</>
	);
};

export default DepositTable;
