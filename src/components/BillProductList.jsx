import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useEffect, useState } from "react";
import { displayProducts, reduceQuantity } from "../services/allApi";
import Swal from "sweetalert2";

const BillProductList = ({ purchasedProduct, setPurchasedProduct }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [displayProductInTable, setDisplayProductInTable] = useState([]);

  useEffect(() => {
    displayProductTable();
  }, []);

  useGSAP(() => {
    gsap.from(".homeCard", {
      y: 4,
      duration: 0.8,
      opacity: 0,
      delay: 0.3,
    });
  });

  const displayProductTable = async () => {
    let apiResponse = await displayProducts();
    if (apiResponse.status == 200) {
      setAllProducts(apiResponse.data);
      setDisplayProductInTable(apiResponse.data);
    } else {
      Swal.fire({
        icon: "error",
        title: "ERROR!",
        text: "Could not display product",
      });
    }
  };

  const searchProduct = (search) => {
    const searchedProduct = search.toLowerCase().trim();
    const filtered = allProducts.filter((eachProduct) =>
      eachProduct.productName.toLowerCase().includes(searchedProduct)
    );
    setDisplayProductInTable(filtered);
  };

  const reduceQuantityFromInventory = async (cartProducts) => {
    if (cartProducts.productQuantity > 0) {
      let reqBody = {
        productQuantity: cartProducts.productQuantity - 1,
      };
      await reduceQuantity(cartProducts.id, reqBody);
      addToCart(cartProducts);
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops",
        text: "The Product is out of stock!",
      });
    }
  };

  const addToCart = (cartProducts) => {
    displayProductTable();
    setPurchasedProduct({
      ...purchasedProduct,
      product: [...purchasedProduct.product, cartProducts],
    });
  };

  return (
    <>
      <div className="flex flex-col items-center bg-white rounded-2xl border-base-100 shadow homeCard h-fit col-span-1 p-6 w-full">
        <label className="input mt-3 rounded-xl outline-0">
          <div className="flex items-center gap-3 px-3">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              type="text"
              required
              placeholder="Search by product name"
              onChange={(e) => searchProduct(e.target.value)}
            />
          </div>
        </label>

        <div className="mt-6 w-full">
          <div className="overflow-x-auto w-full">
            <table className="table table-compact w-full">
              {/* head */}
              <thead>
                <tr>
                  <th>Product</th>
                  <th className="hidden sm:table-cell">Price</th>
                  <th className="hidden sm:table-cell">Quantity</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {displayProductInTable.length > 0 ? (
                  <>
                    {displayProductInTable.map((eachProduct, index) => (
                      <tr key={index} className="align-top">
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="avatar shrink-0">
                              <div className="mask mask-squircle h-10 w-10 sm:h-12 sm:w-12">
                                <img
                                  src={eachProduct.productImageURL}
                                  alt={eachProduct.productName}
                                  className="object-cover h-full w-full"
                                />
                              </div>
                            </div>
                            <div className="min-w-0">
                              <div className="font-bold truncate">
                                {eachProduct.productName}
                              </div>
                              <div className="text-sm opacity-50 truncate">
                                {eachProduct.productBrand}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td>₹{eachProduct.productPrice}</td>
                        <td>{eachProduct.productQuantity}</td>

                        <td>
                          <button
                            className="btn btn-soft btn-info m-2 hover:text-white hover:bg-sky-400 border-0 rounded-2xl"
                            onClick={() =>
                              reduceQuantityFromInventory(eachProduct)
                            }
                          >
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="size-[1.2em]"
                            >
                              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                              <g
                                id="SVGRepo_tracerCarrier"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></g>
                              <g id="SVGRepo_iconCarrier">
                                {" "}
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M14 2C14 1.44772 13.5523 1 13 1C12.4477 1 12 1.44772 12 2V8.58579L9.70711 6.29289C9.31658 5.90237 8.68342 5.90237 8.29289 6.29289C7.90237 6.68342 7.90237 7.31658 8.29289 7.70711L12.2929 11.7071C12.6834 12.0976 13.3166 12.0976 13.7071 11.7071L17.7071 7.70711C18.0976 7.31658 18.0976 6.68342 17.7071 6.29289C17.3166 5.90237 16.6834 5.90237 16.2929 6.29289L14 8.58579V2ZM1 3C1 2.44772 1.44772 2 2 2H2.47241C3.82526 2 5.01074 2.90547 5.3667 4.21065L5.78295 5.73688L7.7638 13H18.236L20.2152 5.73709C20.3604 5.20423 20.9101 4.88998 21.4429 5.03518C21.9758 5.18038 22.29 5.73006 22.1448 6.26291L20.1657 13.5258C19.9285 14.3962 19.1381 15 18.236 15H8V16C8 16.5523 8.44772 17 9 17H16.5H18C18.5523 17 19 17.4477 19 18C19 18.212 18.934 18.4086 18.8215 18.5704C18.9366 18.8578 19 19.1715 19 19.5C19 20.8807 17.8807 22 16.5 22C15.1193 22 14 20.8807 14 19.5C14 19.3288 14.0172 19.1616 14.05 19H10.95C10.9828 19.1616 11 19.3288 11 19.5C11 20.8807 9.88071 22 8.5 22C7.11929 22 6 20.8807 6 19.5C6 18.863 6.23824 18.2816 6.63048 17.8402C6.23533 17.3321 6 16.6935 6 16V14.1339L3.85342 6.26312L3.43717 4.73688C3.31852 4.30182 2.92336 4 2.47241 4H2C1.44772 4 1 3.55228 1 3ZM16 19.5C16 19.2239 16.2239 19 16.5 19C16.7761 19 17 19.2239 17 19.5C17 19.7761 16.7761 20 16.5 20C16.2239 20 16 19.7761 16 19.5ZM8 19.5C8 19.2239 8.22386 19 8.5 19C8.77614 19 9 19.2239 9 19.5C9 19.7761 8.77614 20 8.5 20C8.22386 20 8 19.7761 8 19.5Z"
                                  fill="#000000"
                                ></path>{" "}
                              </g>
                            </svg>
                            <span className="ml-1">Add</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </>
                ) : (
                  <>
                    <tr>
                      <td
                        colSpan={4}
                        className="text-center text-red-500 text-lg font-bold"
                      >
                        No Products Found
                      </td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default BillProductList;
