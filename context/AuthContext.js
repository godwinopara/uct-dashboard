import { createContext, useContext, useState, useEffect } from "react";
// import { auth } from "../lib/firebase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((authUser) => {
			authUser ? setUser(authUser) : setUser(null);
		});

		return () => unsubscribe();
	}, []);

	return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	return useContext(AuthContext);
};
