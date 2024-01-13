import Image from "next/image";
import loader from "@/public/images/icon/spinner.svg";
import { FaWallet } from "react-icons/fa";

interface ApproveBtnProps {
	approveBtnClick: (userId: string, balance: string, profit: string, bonus: string) => void;
	loading: boolean;
	btnText: string;
	userId: string;
	balance: string;
	profit: string;
	bonus: string;
}

const UploadButton3 = ({
	approveBtnClick,
	loading,
	btnText,
	userId,
	balance,
	profit,
	bonus,
}: ApproveBtnProps) => {
	const handleClick = () => {
		approveBtnClick(userId, balance, profit, bonus);
	};

	return (
		<button
			onClick={handleClick}
			className="min-w-[110px] rounded-md  bg-meta-3 text-white py-2 px-3 flex items-center justify-center  gap-x-1"
		>
			{loading ? <Image src={loader} alt="loading icon" height={20} width={20} /> : <FaWallet />}
			{btnText}
		</button>
	);
};

export default UploadButton3;
