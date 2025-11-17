import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  useGSAP(() => {
    gsap.from(".homeCard", {
      y: 4,
      duration: 0.8,
      opacity: 0,
      delay: 0.3,
    });
  });

  return (
    <>
      <div className="pt-5 px-3 mt-7 text-center homeCard">
        <h1 className="text-3xl md:text-4xl font-bold my-3 text-sky-600">
          Welcome to SmartMart
        </h1>
        <p className="font-semibold">
          Manage your store efficiently
        </p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-3">
          <div className="p-6">
            <div className="rounded-2xl p-5 text-center flex flex-col justify-center h-80 bg-sky-50 shadow homeCard">
              <img
                src="./inventory.svg"
                alt="inventory"
                className="h-20 my-3"
              />
              <h2 className="text-2xl font-medium text-sky-600">
                Manage Inventory
              </h2>
              <p className="my-2">
                Add, edit, or remove items from the store stock.
              </p>
              <Link
                to={"/inventory"}
                className="btn btn-soft btn-info m-2 hover:text-white hover:bg-sky-400 border-0 rounded-2xl mt-auto bg-sky-200 text-sky-600"
              >
                Go to Inventory
              </Link>
            </div>
          </div>

          <div className="p-6">
            <div className="rounded-2xl p-5 text-center flex flex-col justify-center h-80 bg-sky-50 shadow homeCard">
              <img src="./receipt-rupee.svg" alt="bill" className="h-20 my-3" />
              <h2 className="text-2xl font-medium text-sky-600">Create Bill</h2>
              <p className="my-2">
                Make a bill and automatically update stock quantities.
              </p>
              <Link
                to={"/billing"}
                className="btn btn-soft btn-info m-2 hover:text-white hover:bg-sky-400 border-0 rounded-2xl mt-auto bg-sky-200 text-sky-600"
              >
                Go to Billing
              </Link>
            </div>
          </div>

          <div className="p-6">
            <div className="rounded-2xl p-5 text-center flex flex-col justify-center h-80 bg-sky-50 shadow homeCard">
              <img src="./history.svg" alt="history" className="h-20 my-3" />
              <h2 className="text-2xl font-medium text-sky-600">View Bills</h2>
              <p className="my-2">
                Check previous bills.
              </p>
              <Link
                to={"/history"}
                className="btn btn-soft btn-info m-2 hover:text-white hover:bg-sky-400 border-0 rounded-2xl mt-auto bg-sky-200 text-sky-600"
              >
                View Bills
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
