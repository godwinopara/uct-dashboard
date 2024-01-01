"use client";

import React, { ReactNode, useState } from "react";
import { FaRegUser, FaWallet } from "react-icons/fa";
import { MdDeleteForever, MdLogin } from "react-icons/md";
import { ImBlocked } from "react-icons/im";
// import { usersData } from "@/components/data/data";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import { useAdminContext } from "@/hooks/useAdminContext";

export default function Users() {
	// const [openModal, setOpenModal] = useState(true);
	const { usersData } = useAdminContext();
	// console.log(data);

	return (
		<>
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
										Username
									</th>
									<th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white">
										Email
									</th>
									<th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
										Phone
									</th>
									<th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white">
										Password
									</th>
									<th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white">
										Country
									</th>
									<th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white">
										Gender
									</th>
									<th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white">
										Status
									</th>
									<th className="min-w-[200px] py-4 px-4 font-medium text-black dark:text-white">
										Joining Date
									</th>
									<th className="min-w-[120px] py-4 px-4 text-center font-medium text-black dark:text-white">
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
											<h5 className="font-medium text-black dark:text-white">
												{userItem.user.username}
											</h5>
										</td>
										<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
											<p className="text-black dark:text-white">{userItem.user.email}</p>
										</td>
										<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
											<p className="text-black dark:text-white">{userItem.user.mobile}</p>
										</td>
										<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
											<p className="text-black dark:text-white">{userItem.user.password}</p>
										</td>
										<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
											<p className="text-black dark:text-white">{userItem.user.country}</p>
										</td>
										<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
											<p className="text-black dark:text-white">{userItem.user.gender}</p>
										</td>
										<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
											<p className="text-black dark:text-white">{userItem.user.status}</p>
										</td>
										<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
											<p className="text-black dark:text-white">{userItem.user.joinedDate}</p>
										</td>
										<td className="border-b border-[#eee] py-5 px-4 flex items-center gap-x-2 dark:border-strokedark">
											<button className="w-[120px] rounded-md  bg-meta-3 text-white py-2 px-3 flex items-center justify-center  gap-x-2">
												<FaWallet />
												Bill User
											</button>
											<button className="w-[150px] rounded-md  bg-meta-3 text-white py-2 px-3 flex items-center justify-center  gap-x-2">
												<FaRegUser />
												Update User
											</button>
											<button className="w-[100px] rounded-md  bg-meta-3 text-white py-2 px-3 flex items-center justify-center  gap-x-2">
												<MdLogin />
												Login
											</button>
											<button className="w-[100px] rounded-md  bg-warning text-white py-2 px-3 flex items-center justify-center  gap-x-2">
												<ImBlocked />
												Block
											</button>
											<button className="w-[100px] rounded-md  bg-danger text-white py-2 px-3 flex items-center justify-center  gap-x-2">
												<MdDeleteForever />
												Delete
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			)}

			{/* <Modal show={openModal} closeModal={() => setOpenModal(false)}>
				<div>
					Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus nulla velit alias numquam
					omnis placeat quis pariatur blanditiis quod consequuntur!
				</div>
			</Modal> */}
		</>
	);
}

interface ModalProps {
	show: boolean;
	closeModal: () => void;
	children: ReactNode;
}

const Modal = ({ show, closeModal, children }: ModalProps) => {
	return (
		<Rodal visible={show} onClose={closeModal}>
			<div className="text-black">{children}</div>
		</Rodal>
	);
};

// className = "bg-black dark:bg-boxdark";
