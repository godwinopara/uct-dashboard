export default function BillUser({ status }: { status: string }) {
	const statusTypes: any = {
		Pending: {
			title: "ACCOUNT PENDING",
			message:
				"Something is currently wrong with your account, Please contact your Account manager to be able to regain full access on your personal trading account/portfolio",
		},
		"Signal Fee": {
			title: "SIGNAL FEE CLEARANCE PENDING",
			message:
				"Your signal fee has not been cleared and currently at the point where trading can't continue, Please Contact your Account Manager, clear the deficit for you to be able to regain full access on your personal trading account/portfolio",
		},
		Upgrade: {
			title: "ACCOUNT DUE FOR UPGRADE",
			message:
				"Your Account is due for an upgrade, Please Contact your Account Manager to be able to upgrade and regain full access on your personal trading account/portfolio",
		},
		Insurance: {
			title: "INSURANCE NOTICE",
			message:
				"Fx Trading insurance is currently 0 to enable trade continuation, Please Contact your Account Manager, clear insurance claims on this for you to be able to upgrade and regain full access on your personal trading account/portfolio",
		},
		"Stamp Duty": {
			title: "STAMP DUTY NOTICE",
			message:
				"A stamp duty is a tax that government place on legal documents, involving the transfer of real estate, crypto currencies and other assets. Deposit 10% of your total assets.",
		},
		"Trading Time": {
			title: "TRADING TIME NOTICE",
			message:
				"Trading time is the duration of time an account can trade before running out signals. it enables traders to trade faster and make good profits",
		},
		IRS: {
			title: "IRS NOTICE",
			message:
				"The Internal Revenue Service (IRS) administers and enforces U.S federal tax laws. Placing taxations on all trading accounts and platforms. Deposit 10% to continue trading.",
		},
		"Broker Fee": {
			title: "BROKER FEE NOTICE",
			message:
				"The broker fee is service charge fee by the trading company. Deposit 5% to continue trading.",
		},
		"Account Management Fee": {
			title: "ACCOUNT MANAGEMENT FEE NOTICE",
			message:
				"Account management fee is a fee charged by the trading management. Used for account maintenance purposes. Deposit 5% to continue trading.",
		},
		"Cost Of Transfer": {
			title: "COST OF TRANSFER NOTICE",
			message:
				"Cost of Transfer fee is a fee charged for the transfer of your profits to your designated bank/crypto wallet",
		},
		"Withdrawal Fee": {
			title: "WITHDRAWAL FEES NOTICE",
			message:
				"These are fees charged during the course of withdrawals. Deposit 5% to process withdrawal.",
		},
		"Trade Commission Fee": {
			title: "COMPANY COMMISSION FEE NOTICE",
			message:
				"Company Commission fee is a fee paid to your trade account manager. Deposit 20% of your total balance",
		},
	};

	if (status === "Active") {
		return;
	}

	return (
		<div className="flex justify-center text-center bg-boxdark mb-16 py-8 px-5">
			<div>
				<div>
					<h2 className="font-bold text-xl mb-3 text-warning">{statusTypes[status].title}</h2>
					<h3 className="font-bold mb-3">PLEASE CONTACT YOUR ACCOUNT MANAGER</h3>
				</div>
				<div className="mx-auto md:w-[80%]">
					<p>{statusTypes[status].message}</p>
				</div>
			</div>
		</div>
	);
}
