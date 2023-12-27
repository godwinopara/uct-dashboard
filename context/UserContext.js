"use client";

import { createContext, useContext, useEffect, useLayoutEffect, useReducer, useState } from "react";
import { useAuthContext } from "@/hooks/useAuthContext";
import { db } from "@/config/firebase";
import { useRouter } from "next/navigation";

const defaultState = {
	totalBalance: 10000,
	totalProfit: 5000,
	totalBonus: 800,
	tradingSession: [],
	depositHistory: [],
	withdrawalHistory: [],
	user: {
		firstname: "Franklin",
		lastname: "Doge",
		email: "frank@gmail.com",
		password: "",
		country: "usa",
		mobile: "",
	},
};

export const UserContext = createContext();

// Create a reducer function to handle state changes
const userReducer = (state, action) => {
	switch (action.type) {
		case "UPDATE_TRADING_SESSION":
			return {
				...state,
				tradingSession: [...state.tradingSession, action.payload],
			};
		case "UPDATE_DEPOSIT_HISTORY":
			return {
				...state,
				depositHistory: [...state.depositHistory, action.payload],
			};
		case "UPDATE_WITHDRAWAL_HISTORY":
			return {
				...state,
				withdrawalHistory: [...state.withdrawalHistory, action.payload],
			};
		case "UPDATE_USER":
			return {
				...state,
				user: { ...state.user, ...action.payload },
			};

		// Add more cases as needed for other state updates

		default:
			return state;
	}
};

export const UserProvider = ({ children }) => {
	const isLocalStorageAvailable = typeof window !== "undefined" && window.localStorage;
	const storedState = isLocalStorageAvailable ? localStorage.getItem("userDataState") : null;
	const initialState = storedState ? JSON.parse(storedState) : defaultState;
	const [userDataState, dispatch] = useReducer(userReducer, initialState);

	useEffect(() => {
		localStorage.setItem("userDataState", JSON.stringify(userDataState));
	}, [userDataState]);

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
