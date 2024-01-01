import { useContext } from "react";
import { AdminContext } from "@/context/AdminContext";

export const useAdminContext = () => {
	return useContext(AdminContext);
};
