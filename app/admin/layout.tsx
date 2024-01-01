"use client";

import "../globals.css";
import "../data-tables-css.css";
import "../satoshi.css";
import "rodal/lib/rodal.css";
import { useState, useEffect } from "react";
import { AppProvider } from "@/context/AppContext";
import AdminSidebar from "@/components/AdminSidebar";
import Loader from "@/components/common/Loader";
import AdminHeader from "@/components/AdminHeader";
import { AdminProvider } from "@/context/AdminContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		setTimeout(() => setLoading(false), 1000);
	}, []);

	return (
		<html lang="en">
			<body suppressHydrationWarning={true}>
				<AppProvider>
					<AdminProvider>
						<div className="dark:bg-boxdark-2 dark:text-bodydark">
							{loading ? (
								<Loader />
							) : (
								<div className="flex h-screen overflow-hidden">
									{/* <!-- ===== Sidebar Start ===== --> */}
									<AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
									{/* <!-- ===== Sidebar End ===== --> */}

									{/* <!-- ===== Content Area Start ===== --> */}
									<div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
										{/* <!-- ===== Header Start ===== --> */}
										<AdminHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
										{/* <!-- ===== Header End ===== --> */}

										{/* <!-- ===== Main Content Start ===== --> */}
										<main>
											<div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">{children}</div>
										</main>
										{/* <!-- ===== Main Content End ===== --> */}
									</div>
									{/* <!-- ===== Content Area End ===== --> */}
								</div>
							)}
						</div>
					</AdminProvider>
				</AppProvider>
			</body>
		</html>
	);
}
