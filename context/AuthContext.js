import { createContext, useContext, useState, useEffect } from "react";
// import { auth } from "../lib/firebase";

const AuthContext = createContext();

const userAuthState = {
	firstname: "Franklin",
	lastname: "Doge",
};

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(userAuthState);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((authUser) => {
			setUser(authUser);
		});

		return () => unsubscribe();
	}, []);

	return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	return useContext(AuthContext);
};
