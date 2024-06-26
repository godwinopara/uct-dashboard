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
			saveToFirebase(
				{ ...state, tradingSession: [...state.tradingSession, action.payload] },
				action.user
			);
			return {
				...state,
				tradingSession: [...state.tradingSession, action.payload],
			};
		case "UPDATE_DEPOSIT_HISTORY":
			saveToFirebase(
				{ ...state, depositHistory: [...state.depositHistory, action.payload] },
				action.user
			);
			return {
				...state,
				depositHistory: [...state.depositHistory, action.payload],
			};
		case "UPDATE_WITHDRAWAL_HISTORY":
			saveToFirebase(
				{ ...state, withdrawalHistory: [...state.withdrawalHistory, action.payload] },
				action.user
			);
			return {
				...state,
				withdrawalHistory: [...state.withdrawalHistory, action.payload],
			};
		case "UPDATE_USER":
			saveToFirebase({ ...state, user: { ...state.user, ...action.payload } }, action.user);
			return {
				...state,
				user: { ...state.user, ...action.payload },
			};
		case "UPDATE_SUBSCRIPTION":
			saveToFirebase({ ...state, subscription: { ...action.payload } }, action.user);
			return {
				...state,
				subscription: { ...action.payload },
			};
		case "UPDATE_VERIFICATION":
			saveToFirebase({ ...state, verification: { ...action.payload } }, action.user);
			return {
				...state,
				verification: { ...action.payload },
			};

		case "UPDATE_STATE":
			return action.payload;
		// Add more cases as needed for other state updates

		default:
			return state;
	}
};

async function saveToFirebase(data, user) {
	if (user) {
		const userRef = doc(db, "userData", user.uid);
		await setDoc(userRef, data);
	}
}

export const UserProvider = ({ children }) => {
	const [userDataState, dispatch] = useReducer(userReducer, {});
	const [admin, setAdmin] = useState(null)
	const { user } = useAuthContext();


	useEffect(() => {
		const getData = async () => {
			try {
				if (user) {
					const docRef = doc(db, "userData", user.uid);
					const adminRef = doc(db, "admin", "bCnovolRn7fflfUdHxKyO8sGf9I3");
					const docSnap = docRef ? await getDoc(docRef) : null;
					const adminSnap = docRef ? await getDoc(adminRef) : null;
					adminSnap.exists() ? setAdmin(adminSnap.data()): null
					docSnap.exists() ? updateState(docSnap.data()) : null;

					const data = docSnap.data();
				
					localStorage.setItem(
						"user",
						JSON.stringify({ email: data.user.email, isAdmin: data.user.isAdmin })
					);
				}
			} catch (error) {
				console.log(error);
			}
		};
		getData();

	}, [user]);

	const updateTradingSession = (payload) => {
		dispatch({ type: "UPDATE_TRADING_SESSION", payload, user });
	};

	const updateDepositHistory = (payload) => {
		dispatch({ type: "UPDATE_DEPOSIT_HISTORY", payload, user });
	};

	const updateWithdrawalHistory = (payload) => {
		dispatch({ type: "UPDATE_WITHDRAWAL_HISTORY", payload, user });
	};

	const updateUser = (payload) => {
		dispatch({ type: "UPDATE_USER", payload, user });
	};

	const updateState = (payload) => {
		dispatch({ type: "UPDATE_STATE", payload, user });
	};

	const updateSubscription = (payload) => {
		dispatch({ type: "UPDATE_SUBSCRIPTION", payload, user });
	};

	const updateVerification = (payload) => {
		dispatch({ type: "UPDATE_VERIFICATION", payload, user });
	};

	return (
		<UserContext.Provider
			value={{
				userDataState,
				admin,
				updateUser,
				updateTradingSession,
				updateDepositHistory,
				updateWithdrawalHistory,
				updateSubscription,
				updateVerification,
			
			}}

		>
			{children}
		</UserContext.Provider>
	);
};
