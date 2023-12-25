"use client";
import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";
import { useAppContext } from "@/hooks/useAppContext";

const useColorMode = () => {
	const [colorMode, setColorMode] = useLocalStorage("color-theme", "light");
	const { updateTheme } = useAppContext();

	useEffect(() => {
		const className = "dark";
		const bodyClass = window.document.body.classList;

		colorMode === "dark" ? bodyClass.add(className) : bodyClass.remove(className);

		updateTheme(colorMode);
	}, [colorMode]);

	return [colorMode, setColorMode];
};

export default useColorMode;
