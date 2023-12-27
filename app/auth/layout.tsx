import { AuthProvider } from "@/context/AuthContext";
import "../globals.css";
import { UserProvider } from "@/context/UserContext";

export const metadata = {
	title: "Next.js",
	description: "Generated by Next.js",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<AuthProvider>
				<UserProvider>
					<body>{children}</body>
				</UserProvider>
			</AuthProvider>
		</html>
	);
}
