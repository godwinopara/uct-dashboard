"use client";
// import { usersData } from "@/components/data/data";
import { MdDeleteForever } from "react-icons/md";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { useAdminContext } from "@/hooks/useAdminContext";
import { useState } from "react";
import loader from "@/public/images/icon/spinner.svg";
import Image from "next/image";
import UploadButton from "@/components/UploadButtons/UploadButton";
import toast, { Toaster } from "react-hot-toast";
import Modal from "@/components/Modals/Modal";
import { FaRegEyeSlash } from "react-icons/fa6";

interface UserHistoryProps {
	amount: number;
	date: string;
	method: string;
	status: string;
	fullname: string;
	id: string;
	userId: string;
	screenshot: string;
}

export default function Deposits() {
	const { usersData, updateDeposit, removeDeposit } = useAdminContext();
	const [loading, setLoading] = useState<{ [id: string]: boolean }>({});

	const [viewImg, setViewImg] = useState("");
	const [showModal, setShowModal] = useState(false);

	const [userId, setUserId] = useState<string | null>(null);
	const [depositId, setDepositId] = useState<string | null>(null);

	const [allowRemoveDeposit, setAllowRemoveDeposit] = useState(false);
	const [showRemoveDepositModal, setShowRemoveDepositModal] = useState(false);

	const history: any = [];

	usersData.forEach((data: any) => {
		data.depositHistory && data.depositHistory.forEach((hist: any) => {
			history.push({
				...hist,
				fullname: `${data.user.firstname} ${data.user.lastname}`,
				userId: data.userId,
			});
		});
	});

	const handleUpdateDepositStatus = (userId: string, id: string) => {
		setLoading((prevLoading) => ({ ...prevLoading, [id]: true }));

		setTimeout(() => {
			try {
				updateDeposit(userId, id);
			} catch (error) {
				console.log(error);
			} finally {
				setLoading((prevLoading) => ({ ...prevLoading, [id]: false }));
				toast.success("Deposit status updated Successfully", {
					duration: 6000,
					position: "top-center",
					style: {
						padding: "8px",
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
	};

	const handlePreviewImg = (img: string) => {
		setShowModal(true);
		if (img) {
			setViewImg(img);
		}
	};

	const closeModal = () => {
		setShowRemoveDepositModal(false);
		setShowModal(false);
	};

	const openRemoveDepositModal = (userId: string, depositId: string) => {
		setUserId(userId);
		setDepositId(depositId);
		setShowRemoveDepositModal(true);
	};

	const handleAllowRemoveDeposit = () => {
		setAllowRemoveDeposit(true);

		setTimeout(() => {
			if (!userId && !allowRemoveDeposit) {
				return;
			}
			try {
				removeDeposit(userId, depositId);
				toast.success("Deposit was deleted Successfully", {
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
				setShowRemoveDepositModal(false);
			}
		}, 1000);
	};

	return (
		<>
			<Toaster />
			{showModal && (
				<Modal
					show={showModal}
					closeModal={closeModal}
					title="User IDentification"
					height={450}
					width={400}
				>
					<div className="flex items-center justify-center">
						<Image src={viewImg} alt="user id" height={300} width={380} />
					</div>
				</Modal>
			)}
			<Modal
				show={showRemoveDepositModal}
				closeModal={closeModal}
				title="Delete Deposit"
				height={270}
				width={400}
			>
				<div className="flex text-center items-center justify-center">
					<div>
						<h2 className="text-xl">Are you sure you want to delete this Deposit.</h2>
						<div className="flex justify-center gap-x-4 mt-8">
							<button
								onClick={handleAllowRemoveDeposit}
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
			<img
				src="https://firebasestorage.googleapis.com/v0/b/investinspire-3b5e4.appspot.com/o/a1ii3hn18s4dkz8hr9gr.jpg?alt=media&token=9210a3f7-11e2-4dc2-bebe-2bcbddb0cf24"
				alt=""
			/>
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
											<button
												onClick={() => handlePreviewImg(userHistory.screenshot)}
												className="w-[110px] rounded-md  bg-meta-3 text-white py-2 px-3 flex items-center justify-center  gap-x-1"
											>
												Preview <FaRegEyeSlash />
											</button>
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
												<UploadButton
													approveBtnClick={handleUpdateDepositStatus}
													userId={userHistory.userId}
													id={userHistory.id}
													loading={loading[userHistory.id] || false}
													btnText="Approve"
												/>
												<button
													onClick={() => openRemoveDepositModal(userHistory.userId, userHistory.id)}
													className="w-[110px] rounded-md  bg-danger text-white py-2 px-3 flex items-center justify-center  gap-x-2"
												>
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
