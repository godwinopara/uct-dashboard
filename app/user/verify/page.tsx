"use client";

import { storage } from "@/config/firebase";
import { useUserContext } from "@/hooks/useUserContext";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { AiOutlineFileSearch } from "react-icons/ai";
import loader from "@/public/images/icon/spinner.svg";
import Image from "next/image";

export default function Verify() {
	const [image, setImage] = useState<string | null>(null);
	const [uploaded, setUploaded] = useState(false);
	const [verificationStatus, setVerificationStatus] = useState("Not Verified");
	const [loading, setLoading] = useState(false);

	const { updateVerification, userDataState } = useUserContext();

	useEffect(() => {
		setVerificationStatus(userDataState.verification.status);

		if (userDataState.verification.status !== "Not Verified") {
			setUploaded(true);
		}
	}, []);

	const onDrop = useCallback(async (acceptedFiles: any) => {
		setImage(null);
		if (acceptedFiles && acceptedFiles.length > 0) {
			setLoading(true);
			const file = acceptedFiles[0];
			const storageRef = ref(storage, `identity/${file?.name}`);
			await uploadBytes(storageRef, file as Blob);
			const imgUrl = await getDownloadURL(storageRef);
			setImage(imgUrl);

			setLoading(false);
		}
	}, []);

	const { getRootProps, getInputProps } = useDropzone({ onDrop });

	const handleImageUpload = async (e: React.FormEvent) => {
		e.preventDefault();
		updateVerification({ document: image, status: "Pending", date: new Date().toDateString() });
		setImage(null);
		setUploaded(true);
		setVerificationStatus("Pending");
	};

	return (
		<div>
			<div className="mb-20 text-center rounded-md border border-stroke  bg-white py-8 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
				<h2 className="font-bold mb-3 text-xl">Account Status</h2>
				{verificationStatus === "Not Verified" && (
					<p>
						Your account is not verified. To verify your account, please fill out the form to
						request verification.
					</p>
				)}

				{verificationStatus === "Pending" && (
					<div className="flex flex-col text-center justify-center items-center text-2xl mt-8 pb-8">
						<div className="text-9xl mb-5 text-meta-3">
							<AiOutlineFileSearch />
						</div>
						<div>
							<p>Your Document is under review</p>
							<p>You will receive a mail from us once it has been verified.</p>
						</div>
					</div>
				)}
			</div>

			{!uploaded && (
				<div className="mb-10 flex justify-center items-center gap-3">
					<div>
						<p className="mb-1.5 text-black dark:text-white text-center">SUBMIT VERIFICATION</p>
						<p className="xl:w-[70%] text-center xl:mx-auto">
							To request an account verification, kindly provide your information with a valid means
							of Identification attached as an image document.
						</p>
					</div>
				</div>
			)}
			{!uploaded && (
				<form onSubmit={handleImageUpload}>
					<div
						id="FileUpload"
						className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border-2 border-dashed border-body bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5"
						{...getRootProps()}
					>
						<input
							type="file"
							accept="image/*"
							required
							disabled={uploaded}
							className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
							{...getInputProps()}
						/>
						{loading && (
							<div className="flex justify-center items-center mb-8 mt-5">
								<Image src={loader} alt="" height={50} width={50} />
							</div>
						)}
						{image && (
							<img
								src={image}
								alt="Selected Image"
								className="max-w-full mx-auto mb-8 max-h-48 object-cover"
							/>
						)}
						<div className="flex flex-col items-center justify-center space-y-3">
							<span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
								<svg
									width="16"
									height="16"
									viewBox="0 0 16 16"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fillRule="evenodd"
										clipRule="evenodd"
										d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z"
										fill="#10B981"
									/>
									<path
										fillRule="evenodd"
										clipRule="evenodd"
										d="M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z"
										fill="#10B981"
									/>
									<path
										fillRule="evenodd"
										clipRule="evenodd"
										d="M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z"
										fill="#10B981"
									/>
								</svg>
							</span>
							<p>
								<span className="text-meta-3">Click to upload</span> or drag and drop
							</p>
							<p className="mt-1.5">SVG, PNG, JPG or GIF</p>
							<p>(max, 800 X 800px)</p>
						</div>
					</div>

					<div className="flex justify-center">
						<button
							className="flex justify-center md:w-1/2 mx-auto rounded bg-meta-3 py-3 px-6 font-medium text-gray hover:bg-opacity-95"
							type="submit"
						>
							Upload Identification
						</button>
					</div>
				</form>
			)}
		</div>
	);
}
