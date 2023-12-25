import { useContext } from "react";
import { AppContext } from "../context/AppContext";

// Create a custom hook to access the context
export const useAppContext = () => {
	return useContext(AppContext);
};
