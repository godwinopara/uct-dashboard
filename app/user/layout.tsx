"use client";

import "../globals.css";
import "../data-tables-css.css";
import "../satoshi.css";
import { useState, useEffect } from "react";
import Loader from "@/components/common/Loader";
import jwt, { JwtPayload } from "jsonwebtoken";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { AppProvider } from "@/context/AppContext";
import { UserProvider } from "@/context/UserContext";
import { AuthProvider } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Script from "next/script";

export default function RootLayout({ children }: { children: React.ReactNode }) {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [loading, setLoading] = useState<boolean>(true);

	const [userToken, setUserToken] = useState(null);
	const [validToken, setValidToken] = useState(false);
	const router = useRouter();

	useEffect(() => {
		setLoading(false)
	}, []);

	useEffect(() => {
		const storedUserData = localStorage.getItem("userToken");
		if (typeof window !== "undefined" && window.localStorage) {
			let token = JSON.parse(storedUserData!);
			setUserToken(token);

			if (token) {
				try {
					// Decode the JWT token
					const decodedToken = jwt.decode(token.accessToken) as JwtPayload;

					// Check expiration time (in seconds)
					if (decodedToken.exp && decodedToken.exp < Date.now() / 1000) {
						router.push("/auth/login");
					} else {
						setValidToken(true);
					}
				} catch (error) {
					router.push("/auth/login");
				}
			} else {
				router.push("/auth/login");
			}
		}
	}, [validToken, router]);

	return (
		<html lang="en">
			<body suppressHydrationWarning={true}>
				<AppProvider>
					<AuthProvider>
						<UserProvider>
							<div className="dark:bg-boxdark-2 dark:text-bodydark">
								{loading ? (
									<Loader />
								) : (
									<div className="flex h-screen overflow-hidden">
										{/* <!-- ===== Sidebar Start ===== --> */}
										<Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
										{/* <!-- ===== Sidebar End ===== --> */}

										{/* <!-- ===== Content Area Start ===== --> */}
										<div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
											{/* <!-- ===== Header Start ===== --> */}
											<Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
											{/* <!-- ===== Header End ===== --> */}

											{/* <!-- ===== Main Content Start ===== --> */}
											<main>
												<div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
													{children}
												</div>
											</main>
											{/* <!-- ===== Main Content End ===== --> */}
										</div>
										{/* <!-- ===== Content Area End ===== --> */}
									</div>
								)}
							</div>
						</UserProvider>
					</AuthProvider>
				</AppProvider>
				<Script src="//code.tidio.co/qexf9v18mxrecrfy0fpcbxh42i89ldkl.js" async />
			</body>
		</html>
	);
}
