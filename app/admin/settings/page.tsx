"use client";

import { useAdminContext } from "@/hooks/useAdminContext";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

export default function AdminSettings() {
  const { adminData, updateAdminPaymentOption } = useAdminContext();

  const [paymentMethod, setPaymentMethod] = useState({
    bitcoin: "",
    ethereum: "",
    email: "",
  });

  const [resetPassword, setResetPassword] = useState({
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const { bitcoin, ethereum, email } = adminData;
    setPaymentMethod({ bitcoin, ethereum, email });
  }, [adminData]);

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setResetPassword((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangePassword = async () => {
    if (resetPassword.password !== resetPassword.confirmPassword) {
      return;
    }
    // updatePassword(resetPassword.password);
  };

  const handleUpdatePaymentMethod = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateAdminPaymentOption(paymentMethod);
  };
  return (
    <>
      <>
        <div className="mx-auto max-w-270 text-white">
          <div className="grid grid-cols-5 gap-8">
            <div className="col-span-5  bg-boxdark py-5 rounded-md">
              <div className="rounded-sm bg-box-dark ">
                <div className="py-4 px-7 dark:dark">
                  <h3 className="font-bold text-lg text-white">Payment Method</h3>
                </div>
                <form onSubmit={handleUpdatePaymentMethod} className="p-7">
                  <div className="mb-5">
                    <label className="mb-3 block text-sm font-medium" htmlFor="emailAddress">
                      Bitcoin
                    </label>
                    <div className="relative">
                      <input
                        className="w-full rounded border bg-transparent focus:border-primary-hover bg-gray py-3 pl-4 pr-4 focus-visible:outline-none"
                        type="text"
                        name="bitcoin"
                        required
                        value={paymentMethod.bitcoin}
                        placeholder="Bitcoin Address"
                        onChange={(e) => setPaymentMethod({ ...paymentMethod, bitcoin: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="mb-5">
                    <label className="mb-3 block text-sm font-medium" htmlFor="Username">
                      Ethereum
                    </label>
                    <input
                      className="w-full rounded border bg-transparent  bg-gray py-3 px-4 focus:border-primary  focus-visible:outline-none"
                      type="text"
                      name="username"
                      value={paymentMethod.ethereum}
                      placeholder="Ethereum Address"
                      onChange={(e) => setPaymentMethod({ ...paymentMethod, ethereum: e.target.value })}
                    />
                  </div>
                  <div className="flex gap-4 mt-6">
                    <button
                      className="flex justify-center rounded  text-white bg-meta-3 py-2 px-6 font-medium  hover:bg-opacity-95"
                      type="submit"
                    >
                      Update Payment Method
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-8 mt-10">
            <div className="col-span-5 bg-boxdark py-5">
              <div className="rounded-sm  shadow-default dark:dark dark:bg-boxdark">
                <div className="py-4 px-7 dark:dark">
                  <h3 className="font-bold text-lg">Update Password</h3>
                </div>
                <div className="p-7">
                  <form onSubmit={handleChangePassword}>
                    <div className="mb-5.5 flex flex-col gap-5.5 ">
                      <div className="mb-5">
                        <label className="mb-3 block text-sm font-medium" htmlFor="Username">
                          Password
                        </label>
                        <input
                          className="w-full rounded border bg-transparent  bg-gray py-3 px-4  focus:border-meta3text-meta-3 focus-visible:outline-none"
                          type="text"
                          name="password"
                          onChange={handlePasswordChange}
                          value={resetPassword.password}
                          placeholder="Password"
                        />
                      </div>

                      <div className="mb-4">
                        <label className="mb-3 block text-sm font-medium" htmlFor="Username">
                          Confirm Password
                        </label>
                        <input
                          className="w-full rounded border bg-transparent py-3 px-4  focus:border-meta3text-meta-3 focus-visible:outline-none"
                          type="text"
                          name="confirmPassword"
                          onChange={handlePasswordChange}
                          value={resetPassword.confirmPassword}
                          placeholder="Confirm Password"
                        />
                      </div>
                    </div>

                    <div className="flex">
                      <button
                        className="flex justify-center rounded  text-white bg-meta-3 py-2 px-6 font-medium  hover:bg-opacity-95"
                        type="submit"
                      >
                        Change Password
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
}
