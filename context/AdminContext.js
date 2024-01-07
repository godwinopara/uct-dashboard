"use client";

import { db } from "@/config/firebase";
import { collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { createContext, useEffect, useReducer, useState } from "react";

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
	const [refresh, setRefresh] = useState(0);

	const fetchAllData = async () => {
		const querySnapshot = await getDocs(collection(db, "userData"));
		const data = [];
		querySnapshot.forEach((doc) => {
			data.push(doc.data());
		});

		dispatch({ type: "UPDATE_STATE", payload: data });
	};

	useEffect(() => {
		fetchAllData();
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
			let trades = [];
			trades = docSnap.data().tradingSession;
			trades.forEach((trade) => {
				if (trade.id === tradeId) {
					trade.profit = userInput.profit;
					trade.status = userInput.status;
				}
			});

			await updateDoc(docRef, {
				tradingSession: trades,
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
		console.log(docSnap.data().verification);

		await updateDoc(docRef, {
			verification: {
				...docSnap.data().verification,
				status: "Verified",
			},
		});
		setRefresh((prev) => prev + 1);
	};

	return (
		<AdminContext.Provider
			value={{
				usersData,
				updateUserData,
				updateBalance,
				updateTrade,
				updateDeposit,
				updateWithdrawal,
				updateSubscription,
				updateVerification,
			}}
		>
			{children}
		</AdminContext.Provider>
	);
};
