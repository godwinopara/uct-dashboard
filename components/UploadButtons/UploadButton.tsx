import Image from "next/image";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import loader from "@/public/images/icon/spinner.svg";

interface ApproveBtnProps {
	approveBtnClick: (userId: string, id: string) => void;
	loading: boolean;
	btnText: string;
	userId: string;
	id: string;
}

const UploadButton = ({ approveBtnClick, loading, btnText, userId, id }: ApproveBtnProps) => {
	const handleClick = () => {
		approveBtnClick(userId, id);
	};

	return (
		<button
			onClick={handleClick}
			className="w-[110px] rounded-md  bg-meta-3 text-white py-2 px-3 flex items-center justify-center  gap-x-2"
		>
			{loading ? (
				<Image src={loader} alt="loading icon" height={20} width={20} />
			) : (
				<IoIosCheckmarkCircleOutline />
			)}
			{btnText}
		</button>
	);
};

export default UploadButton;
