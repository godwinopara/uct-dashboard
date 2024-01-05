"use client";

import React, { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
// import { usersData } from "@/components/data/data";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { useAdminContext } from "@/hooks/useAdminContext";
import { FaRegEyeSlash } from "react-icons/fa6";
import Modal from "@/components/Modals/Modal";
import Image from "next/image";

export default function Verification() {
	const { usersData } = useAdminContext();
	const [viewImg, setViewImg] = useState("");
	const [showModal, setShowModal] = useState(false);

	const verifications: any = [];

	usersData.forEach((data: any) => {
		if (data.verification?.document) {
			verifications.push({
				...data.verification,
				fullname: `${data.user.firstname} ${data.user.lastname}`,
				userId: data.userId,
			});
		}
	});

	const handlePreviewImg = (img: string, date: string) => {
		setShowModal(true);
		if (img) {
			setViewImg(img);
		}
	};

	const closeModal = () => {
		setShowModal(false);
		setViewImg("");
	};

	return (
		<>
			{showModal && (
				<Modal
					show={showModal}
					closeModal={closeModal}
					title="User IDentification"
					height={400}
					width={400}
				>
					<div className="flex items-center justify-center">
						<Image src={viewImg} alt="user id" height={300} width={380} />
					</div>
				</Modal>
			)}
			{usersData?.length > 0 && (
				<div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
					<h2 className="font-bold text-xl mb-5">ALL USERS</h2>
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
										Document
									</th>
									<th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white">
										Status
									</th>
									<th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
										Action
									</th>
								</tr>
							</thead>
							<tbody>
								{verifications.map((userItem: any, key: number) => (
									<tr key={key}>
										<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
											<h5 className="text-black  dark:text-white">{key + 1}</h5>
										</td>
										<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
											<h5 className="font-medium text-black dark:text-white">
												{userItem.fullname}
											</h5>
										</td>

										<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
											<button
												onClick={() => handlePreviewImg(userItem.document, userItem.date)}
												className="w-[110px] rounded-md  bg-meta-3 text-white py-2 px-3 flex items-center justify-center  gap-x-1"
											>
												Preview <FaRegEyeSlash />
											</button>
										</td>
										<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
											<p
												className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
													userItem.verification?.status === "Verified"
														? "text-success bg-success"
														: "text-warning bg-warning"
												}`}
											>
												{userItem?.status}
											</p>
										</td>

										{userItem.status === "Pending" && (
											<td className="border-b border-[#eee] py-5 px-4 flex items-center gap-x-2 dark:border-strokedark">
												<button className="w-[110px] rounded-md  bg-meta-3 text-white py-2 px-3 flex items-center justify-center  gap-x-1">
													<IoIosCheckmarkCircleOutline />
													Approve
												</button>
												<button className="w-[110px] rounded-md  bg-danger text-white py-2 px-3 flex items-center justify-center  gap-x-1">
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
