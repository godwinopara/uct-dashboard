import { FaCheckCircle } from "react-icons/fa";

export default function Subscription() {
	return (
		<>
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

			<div className="grid md:grid-cols-2 gap-10">
				<SubscriptionCard />
				<SubscriptionCard />
				<SubscriptionCard />
				<SubscriptionCard />
			</div>
		</>
	);
}

const SubscriptionCard = () => {
	return (
		<div className="rounded-md border border-stroke  bg-white py-4 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
			<div className="my-1 flex items-end justify-between">
				<div className="w-full">
					<h4 className="text-sm font-bold text-black dark:text-white mb-1">STANDARD</h4>
					<div>
						<p className="text-sm font-medium block mb-2">
							<span className="font-bold text-xl text-meta-3">$5920</span> / Minimum
						</p>
						<p className="text-sm mb-2">High ROI After Trading Session</p>
						<div className="flex gap-x-2 mb-2 items-center">
							<FaCheckCircle className="text-meta-3" />
							<p>7Days Duration</p>
						</div>
						<div className="flex gap-x-2 mb-2 items-center">
							<FaCheckCircle className="text-meta-3" />
							<p>10% ROI</p>
						</div>
						<div className="flex gap-x-2 items-center">
							<FaCheckCircle className="text-meta-3" />
							<p>24/7 Support</p>
						</div>
					</div>
					<div className="my-8 w-full">
						<label className="mb-2 block text-black dark:text-white">Take Profit</label>
						<input
							type="text"
							required
							placeholder="5920"
							className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
						/>
					</div>

					<button className="inline-flex items-center justify-center rounded-md w-full bg-meta-3 py-3 px-6 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
						Subscribe To Plan
					</button>
				</div>
			</div>
		</div>
	);
};
