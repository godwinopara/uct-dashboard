"use client";

import React from "react";
import { FaWallet } from "react-icons/fa";
import { usersData } from "@/components/data/data";
import { useAdminContext } from "@/hooks/useAdminContext";

export default function Account() {
	return (
		<>
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
								{usersData.map((userItem, key: number) => (
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
											<button className="w-[170px] rounded-md  bg-meta-3 text-white py-2 px-3 flex items-center justify-center  gap-x-2">
												<FaWallet />
												Update Account
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
