import React, { useEffect, useState } from "react";
import { getSavedInvoice } from "../services/allApi";
import BillPreview from "../components/BillPreview";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const History = () => {
  const [invoiceData, setInvoiceData] = useState([]);

  useEffect(() => {
    displayInvoiceData();
  }, []);

  useGSAP(() => {
    gsap.from(".homeCard", {
      y: 4,
      duration: 0.8,
      opacity: 0,
      delay: 0.3,
    });
  });

  const displayInvoiceData = async () => {
    const apiResponse = await getSavedInvoice();
    setInvoiceData(apiResponse.data);
  };

  return (
    <div className="p-5">
      <h1 className="font-medium text-4xl text-center m-6 text-sky-600 homeCard ">
        History
      </h1>

      {invoiceData.length == 0 ? (
        <p className="text-red-500 font-bold text-center text-lg p-4">
          No saved invoices
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 homeCard">
          {invoiceData.map((eachProduct) => (
            <BillPreview purchasedProduct={eachProduct} />
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
