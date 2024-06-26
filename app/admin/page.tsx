"use client";
// import { useAdminContext } from "@/hooks/useAdminContext";
import { useAdminContext } from "@/hooks/useAdminContext";
import Link from "next/link";
import { FaIdCard, FaUsers } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { SlWallet } from "react-icons/sl";

export default function Admin() {
  const { usersData } = useAdminContext();

  const verifications: any = [];
  const withdrawalHistory: any = [];

  usersData.forEach((data: any) => {
    if (data.verification?.document) {
      verifications.push(data);
    }
    if (data.withdrawalHistory) {
      data.withdrawalHistory.forEach((hist: any) => {
        withdrawalHistory.push(hist);
      });
    }
  });

  return (
    <section className="grid gap-y-8 xl:gap-y-0 xl:grid-cols-3  xl:gap-x-5">
      <DashboardCard img={<FaUsers />} title="Active Users" total={usersData.length} />
      {/* <DashboardCard img={<FaUsers />} title="Blocked Users" total="1" /> */}
      <DashboardCard img={<FaIdCard />} title="Pending Verification" total={verifications.length} />
      <DashboardCard img={<SlWallet />} title="Pending Withdrawal" total={withdrawalHistory.length} />
    </section>
  );
}

interface DashboardCardProps {
  img: any;
  title: string;
  total: string;
}
const DashboardCard = ({ img, title, total }: DashboardCardProps) => {
  return (
    <div>
      <div className="rounded-t-md   bg-white py-4 px-5 shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="my-2 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">{total}</h2>
            <p className="text-lg">{title}</p>
          </div>
          <div className="text-4xl opacity-20">{img}</div>
        </div>
      </div>
      <div className="py-2 dark:border-strokedark dark:bg-boxdark">
        <Link href="#" className="flex justify-end pr-5 item-center gap-x-2">
          <div>More Info</div>
          <div className="flex items-center mt-1">
            <FaArrowRightLong />
          </div>
        </Link>
      </div>
    </div>
  );
};
