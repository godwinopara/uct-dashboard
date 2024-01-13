"use client";

import React, { ChangeEvent, FormEvent, ReactNode, useEffect, useState } from "react";
import { MdDeleteForever, MdLogin } from "react-icons/md";
import { useAdminContext } from "@/hooks/useAdminContext";
import Modal from "@/components/Modals/Modal";
import UploadButton2 from "@/components/UploadButtons/UploadButton2";
import toast, { Toaster } from "react-hot-toast";

export default function Users() {
	const [currentUserId, setCurrentUserId] = useState<any>("");
	const [showModal, setShowModal] = useState(false);
	const [userInput, setUserInput] = useState("");
	const [loading, setLoading] = useState<{ [currentUserId: string]: boolean }>({});

	const [allowDeleteUser, setAllowDeleteUser] = useState(false);
	const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);

	const { usersData, updateUserData, deleteUser } = useAdminContext();

	const handleBillUser = (user: any) => {
		setShowModal(true);
		setCurrentUserId(user);
	};

	const closeModal = () => {
		setShowModal(false);
		setShowDeleteUserModal(false);
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading((prevLoading) => ({ ...prevLoading, [currentUserId]: true }));
		setTimeout(() => {
			try {
				updateUserData(currentUserId, userInput);
			} catch (error) {
				console.log(error);
			} finally {
				setLoading((prevLoading) => ({ ...prevLoading, [currentUserId]: false }));
				toast.success("Status was updated Successfully", {
					duration: 6000,
					position: "top-center",
					style: {
						padding: "16px",
						fontWeight: "bold",
						minWidth: "300px",
					},
					iconTheme: {
						primary: "#10B981",
						secondary: "#FFFF",
					},
				});
			}
		}, 1000);

		closeModal();
	};

	const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
		setUserInput(e.target.value);
	};

	const handleDeleteUser = (userId: string) => {
		setShowDeleteUserModal(true);
		setCurrentUserId(userId);
	};

	const handleAllowDeleteUser = () => {
		setAllowDeleteUser(true);

		setTimeout(() => {
			if (!currentUserId && !allowDeleteUser) {
				return;
			}
			try {
				deleteUser(currentUserId);
				toast.success("Account was deleted Successfully", {
					duration: 6000,
					position: "top-center",
					style: {
						padding: "8px",
						fontWeight: "bold",
						minWidth: "350px",
					},
					iconTheme: {
						primary: "#10B981",
						secondary: "#FFFF",
					},
				});
			} catch (error) {
				console.log(error);
			} finally {
				setShowDeleteUserModal(false);
			}
		}, 1000);
	};

	return (
		<>
			<Toaster />
			<Modal
				show={showDeleteUserModal}
				closeModal={closeModal}
				title="Delete User"
				height={270}
				width={400}
			>
				<div className="flex text-center items-center justify-center">
					<div>
						<h2 className="text-xl">Are you sure you want to this Account</h2>
						<div className="flex justify-center gap-x-4 mt-8">
							<button
								onClick={handleAllowDeleteUser}
								className="bg-meta-3 flex justify-center items-center text-white rounded-md font-medium px-8 py-2"
								type="submit"
							>
								Yes
							</button>
							<button
								onClick={closeModal}
								className="bg-danger flex justify-center items-center text-white rounded-md font-medium px-8 py-2"
							>
								No
							</button>
						</div>
					</div>
				</div>
			</Modal>
			<Modal show={showModal} closeModal={closeModal} title="Bill User" height={270} width={400}>
				<form onSubmit={handleSubmit}>
					<div className="w-full relative z-20 bg-transparent mb-4">
						<label className="mb-2.5 block text-black">Choose Status</label>
						<select
							name="billuser"
							required
							onChange={handleSelectChange}
							value={userInput}
							className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-meta-3 active:border-meta-3"
						>
							<option value="">Choose Status</option>
							<option value="Active">Active</option>
							<option value="Pending">Pending</option>
							<option value="Signal Fee">Signal Fee</option>
							<option value="Upgrade">Upgrade</option>
							<option value="Insurance">Insurance</option>
							<option value="Stamp Duty">Stamp Duty</option>
							<option value="Trading Time">Trading Time</option>
							<option value="IRS">IRS</option>
							<option value="Broker Fee">Broker Fee</option>
							<option value="Account Management Fee">Account Management Fee</option>
							<option value="Cost of Transfer">Cost of Transfer</option>
							<option value="Withdrawal Fee">Withdrawal Fee</option>
							<option value="Trade Commission Fee">Trade Commission Fee</option>
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
									<th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
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
										<td className="border-b min-w-fit border-[#eee] py-5 px-4 dark:border-strokedark">
											<p className="text-black min-w-fit dark:text-white">{userItem.user.status}</p>
										</td>
										<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
											<p className="text-black dark:text-white">{userItem.user.joinedDate}</p>
										</td>
										<td className="border-b border-[#eee] py-5 px-4 flex items-center gap-x-2 dark:border-strokedark">
											<UploadButton2
												approveBtnClick={handleBillUser}
												userId={userItem.userId}
												loading={loading[userItem.userId] || false}
												btnText="Bill User"
											/>
											{/* <button className="w-[100px] rounded-md  bg-meta-3 text-white py-2 px-3 flex items-center justify-center  gap-x-2">
												<MdLogin />
												Login
											</button> */}
											{/* <button className="w-[100px] rounded-md  bg-warning text-white py-2 px-3 flex items-center justify-center  gap-x-2">
												<ImBlocked />
												Block
											</button> */}
											<button
												onClick={() => handleDeleteUser(userItem.userId)}
												className="w-[100px] rounded-md  bg-danger text-white py-2 px-3 flex items-center justify-center  gap-x-2"
											>
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
		</>
	);
}
