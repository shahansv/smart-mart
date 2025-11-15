import React, { useEffect, useState } from "react";

const BillPreview = ({ purchasedProduct }) => {
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    setTotalCost(calculateTotal());
  }, [purchasedProduct]);

  const calculateTotal = () => {
    return purchasedProduct.product.reduce(
      (acc, curr) => acc + Number(curr.productPrice),
      0
    );
  };

  return (
    <>
      <div className="border border-base-300  min-h-110 w-full p-10 bg-white rounded-2xl shadow-xl ">
        <div className="flex justify-between">
          <h1 className="text-4xl font-semibold">Invoice</h1>
          <img
            src="/smartMartLogo.svg"
            alt="/Smart Mart Logo"
            className="h-10"
          />
        </div>
        <div className="mt-15">
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {purchasedProduct.product.length > 0 ? (
                  purchasedProduct.product.map((eachProduct, index) => (
                    <tr key={index}>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle h-12 w-12">
                              <img
                                src={eachProduct.productImageURL}
                                alt="Avatar"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">
                              {eachProduct.productName}
                            </div>
                            <div className="text-sm opacity-50">
                              {eachProduct.productBrand}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td>₹{eachProduct.productPrice}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={2}
                      className="text-red-500 font-bold text-center text-lg p-4"
                    >
                      No Products Added
                    </td>
                  </tr>
                )}
              </tbody>

              {/* foot */}
              <tfoot>
                <tr>
                  <th>Total</th>
                  <th className="text-lg text-sky-700">₹{totalCost}</th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default BillPreview;
