import React from "react";

const PNF = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-[calc(100vh-5rem)]  ">
        <img
          src="./Error404.svg"
          alt="Page Not Found"
          className=" h-140 object-contain shadow bg-white rounded-3xl p-2"
        />
        <h1 className="mt-6 text-3xl font-bold text-sky-600">
          Page Not Found!
        </h1>
      </div>
    </>
  );
};

export default PNF;
