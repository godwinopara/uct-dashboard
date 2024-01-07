"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { useUserContext } from "@/hooks/useUserContext";
import { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";

export default function Subscription() {
	const [selectedPlan, setSelectedPlan] = useState({
		plan: "",
		amount: 0,
	});

	const { updateSubscription, userDataState } = useUserContext();

	useEffect(() => {
		if (userDataState.subscription.plan) {
			const { plan, amount } = userDataState.subscription;
			setSelectedPlan({ plan, amount });
		}
	}, []);

	const subscribe = (plan: string, amount: number) => {
		setSelectedPlan({ plan, amount });
		updateSubscription({ plan, amount, duration: 7, date: new Date().toDateString() });
	};

	return (
		<>
			<Breadcrumb pageName="Subscriptions" />
			<div className="mb-10 rounded-md border border-stroke  bg-white py-4 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
				<div className="my-1 flex items-end justify-between">
					<div>
						<h4 className="text-sm font-bold text-black dark:text-white mb-1">GET SUBSCRIPTION</h4>
						<div>
							<span className="text-sm font-medium block">
								Tap on any of the Plans below to purchase a plan.
							</span>
						</div>
					</div>
				</div>
			</div>
			{!selectedPlan.plan && (
				<div className="grid md:grid-cols-2 gap-10">
					<SubscriptionCard
						plan="STANDARD"
						roi="10%"
						planAmount={5920}
						handleClickSubscribe={subscribe}
					/>
					<SubscriptionCard
						plan="SILVER"
						roi="25%"
						planAmount={7370}
						handleClickSubscribe={subscribe}
					/>
					<SubscriptionCard
						plan="GOLD"
						roi="35%"
						planAmount={9910}
						handleClickSubscribe={subscribe}
					/>
					<SubscriptionCard
						plan="VIP"
						roi="55%"
						planAmount={16350}
						handleClickSubscribe={subscribe}
					/>
				</div>
			)}

			{selectedPlan.plan && (
				<div className="border-stroke  bg-white dark:bg-boxdark flex flex-col items-center justify-center text-center h-full py-20">
					<div className="text-6xl text-meta-3 mb-3">
						<FaCheckCircle />
					</div>
					<h2 className="text-2xl font-bold mb-3 text-black dark:text-white">
						Subscription Confirmed!
					</h2>
					<p className="max-w-150 mb-5 text-black dark:text-white">
						Your Subscription to <span className="text-meta-3">{selectedPlan.plan}</span> plan was
						successful and actively running, <br />
						Returns attached to the plan will start reflecting on your Portfolio Balance shortly.
					</p>
					<h3 className="font-bold mb-3 text-black dark:text-white">
						Plan Name: <span className="text-meta-3">{selectedPlan.plan}</span>
					</h3>
					<p className="font-bold text-black dark:text-white">
						Subscribed Amount: <span className="text-meta-3">{selectedPlan.amount}</span>
					</p>
				</div>
			)}
		</>
	);
}

interface SubscriptionCardProps {
	plan: string;
	roi: string;
	planAmount: number;
	handleClickSubscribe: (plan: string, planAmount: number) => void;
}

const SubscriptionCard = ({
	plan,
	roi,
	planAmount,
	handleClickSubscribe,
}: SubscriptionCardProps) => {
	const handleClick = () => {
		handleClickSubscribe(plan, planAmount);
	};

	return (
		<div className="rounded-md border border-stroke  bg-white py-4 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
			<div className="my-1 flex items-end justify-between">
				<div className="w-full">
					<h4 className="text-sm font-bold text-black dark:text-white mb-1">{plan}</h4>
					<div>
						<p className="text-sm font-medium block mb-2">
							<span className="font-bold text-xl text-meta-3">${planAmount}</span> / Minimum
						</p>
						<p className="text-sm mb-2">High ROI After Trading Session</p>
						<div className="flex gap-x-2 mb-2 items-center">
							<FaCheckCircle className="text-meta-3" />
							<p>7Days Duration</p>
						</div>
						<div className="flex gap-x-2 mb-2 items-center">
							<FaCheckCircle className="text-meta-3" />
							<p>{roi} ROI</p>
						</div>
						<div className="flex gap-x-2 items-center">
							<FaCheckCircle className="text-meta-3" />
							<p>24/7 Support</p>
						</div>
					</div>
					<div className="my-8 w-full">
						<label className="mb-2 block text-black dark:text-white">Amount</label>
						<input
							type="text"
							required
							placeholder={`${planAmount}`}
							readOnly
							className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
						/>
					</div>

					<button
						onClick={handleClick}
						className="inline-flex items-center justify-center rounded-md w-full bg-meta-3 py-3 px-6 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
					>
						Subscribe To Plan
					</button>
				</div>
			</div>
		</div>
	);
};
