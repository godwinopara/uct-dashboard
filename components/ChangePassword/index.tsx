import { useState } from "react";
import { auth } from "@/config/firebase";
import { updatePassword } from "firebase/auth";

const ChangePassword = () => {
	const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [message, setMessage] = useState("");

	const handleChangePassword = async () => {
		try {
			const user = auth.currentUser;
			if (user) {
				await updatePassword(user, newPassword);
			}
		} catch (error: any) {
			console.error("Error updating password:", error.message);
			setMessage("Error updating password. Please check your current password.");
		}
	};

	return (
		<div>
			<h2>Change Password</h2>
			<label>
				Current Password:
				<input
					type="password"
					value={currentPassword}
					onChange={(e) => setCurrentPassword(e.target.value)}
				/>
			</label>
			<label>
				New Password:
				<input
					type="password"
					value={newPassword}
					onChange={(e) => setNewPassword(e.target.value)}
				/>
			</label>
			<button onClick={handleChangePassword}>Change Password</button>
			<p>{message}</p>
		</div>
	);
};

export default ChangePassword;
