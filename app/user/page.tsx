"use client";

import Dashboard from "@/components/Dashboard/Dashboard";
import { useUserContext } from "@/hooks/useUserContext";
import { Metadata } from "next";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect } from "react";

export const metadata: Metadata = {
	title: "Universal Cryptosphere Trade | Dashboard",
	description: "This is Dashboard page for Universal Cryptosphere Users",
	// other metadata
};

export default function Home() {
	// const { user } = useUserContext();
	// const router = useRouter();

	return (
		<>
			<Dashboard />
		</>
	);
}
