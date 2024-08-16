"use client";
import React, { useState } from "react";

const Summary = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <form className="min-w-0 flex-1 space-y-8 m-3 p-4" onSubmit={handleSubmit}>
      <div>
        <div className="mt-6 w-full space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md">
          <div className="">
            <div className="-my-3 divide-y divide-gray-200 dark:divide-gray-800">
              <dl className="flex items-center justify-between gap-4 py-3">
                <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                  Subtotal
                </dt>
                <dd className="text-base font-medium text-gray-900 dark:text-white">
                  $8,094.00
                </dd>
              </dl>

              <dl className="flex items-center justify-between gap-4 py-3">
                <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                  Savings
                </dt>
                <dd className="text-base font-medium text-green-500">0</dd>
              </dl>

              <dl className="flex items-center justify-between gap-4 py-3">
                <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                  Store Pickup
                </dt>
                <dd className="text-base font-medium text-gray-900 dark:text-white">
                  $99
                </dd>
              </dl>

              <dl className="flex items-center justify-between gap-4 py-3">
                <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                  Tax
                </dt>
                <dd className="text-base font-medium text-gray-900 dark:text-white">
                  $199
                </dd>
              </dl>

              <dl className="flex items-center justify-between gap-4 py-3">
                <dt className="text-base font-bold text-gray-900 dark:text-white">
                  Total
                </dt>
                <dd className="text-base font-bold text-gray-900 dark:text-white">
                  $8,392.00
                </dd>
              </dl>
            </div>
          </div>

          <div className="space-y-3">
            <button
              type="submit"
              className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Proceed to Payment
            </button>

            <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
              One or more items in your cart require an account.{" "}
              <a
                href="#"
                title=""
                className="font-medium text-primary-700 underline hover:no-underline dark:text-primary-500"
              >
                Sign in or create an account now.
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Summary;
