"use client";

import { FormEvent, useContext, useEffect, useState } from "react";
import CardDataStats from "../CardDataStats";
import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";
import { TickerTape } from "react-ts-tradingview-widgets";
import TableThree from "../Tables/TableThree";
import { forexPairs, cryptoPairs } from "../data/data";
import { useAppContext } from "@/hooks/useAppContext";
import { useUserContext } from "@/hooks/useUserContext";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/hooks/useAuthContext";

const Dashboard: React.FC = () => {
	const [tradeOption, setTradeOption] = useState("");
	const [tradeType, setTradeType] = useState("");
	const [pairs, setPairs] = useState("");
	const [amount, setAmount] = useState(0);
	const [lotSize, setLotSize] = useState("");
	const [takeProfit, setTakeProfit] = useState("");
	const [stopLoss, setStopLoss] = useState("");

	const { state } = useAppContext();
	const { userDataState, updateTradingSession } = useUserContext();
	const { user } = useAuthContext();

	const router = useRouter();

	const handleSubmit = (e: FormEvent): void => {
		e.preventDefault();

		const tradingSession = {
			tradeOption,
			tradeType,
			pairs,
			amount,
			lotSize,
			takeProfit,
			stopLoss,
			profit: 0,
			status: "pending",
		};

		updateTradingSession(tradingSession);
	};

	useEffect(() => {
		if (!user) {
			router.push("/auth/login");
		}
	}, [userDataState?.user, router]);

	return (
		<>
			<div className="mb-5 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
				<CardDataStats
					title="Total Balance"
					totalUsd={userDataState.totalBalance}
					totalBtc={(userDataState.totalBalance / state.bitcoinRate).toFixed(8)}
					totalEth={(userDataState.totalBalance / state.ethereumRate).toFixed(8)}
				/>
				<CardDataStats
					title="Total Profit"
					totalUsd={userDataState.totalProfit}
					totalBtc={(userDataState.totalProfit / state.bitcoinRate).toFixed(8)}
					totalEth={(userDataState.totalProfit / state.ethereumRate).toFixed(8)}
				/>
				<CardDataStats
					title="Total Bonus"
					totalUsd={userDataState.totalBonus}
					totalBtc={(userDataState.totalBonus / state.bitcoinRate).toFixed(8)}
					totalEth={(userDataState.totalBonus / state.ethereumRate).toFixed(8)}
				/>
			</div>

			<TickerTape colorTheme={state.theme}></TickerTape>

			<div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
				<div className="col-span-12 xl:col-span-9 h-[720px]">
					<AdvancedRealTimeChart theme={state.theme} autosize></AdvancedRealTimeChart>
				</div>

				<form onSubmit={handleSubmit} className="col-span-12 xl:col-span-3 mb-20">
					<div>
						<label className="mb-3 block text-black dark:text-white">Trade Options</label>
						<div className="relative z-20 bg-white dark:bg-form-input mb-3">
							<select
								value={tradeOption}
								onChange={(e) => setTradeOption(e.target.value)}
								required
								placeholder="BUY"
								className="relative text-sm z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
							>
								<option value="">Select Trading Option</option>
								<option value="BUY">BUY</option>
								<option value="SELL">SELL</option>
							</select>
						</div>
					</div>
					<div>
						<label className="mb-3 block text-black dark:text-white">Trade Type</label>
						<div className="relative z-20 bg-white dark:bg-form-input mb-3">
							<select
								value={tradeType}
								required
								onChange={(e) => setTradeType(e.target.value)}
								className="relative text-sm z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
							>
								<option value="">Select Trade Type</option>
								<option value="CRYPTO">CRYPTO</option>
								<option value="FOREX">FOREX</option>
							</select>
						</div>
					</div>
					{tradeType && (
						<div>
							<label className="mb-3 block text-black dark:text-white">Pairs</label>
							<div className="relative z-20 bg-white dark:bg-form-input mb-3">
								<select
									value={pairs}
									required
									onChange={(e) => setPairs(e.target.value)}
									className="relative text-sm z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
								>
									<option value="">Select Pairs</option>
									{tradeType === "FOREX" &&
										forexPairs.map((pair, id) => {
											return (
												<>
													<option key={id} value={pair}>
														{pair}
													</option>
												</>
											);
										})}
									{tradeType === "CRYPTO" &&
										cryptoPairs.map((pair, id) => {
											return (
												<>
													<option key={id} value={pair}>
														{pair}
													</option>
												</>
											);
										})}
								</select>
							</div>
						</div>
					)}
					<div className="mb-3">
						<label className="mb-3 block text-black dark:text-white">Amount</label>
						<input
							value={amount}
							onChange={(e) => setAmount(Number(e.target.value))}
							required
							type="text"
							placeholder="500"
							className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
						/>
					</div>
					<div className="mb-3">
						<label className="mb-3 block text-black dark:text-white">Lot Size</label>
						<div className="relative z-20 bg-white dark:bg-form-input mb-3">
							<select
								value={lotSize}
								required
								onChange={(e) => setLotSize(e.target.value)}
								className="relative text-sm z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
							>
								<option value="">Select Lot Size</option>
								<option value="2LS">2LS</option>
								<option value="5LS">5LS</option>
								<option value="10LS">10LS</option>
								<option value="15LS">15LS</option>
							</select>
						</div>
					</div>
					<div className="mb-3">
						<label className="mb-3 block text-black dark:text-white">Take Profit</label>
						<input
							type="text"
							value={takeProfit}
							required
							onChange={(e) => setTakeProfit(e.target.value)}
							placeholder="1.001"
							className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
						/>
					</div>
					<div className="mb-3">
						<label className="mb-3 block text-black dark:text-white">Stop Loss</label>
						<input
							type="text"
							value={stopLoss}
							required
							onChange={(e) => setStopLoss(e.target.value)}
							placeholder="1.0013"
							className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
						/>
					</div>
					<div className="mb-5">
						<label className="mb-3 block text-black dark:text-white">Time in Force</label>
						<div className="relative z-20 bg-white dark:bg-form-input mb-3">
							<select
								required
								className="relative text-sm z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
							>
								<option value="">Select Time in Force</option>
								<option value="">5 Minutes</option>
								<option value="">10 Minutes</option>
								<option value="">15 Minutes</option>
								<option value="">30 Minutes</option>
							</select>
						</div>
					</div>

					<button
						type="submit"
						className="inline-flex w-full items-center justify-center rounded-md bg-meta-3 py-3 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
					>
						Place Order
					</button>
				</form>

				<div className="col-span-12">
					<TableThree />
				</div>
			</div>
		</>
	);
};

export default Dashboard;
