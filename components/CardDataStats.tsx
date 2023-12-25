import React, { ReactNode } from "react";
import { FaBitcoin, FaEthereum, FaMoneyCheckAlt } from "react-icons/fa";

interface CardDataStatsProps {
	title: string;
	totalUsd?: number;
	totalBtc?: string;
	totalEth?: string;
	// children: ReactNode;
}

const CardDataStats: React.FC<CardDataStatsProps> = ({ title, totalUsd, totalBtc, totalEth }) => {
	return (
		<div className="rounded-md border border-stroke  bg-white py-4 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
			<div className="my-2 flex items-end justify-between">
				<div>
					<span className="text-sm font-medium mb-2 block">{title}</span>

					{totalUsd && (
						<h4 className="text-title-sm font-bold text-black dark:text-white mb-1 flex items-center gap-x-2">
							<span className="text-meta-3">
								<FaMoneyCheckAlt />
								{"  "}
							</span>
							${totalUsd}
						</h4>
					)}
					{totalBtc && (
						<h4 className="text-title-xs  text-black dark:text-white flex items-center gap-x-2 mb-1">
							<span className="text-amber-500">
								<FaBitcoin />
								{"  "}
							</span>
							{totalBtc} BTC
						</h4>
					)}
					{totalEth && (
						<h4 className="text-title-xs  text-black dark:text-white flex items-center gap-x-2">
							<span>
								<FaEthereum />
								{"  "}
							</span>
							{totalEth} ETH
						</h4>
					)}
				</div>
			</div>
		</div>
	);
};

export default CardDataStats;
