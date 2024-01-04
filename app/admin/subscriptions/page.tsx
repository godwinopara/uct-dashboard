"use client";

import React from "react";
import { MdCancel } from "react-icons/md";
import { useAdminContext } from "@/hooks/useAdminContext";

export default function Subscriptions() {
	const { usersData } = useAdminContext();

	let subscriptionCount = 0;

	usersData.forEach((data: any) => {
		if (data.subscription.plan) {
			subscriptionCount++;
		}
	});

	return (
		<>
			<div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
				<h2 className="font-bold text-xl mb-5">ALL SUBSCRIPTIONS</h2>
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
									Plan
								</th>
								<th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white">
									Amount Invested
								</th>
								<th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white">
									Duration
								</th>
								<th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white">
									Date
								</th>
								<th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
									Action
								</th>
							</tr>
						</thead>

						<tbody>
							{subscriptionCount > 0 &&
								usersData?.map((userItem: any, key: number) => (
									<tr key={key}>
										<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
											{userItem.subscription.plan && (
												<h5 className="text-black  dark:text-white">{key + 1}</h5>
											)}
										</td>

										<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
											{userItem.subscription.plan && (
												<h5 className="font-medium text-black dark:text-white">
													{userItem.user.firstname} {userItem.user.lastname}
												</h5>
											)}
										</td>

										<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
											{userItem.subscription.plan && (
												<p className="text-black dark:text-white">{userItem.subscription?.plan}</p>
											)}
										</td>
										<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
											{userItem.subscription.amount && (
												<p className="text-black dark:text-white">
													${userItem.subscription?.amount}
												</p>
											)}
										</td>
										<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
											{userItem.subscription.plan && (
												<p className="text-black dark:text-white">
													{userItem.subscription?.duration}
												</p>
											)}
										</td>
										<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
											{userItem.subscription.date && (
												<p className="text-black dark:text-white">{userItem.subscription?.date}</p>
											)}
										</td>

										<td className="border-b border-[#eee] py-5 px-4 flex items-center gap-x-2 dark:border-strokedark">
											{userItem.subscription.plan && (
												<button className="w-[170px] rounded-md  bg-danger text-white py-2 px-3 flex items-center justify-center  gap-x-2">
													<MdCancel />
													End Subscription
												</button>
											)}
										</td>
									</tr>
								))}
						</tbody>
					</table>
					{subscriptionCount < 1 && (
						<div className="text-center py-14 text-xl">No User Have Subscribed</div>
					)}
				</div>
			</div>
		</>
	);
}
