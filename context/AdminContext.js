"use client";

import { db } from "@/config/firebase";
import { collection, getDocs } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
	const [usersData, setUsersData] = useState([]);

	useEffect(() => {
		const fetchAllData = async () => {
			const querySnapshot = await getDocs(collection(db, "userData"));
			querySnapshot.forEach((doc) => {
				setUsersData((prev) => prev.concat([doc.data()]));
			});
		};

		fetchAllData();
	}, []);

	return <AdminContext.Provider value={{ usersData }}>{children}</AdminContext.Provider>;
};
