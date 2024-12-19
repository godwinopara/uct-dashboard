"use client";

import { db } from "@/config/firebase";
import { collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, updateDoc } from "firebase/firestore";
import { createContext, useEffect, useReducer, useState } from "react";
import toast from "react-hot-toast";

export const AdminContext = createContext();

const adminReducer = (state, action) => {
	switch (action.type) {
		case "UPDATE_STATE": {
			return action.payload;
		}
	}
};

export const AdminProvider = ({ children }) => {
	const [usersData, dispatch] = useReducer(adminReducer, []);
	const [adminData, setAdminData] = useState({})
	const [refresh, setRefresh] = useState(0);


	const fetchAllData = async () => {
		try {
			const querySnapshot = await getDocs(collection(db, "userData"));
			const data = querySnapshot.docs.map(doc => doc.data());  // Directly mapping to the array
			dispatch({ type: "UPDATE_STATE", payload: data });
		} catch (error) {
			console.error("Error fetching data from Firebase: ", error);
		}
	};
	

	
	const fetchAdminData = async () => {
		const userDocRef = doc(db, "admin", "bCnovolRn7fflfUdHxKyO8sGf9I3");
		const userDocSnap = await getDoc(userDocRef);
		setAdminData(userDocSnap.data())
	}

	useEffect(() => {
		fetchAllData();
		fetchAdminData()
	}, [refresh]);

	const updateUserData = async (userId, userInput) => {
		const userRef = doc(db, "userData", userId);
		await updateDoc(userRef, {
			"user.status": userInput,
		});
		setRefresh((prev) => prev + 1);
	};

	const updateBalance = async (userId, userInput) => {
		const userRef = doc(db, "userData", userId);
		await updateDoc(userRef, {
			totalBalance: userInput.balance,
			totalProfit: userInput.profit,
			totalBonus: userInput.bonus,
		});
		setRefresh((prev) => prev + 1);
	};

	const updateTrade = async (userId, userInput, tradeId) => {
		const docRef = doc(db, "userData", userId);
		const docSnap = await getDoc(docRef);

		if (docSnap) {
			let totalProfit = `${Number(docSnap.data().totalProfit) + Number(userInput.profit)}`;
			let trades = docSnap.data().tradingSession;

			trades.forEach((trade) => {
				if (trade.id === tradeId) {
					trade.profit = userInput.profit;
					trade.status = userInput.status;
				}
			});

			await updateDoc(docRef, {
				tradingSession: trades,
				totalProfit: totalProfit,
			});

			setRefresh((prev) => prev + 1);
		}
	};

	const updateDeposit = async (userId, depositId) => {
		const docRef = doc(db, "userData", userId);
		const docSnap = await getDoc(docRef);

		if (docSnap) {
			let deposits = [];
			deposits = docSnap.data().depositHistory;
			deposits.forEach((deposit) => {
				if (deposit.id === depositId) {
					deposit.status = "Completed";
				}
			});

			await updateDoc(docRef, {
				depositHistory: deposits,
			});

			setRefresh((prev) => prev + 1);
		}
	};

	const updateWithdrawal = async (userId, withdrawalId) => {
		const docRef = doc(db, "userData", userId);
		const docSnap = await getDoc(docRef);

		if (docSnap) {
			let withdrawals = [];
			withdrawals = docSnap.data().withdrawalHistory;
			withdrawals.forEach((withdrawal) => {
				if (withdrawal.id === withdrawalId) {
					withdrawal.status = "Completed";
				}
			});

			await updateDoc(docRef, {
				withdrawalHistory: withdrawals,
			});

			setRefresh((prev) => prev + 1);
		}
	};

	const updateSubscription = async (userId) => {
		const docRef = doc(db, "userData", userId);
		const docSnap = await getDoc(docRef);

		await updateDoc(docRef, {
			subscription: {},
		});

		setRefresh((prev) => prev + 1);
	};

	const updateVerification = async (userId) => {
		const docRef = doc(db, "userData", userId);
		const docSnap = await getDoc(docRef);

		await updateDoc(docRef, {
			verification: {
				...docSnap.data().verification,
				status: "Verified",
			},
		});
		setRefresh((prev) => prev + 1);
	};

	//Update Admin payment method

	

	const updateAdminPaymentOption = async (payload) => {
		if (payload) {
		  
		  try {
			const userRef = doc(db, "admin", "bCnovolRn7fflfUdHxKyO8sGf9I3");
			await toast.promise(updateDoc(userRef, { ...payload }), {
			  loading: "Updating Payment Method...",
			  success: "Payment Method Updated Successfully",
			  error: "Error Occurred, Try Again",
			  
			}, {
				position: "top-right"
			});

			setRefresh((prev) => prev + 1);

		  } catch (error) {
			console.log(error);
		  }
		}
	  };



	const deleteUser = async (userId) => {
		const docRef = doc(db, "userData", userId);
		await deleteDoc(docRef);
		setRefresh((prev) => prev + 1);
	};

	const removeDeposit = async (userId, depositId) => {
		const docRef = doc(db, "userData", userId);
		const docSnap = await getDoc(docRef);

		if (docSnap) {
			const deposits = docSnap.data()?.depositHistory;
			const filteredDeposit = [];
			deposits.forEach((deposit) => {
				if (deposit.id !== depositId) {
					filteredDeposit.push(deposit);
				}
			});
			await updateDoc(docRef, {
				depositHistory: filteredDeposit,
			});

			setRefresh((prev) => prev + 1);
		}
	};

	const removeWithdrawal = async (userId, withdrawalId) => {
		const docRef = doc(db, "userData", userId);
		const docSnap = await getDoc(docRef);

		if (docSnap) {
			let withdrawals = docSnap.data().withdrawalHistory;
			let filteredWithdrawal = [];
			withdrawals.forEach((withdrawal) => {
				if (withdrawal.id !== withdrawalId) {
					filteredWithdrawal.push(withdrawal);
				}
			});

			await updateDoc(docRef, {
				withdrawalHistory: filteredWithdrawal,
			});

			setRefresh((prev) => prev + 1);
		}
	};

	return (
		<AdminContext.Provider
			value={{
				usersData,
				adminData,
				updateAdminPaymentOption,
				updateUserData,
				updateBalance,
				updateTrade,
				updateDeposit,
				updateWithdrawal,
				updateSubscription,
				updateVerification,
				deleteUser,
				removeDeposit,
				removeWithdrawal,
			}}
		>
			{children}
		</AdminContext.Provider>
	);
};
