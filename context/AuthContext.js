"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { auth } from "../config/firebase";
import {
	onAuthStateChanged,
	signOut,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from "firebase/auth";
import { useUserContext } from "@/hooks/useUserContext";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUser({ uid: user.uid, email: user.email, username: user.metadata });
			} else {
				setUser(null);
			}
		});

		return () => unsubscribe();
	}, []);

	const signUp = (email, password, username) => {
		return createUserWithEmailAndPassword(auth, email, password);
	};

	const login = (email, password) => {
		return signInWithEmailAndPassword(auth, email, password);
	};

	const logout = async () => {
		setUser(null);
		await signOut(auth);
	};

	return (
		<AuthContext.Provider value={{ user, signUp, login, logout }}>{children}</AuthContext.Provider>
	);
};
