"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CardDataStats from "@/components/CardDataStats";
import AssetsTable from "@/components/Tables/AssetsTable";
import { useAppContext } from "@/hooks/useAppContext";
import { useUserContext } from "@/hooks/useUserContext";

import { SingleTicker } from "react-ts-tradingview-widgets";

export default function Assets() {
	const { state } = useAppContext();
	const { userDataState } = useUserContext();

	return (
		<>
			<Breadcrumb pageName="Assets" />
			<div className="grid xl:grid-cols-3 gap-y-10 xl:gap-y-0 xl:gap-x-10 mb-20">
				<CardDataStats title="Total Balance in Dollars" totalUsd={userDataState.totalBalance} />
				<CardDataStats
					title="Total Balance in Bitcoin"
					totalBtc={(userDataState.totalBalance / state.bitcoinRate).toFixed(8)}
				/>
				<CardDataStats
					title="Total Balance in Etherium"
					totalEth={(userDataState.totalBalance / state.ethereumRate).toFixed(8)}
				/>
			</div>

			<div className="mb-20 grid xl:grid-cols-4 gap-10">
				<SingleTicker symbol="BTCUSD" colorTheme="dark" width="100%"></SingleTicker>
				<SingleTicker symbol="ETHBTC" colorTheme="dark" width="100%"></SingleTicker>
				<SingleTicker symbol="ETHUSD" colorTheme="dark" width="100%"></SingleTicker>
				<SingleTicker symbol="BTCUSDT" colorTheme="dark" width="100%"></SingleTicker>
				<SingleTicker symbol="USDJPY" colorTheme="dark" width="100%"></SingleTicker>
				<SingleTicker symbol="USDCAD" colorTheme="dark" width="100%"></SingleTicker>
				<SingleTicker symbol="EURUSD" colorTheme="dark" width="100%"></SingleTicker>
				<SingleTicker symbol="GBPUSD" colorTheme="dark" width="100%"></SingleTicker>
			</div>

			<AssetsTable />
		</>
	);
}
