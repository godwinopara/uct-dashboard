import Link from "next/link";
import { FaBitcoin, FaEthereum, FaGg } from "react-icons/fa";

type Asset = {
	logo: any;
	abbr: string;
	name: string;
};

const AssetData: Asset[] = [
	{
		logo: <FaBitcoin />,
		abbr: "BTC",
		name: "Bitcoin",
	},
	{
		logo: <FaEthereum />,
		abbr: "ETH",
		name: "Ethereum",
	},
	{
		logo: <FaGg />,
		abbr: "LTH",
		name: "Litcoin",
	},
];

export default function AssetsTable() {
	return (
		<div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
			<h2 className="font-bold text-xl mb-5">Assets</h2>
			<div className="max-w-full overflow-x-auto">
				<table className="w-full table-auto">
					<thead>
						<tr className="bg-gray-2 text-left dark:bg-meta-4">
							<th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white">
								Assets
							</th>
							<th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white">
								Name
							</th>

							<th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
								Action
							</th>
						</tr>
					</thead>
					<tbody>
						{AssetData.map((assetItem, key) => (
							<tr key={key}>
								<td className="border-b border-[#eee] flex items-center gap-x-2 py-5 px-4 dark:border-strokedark">
									{assetItem.logo}
									<h5 className="text-black  dark:text-white">{assetItem.abbr}</h5>
								</td>
								<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
									<h5 className="font-medium text-black dark:text-white">{assetItem.name}</h5>
								</td>

								<td className="border-b border-[#eee]  dark:border-strokedark">
									<Link
										href="/deposit"
										className="inline-flex items-center justify-center rounded-md border border-meta-3 py-2 px-6 text-center font-medium text-meta-3 hover:bg-opacity-90 lg:px-8 xl:px-10"
									>
										Deposit
									</Link>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
