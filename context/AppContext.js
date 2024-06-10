"use client";

import axios from "axios";
import { createContext, useReducer, useContext, useEffect } from "react";

// Define your initial state
const defaultState = {
	theme: "dark",
	bitcoinRate: 0,
	ethereumRate: 0,
};

// Create a context
export const AppContext = createContext();

// Create a reducer function to handle state changes
const appReducer = (state, action) => {
	switch (action.type) {
		case "UPDATE_THEME":
			return {
				...state,
				theme: action.payload,
			};
		case "SET_CRYPTOCURRENCY_RATES":
			return {
				...state,
				bitcoinRate: action.payload.bitcoinRate,
				ethereumRate: action.payload.ethereumRate,
			};
		// Add more cases as needed for other state updates

		default:
			return state;
	}
};

export const AppProvider = ({ children }) => {
	const isLocalStorageAvailable = typeof window !== "undefined" && window.localStorage;

	// Load initial state from localStorage
	const storedState = isLocalStorageAvailable ? localStorage.getItem("appState") : null;
	const initialState = storedState ? JSON.parse(storedState) : defaultState;
	const [state, dispatch] = useReducer(appReducer, initialState);

	useEffect(() => {
		localStorage.setItem("appState", JSON.stringify(state));
	}, [state]);

	useEffect(() => {
		// Fetch Bitcoin rate on component mount
		fetchCryptocurrencyRates();

		// Set up an interval to fetch the rate every 5 minutes (adjust as needed)
		const intervalId = setInterval(fetchCryptocurrencyRates, 5 * 60 * 1000);

		// Clean up the interval on component unmount
		return () => clearInterval(intervalId);
	}, []);

	const updateTheme = (payload) => {
		dispatch({ type: "UPDATE_THEME", payload });
	};

	const fetchCryptocurrencyRates = async () => {
		try {
			const response = await axios.get("https://api.coingecko.com/api/v3/simple/price", {
				params: {
					ids: "bitcoin,ethereum,",
					vs_currencies: "usd",
				},
			});

			const bitcoinRate = response.data.bitcoin.usd;
			const ethereumRate = response.data.ethereum.usd;

			dispatch({ type: "SET_CRYPTOCURRENCY_RATES", payload: { bitcoinRate, ethereumRate } });
		} catch (error) {
			console.error("Error fetching cryptocurrency rates:", error);
		}
	};

	return <AppContext.Provider value={{ state, updateTheme }}>{children}</AppContext.Provider>;
};
