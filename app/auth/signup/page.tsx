"use client";

import Link from "next/link";
import axios from "axios";
import Image from "next/image";

import logo from "public/images/logo/logo-green.svg";
import authImg from "public/images/auth/auth-screens.png";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useAuthContext } from "@/hooks/useAuthContext";

import { useRouter } from "next/navigation";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "@/config/firebase";

interface Country {
	name: string;
	Iso2: string;
	Iso3: string;
}

export default function Signup() {
	const [countries, setCountries] = useState<Country[] | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [formData, setFormData] = useState({
		firstname: "",
		lastname: "",
		username: "",
		gender: "",
		email: "",
		country: "",
		mobile: "",
		password: "",
		confirmPassword: "",
	});

	const { signUp } = useAuthContext();

	const router = useRouter();

	const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmitSignUp = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (formData.password !== formData.confirmPassword) {
			setError("Password Mismatch: Password and Confirm Password not the same");
			return;
		}

		try {
			const signup = await signUp(formData.email, formData.password);
			if (signup) {
				const userRef = collection(db, "userData");
				await setDoc(doc(userRef, signup.user.uid), {
					totalBalance: "0.000",
					totalProfit: "0.000",
					totalBonus: "0.000",
					tradingSession: [],
					depositHistory: [],
					withdrawalHistory: [],
					userId: signup.user.uid,
					subscription: {},
					verification: {},
					user: {
						firstname: formData.firstname[0].toUpperCase() + formData.firstname.slice(1),
						lastname: formData.lastname[0].toUpperCase() + formData.lastname.slice(1),
						email: formData.email,
						password: formData.password,
						country: formData.country,
						mobile: formData.mobile,
						status: "Active",
						username: formData.username,
						gender: formData.gender,
						joinedDate: new Date().toDateString(),
					},
				});
				setError(null);
				setFormData({
					firstname: "",
					lastname: "",
					username: "",
					gender: "",
					email: "",
					country: "",
					mobile: "",
					password: "",
					confirmPassword: "",
				});
				localStorage.setItem("userToken", JSON.stringify(signup.user.stsTokenManager));
				router.push("/user");
			}
		} catch (error: any) {
			const errorMessage = error.message.replace("Firebase: ", "");
			setError(errorMessage);
		}
	};

	useEffect(() => {
		setError(null);

		const getCountries = async () => {
			try {
				const res = await axios.get("https://countriesnow.space/api/v0.1/countries/iso");
				const data = res.data;
				setCountries(data.data);
			} catch (error: any) {
				setError(error.message);
			}
		};
		getCountries();
	}, []);

	return (
		<>
			<div className="max-w-300 mx-auto rounded-sm">
				<div className="flex flex-wrap justify-center">
					<div className="hidden  w-full xl:block xl:w-1/2">
						<div className="px-10 flex flex-col items-center justify-center h-full text-center">
							<Link href="https://cryptoshpere-trade.vercel.app/" className="flex justify-center">
								<Image src={logo} alt="logo" height={60} />
							</Link>
							<div className="mt-16">
								<Image src={authImg} alt="authentication images" />
							</div>
						</div>
					</div>
					<div className="w-full xl:w-1/2">
						<div className="flex justify-center my-8 xl:hidden">
							<Link
								href="https://cryptoshpere-trade.vercel.app/"
								className="flex justify-center pl-7"
							>
								<Image src={logo} alt="logo" className="mx-auto" />
							</Link>
						</div>
						<div className="w-full p-4 sm:p-12.5 xl:p-17.5">
							<h2 className="mb-2 text-center text-3xl font-bold text-black sm:text-title-xl2">
								Create Account
							</h2>
							<p className="text-center opacity-40 font-bold mt-1 mb-8">
								Universal Cryptosphere Trade
							</p>

							{error && (
								<div className="border border-red-600 text-center p-3 my-5">
									<p className="text-red-600">{error}</p>
								</div>
							)}
							<form onSubmit={handleSubmitSignUp}>
								<div className="mb-4 xl:flex gap-x-3">
									<div>
										<label className="mb-2.5 block font-medium text-black">First Name</label>
										<div className="relative">
											<input
												type="text"
												name="firstname"
												onChange={handleInputChange}
												required
												placeholder="Enter your First Name"
												className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none"
											/>
										</div>
									</div>
									<div>
										<label className="mb-2.5 block font-medium text-black">Last Name</label>
										<div className="relative">
											<input
												type="text"
												required
												name="lastname"
												onChange={handleInputChange}
												placeholder="Enter your Last Name"
												className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none"
											/>
										</div>
									</div>
								</div>
								<div className="mb-4 xl:flex gap-x-3">
									<div className="w-full">
										<label className="mb-2.5 block font-medium text-black">Username</label>
										<div className="relative">
											<input
												type="text"
												name="username"
												onChange={handleInputChange}
												required
												placeholder="Enter your Username"
												className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none"
											/>
										</div>
									</div>
									<div className="w-full relative z-20 bg-transparent mb-4">
										<label className="mb-2.5 block text-black dark:text-white">Gender</label>
										<select
											name="gender"
											onChange={handleInputChange}
											required
											className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-meta-3 active:border-meta-3"
										>
											<option value="">Select Gender</option>
											<option value="Male">Male</option>
											<option value="Female">Female</option>
										</select>
									</div>
								</div>

								<div className="mb-4">
									<label className="mb-2.5 block font-medium text-black ">Email</label>
									<div className="relative">
										<input
											type="email"
											required
											name="email"
											onChange={handleInputChange}
											placeholder="Enter your email"
											className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none"
										/>

										<span className="absolute right-4 top-4">
											<svg
												className="fill-current"
												width="22"
												height="22"
												viewBox="0 0 22 22"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<g opacity="0.5">
													<path
														d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z"
														fill=""
													/>
												</g>
											</svg>
										</span>
									</div>
								</div>

								<div className="mb-6 xl:flex gap-x-3">
									<div>
										<label className="mb-2.5 block font-medium text-black">Mobile Number</label>
										<div className="relative">
											<input
												type="text"
												required
												name="mobile"
												onChange={handleInputChange}
												placeholder="Mobile (Whatsapp Preferred)"
												className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none"
											/>
										</div>
									</div>
									<div className="relative z-20 bg-transparent mb-4">
										<label className="mb-2.5 block text-black dark:text-white">
											Select Country
										</label>
										<select
											name="country"
											onChange={handleInputChange}
											required
											className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-meta-3 active:border-meta-3"
										>
											<option value="">Select Country</option>
											{countries?.map((country, key) => {
												return <option key={key}>{country.name}</option>;
											})}
										</select>
									</div>
								</div>

								<div className="mb-6 xl:flex gap-x-3">
									<div>
										<label className="mb-2.5 block font-medium text-black">Password</label>
										<div className="relative">
											<input
												type="password"
												name="password"
												onChange={handleInputChange}
												required
												placeholder="Password"
												className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none"
											/>
										</div>
									</div>
									<div>
										<label className="mb-2.5 block font-medium text-black">Re-type Password</label>
										<div className="relative">
											<input
												type="password"
												name="confirmPassword"
												onChange={handleInputChange}
												required
												placeholder="Re-type Password"
												className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none"
											/>
										</div>
									</div>
								</div>

								<div className="mb-5">
									<input
										type="submit"
										value="Create Account"
										className="w-full cursor-pointer rounded-lg border border-meta-3 bg-meta-3 p-4 text-white transition hover:bg-opacity-90"
									/>
								</div>

								<button className="flex w-full items-center justify-center gap-3.5 rounded-lg border border-stroke bg-gray p-4 hover:bg-opacity-50">
									<span>
										<svg
											width="20"
											height="20"
											viewBox="0 0 20 20"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<g clipPath="url(#clip0_191_13499)">
												<path
													d="M19.999 10.2217C20.0111 9.53428 19.9387 8.84788 19.7834 8.17737H10.2031V11.8884H15.8266C15.7201 12.5391 15.4804 13.162 15.1219 13.7195C14.7634 14.2771 14.2935 14.7578 13.7405 15.1328L13.7209 15.2571L16.7502 17.5568L16.96 17.5774C18.8873 15.8329 19.9986 13.2661 19.9986 10.2217"
													fill="#059669"
												/>
												<path
													d="M10.2055 19.9999C12.9605 19.9999 15.2734 19.111 16.9629 17.5777L13.7429 15.1331C12.8813 15.7221 11.7248 16.1333 10.2055 16.1333C8.91513 16.1259 7.65991 15.7205 6.61791 14.9745C5.57592 14.2286 4.80007 13.1801 4.40044 11.9777L4.28085 11.9877L1.13101 14.3765L1.08984 14.4887C1.93817 16.1456 3.24007 17.5386 4.84997 18.5118C6.45987 19.4851 8.31429 20.0004 10.2059 19.9999"
													fill="#34A853"
												/>
												<path
													d="M4.39899 11.9777C4.1758 11.3411 4.06063 10.673 4.05807 9.99996C4.06218 9.32799 4.1731 8.66075 4.38684 8.02225L4.38115 7.88968L1.19269 5.4624L1.0884 5.51101C0.372763 6.90343 0 8.4408 0 9.99987C0 11.5589 0.372763 13.0963 1.0884 14.4887L4.39899 11.9777Z"
													fill="#FBBC05"
												/>
												<path
													d="M10.2059 3.86663C11.668 3.84438 13.0822 4.37803 14.1515 5.35558L17.0313 2.59996C15.1843 0.901848 12.7383 -0.0298855 10.2059 -3.6784e-05C8.31431 -0.000477834 6.4599 0.514732 4.85001 1.48798C3.24011 2.46124 1.9382 3.85416 1.08984 5.51101L4.38946 8.02225C4.79303 6.82005 5.57145 5.77231 6.61498 5.02675C7.65851 4.28118 8.9145 3.87541 10.2059 3.86663Z"
													fill="#EB4335"
												/>
											</g>
											<defs>
												<clipPath id="clip0_191_13499">
													<rect width="20" height="20" fill="white" />
												</clipPath>
											</defs>
										</svg>
									</span>
									Sign up with Google
								</button>

								<div className="mt-6 text-center">
									<p>
										Don’t have any account?{"  "}
										<Link href="/auth/login" className="text-meta-3">
											Sign in
										</Link>
									</p>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
