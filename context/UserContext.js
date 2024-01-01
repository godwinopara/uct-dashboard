"use client";

import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { useAuthContext } from "@/hooks/useAuthContext";
import { db } from "@/config/firebase";
import { useRouter } from "next/navigation";
import { collection, doc, setDoc, getDoc, getDocs } from "firebase/firestore";

export const UserContext = createContext();

// Create a reducer function to handle state changes
const userReducer = (state, action) => {
	switch (action.type) {
		case "UPDATE_TRADING_SESSION":
			saveToFirebase({ ...state, tradingSession: [...state.tradingSession, action.payload] });
			return {
				...state,
				tradingSession: [...state.tradingSession, action.payload],
			};
		case "UPDATE_DEPOSIT_HISTORY":
			saveToFirebase({ ...state, depositHistory: [...state.depositHistory, action.payload] });
			return {
				...state,
				depositHistory: [...state.depositHistory, action.payload],
			};
		case "UPDATE_WITHDRAWAL_HISTORY":
			saveToFirebase({ ...state, withdrawalHistory: [...state.withdrawalHistory, action.payload] });
			return {
				...state,
				withdrawalHistory: [...state.withdrawalHistory, action.payload],
			};
		case "UPDATE_USER":
			return {
				...state,
				user: { ...state.user, ...action.payload },
			};

		case "UPDATE_STATE":
			return action.payload;
		// Add more cases as needed for other state updates

		default:
			return state;
	}
};

async function saveToFirebase(data) {
	const { user } = useAuthContext();
	if (user) {
		const userRef = doc(db, "userData", user.uid);
		await setDoc(userRef, data);
	}
}

export const UserProvider = ({ children }) => {
	const [userDataState, dispatch] = useReducer(userReducer, {});
	const { user } = useAuthContext();

	const router = useRouter();

	useEffect(() => {
		const getData = async () => {
			try {
				if (user) {
					const docRef = doc(db, "userData", user.uid);
					const docSnap = docRef ? await getDoc(docRef) : null;
					docSnap.exists() ? updateState(docSnap.data()) : null;
				}
			} catch (error) {
				console.log(error);
			}
		};
		getData();
	}, [user]);

	const updateTradingSession = (payload) => {
		dispatch({ type: "UPDATE_TRADING_SESSION", payload });
	};

	const updateDepositHistory = (payload) => {
		dispatch({ type: "UPDATE_DEPOSIT_HISTORY", payload });
	};

	const updateWithdrawalHistory = (payload) => {
		dispatch({ type: "UPDATE_WITHDRAWAL_HISTORY", payload });
	};

	const updateUser = (payload) => {
		dispatch({ type: "UPDATE_USER", payload });
	};

	const updateState = (payload) => {
		dispatch({ type: "UPDATE_STATE", payload });
	};

	return (
		<UserContext.Provider
			value={{
				userDataState,
				updateUser,
				updateTradingSession,
				updateDepositHistory,
				updateWithdrawalHistory,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};
