import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useEffect, useState } from "react";
import {
  addProduct,
  deleteProduct,
  displayProducts,
  editProduct,
} from "../services/allApi";

const Inventory = () => {
  const [displayProductInTable, setDisplayProductInTable] = useState([]);
  const [inputProductName, setInputProductName] = useState("");
  const [inputProductBrand, setInputProductBrand] = useState("");
  const [inputProductPrice, setInputProductPrice] = useState("");
  const [inputProductQuantity, setInputProductQuantity] = useState("");
  const [inputProductImageURL, setInputProductImageURL] = useState();
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    displayProductTable();
  });

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
      setDisplayProductInTable(apiResponse.data);
    } else {
      console.log("ERROR! Could not display product");
    }
  };

  const addNewProduct = async () => {
    if (inputProductName.trim() == "") {
      alert("Add product name");
    } else if (inputProductBrand.trim() == "") {
      alert("Add product brand");
    } else if (inputProductPrice.trim() == "") {
      alert("Add product price");
    } else if (inputProductQuantity.trim() == "") {
      alert("Add product quantity");
    } else if (inputProductImageURL.trim() == "") {
      alert("Add product image url");
    } else {
      let reqBody = {
        productName: inputProductName,
        productBrand: inputProductBrand,
        productPrice: inputProductPrice,
        productQuantity: inputProductQuantity,
        productImageURL: inputProductImageURL,
      };
      let apiResponse = await addProduct(reqBody);
      if (apiResponse.status == 201) {
        console.log("success");
        setInputProductName("");
        setInputProductBrand("");
        setInputProductPrice("");
        setInputProductQuantity("");
        setInputProductImageURL("");
      } else {
        console.log("ERROR! Could not add product");
      }
    }
  };

  const onCLickEditBtn = (product) => {
    setEditId(product.id);
    setInputProductName(product.productName);
    setInputProductBrand(product.productBrand);
    setInputProductPrice(product.productPrice);
    setInputProductQuantity(product.productQuantity);
    setInputProductImageURL(product.productImageURL);
  };

  const editThisProduct = async () => {
    let editProductObj = {
      productName: inputProductName,
      productBrand: inputProductBrand,
      productPrice: inputProductPrice,
      productQuantity: inputProductQuantity,
      productImageURL: inputProductImageURL,
    };
    let apiResponse = await editProduct(editId, editProductObj);
    if (apiResponse.status == 200) {
      alert("Product details edited");
      setInputProductName("");
      setInputProductBrand("");
      setInputProductPrice("");
      setInputProductQuantity("");
      setInputProductImageURL("");
      setEditId(null);
    } else {
      alert("ERROR! Could not edit product details");
    }
  };

  const deleteThisProduct = async (id) => {
    let apiResponse = await deleteProduct(id);
    if (apiResponse.status == 200) {
      alert("Product deleted");
      displayProductTable();
    } else {
      alert("ERROR! Could not delete product");
    }
  };

  return (
    <>
      <h1 className="font-medium text-4xl text-center m-6 text-sky-600 homeCard">
        Inventory
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-5 justify-center gap-5">
        <div className="py-7 flex flex-col items-center bg-white rounded-2xl border-base-100 shadow homeCard h-fit p-3 col-span-1">
          <fieldset className="fieldset w-full px-3">
            <legend className="fieldset-legend">Name</legend>
            <input
              type="text"
              className="input rounded-lg w-full"
              placeholder="Product Name"
              onChange={(e) => setInputProductName(e.target.value)}
              value={inputProductName}
            />
          </fieldset>

          <fieldset className="fieldset w-full px-3">
            <legend className="fieldset-legend">Brand</legend>
            <input
              type="text"
              className="input rounded-lg w-full"
              placeholder="Product Brand"
              list="browsers"
              onChange={(e) => setInputProductBrand(e.target.value)}
              value={inputProductBrand}
            />
            <datalist id="browsers">
              <option value="Apple"></option>
              <option value="Samsung"></option>
              <option value="Sony"></option>
              <option value="LG"></option>
              <option value="Dell"></option>
              <option value="HP"></option>
              <option value="Lenovo"></option>
              <option value="Asus"></option>
              <option value="Acer"></option>
              <option value="MSI"></option>
              <option value="Microsoft"></option>
              <option value="Google"></option>
              <option value="Intel"></option>
              <option value="AMD"></option>
              <option value="NVIDIA"></option>
              <option value="Nothing"></option>
              <option value="OnePlus"></option>
              <option value="Xiaomi"></option>
              <option value="Oppo"></option>
              <option value="Vivo"></option>
              <option value="Realme"></option>
              <option value="Motorola"></option>
              <option value="Nokia"></option>
              <option value="Huawei"></option>
              <option value="Honor"></option>
              <option value="Panasonic"></option>
              <option value="Philips"></option>
              <option value="Canon"></option>
              <option value="Nikon"></option>
              <option value="Toshiba"></option>
              <option value="BenQ"></option>
              <option value="Logitech"></option>
              <option value="Razer"></option>
              <option value="HyperX"></option>
              <option value="JBL"></option>
              <option value="Bose"></option>
              <option value="Sennheiser"></option>
              <option value="Sony Audio"></option>
              <option value="Beats"></option>
              <option value="Anker"></option>
              <option value="TP-Link"></option>
              <option value="D-Link"></option>
              <option value="Zebronics"></option>
              <option value="Boat"></option>
              <option value="Noise"></option>
              <option value="Fire-Boltt"></option>
              <option value="Syska"></option>
              <option value="Mi"></option>
            </datalist>
          </fieldset>

          <fieldset className="fieldset w-full px-3">
            <legend className="fieldset-legend">Price</legend>
            <label className="input rounded-lg w-full flex items-center">
              <svg
                className="h-[1em] opacity-50 mr-2"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
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
                    d="M6 3H18M6 8H18M14.5 21L6 13H9C15.667 13 15.667 3 9 3"
                    stroke="#000000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>{" "}
                </g>
              </svg>
              <input
                type="number"
                className="tabular-nums w-full"
                required
                placeholder="Price per Unit"
                onChange={(e) => setInputProductPrice(e.target.value)}
                value={inputProductPrice}
              />
            </label>
          </fieldset>

          <fieldset className="fieldset w-full px-3">
            <legend className="fieldset-legend">Quantity</legend>
            <input
              type="number"
              className="input rounded-lg w-full"
              required
              placeholder="Stock Quantity"
              onChange={(e) => setInputProductQuantity(e.target.value)}
              value={inputProductQuantity}
            />
          </fieldset>

          <fieldset className="fieldset w-full px-3">
            <legend className="fieldset-legend">Product Image URL</legend>
            <label className="input w-full flex items-center rounded-lg">
              <svg
                className="h-[1em] opacity-50 mr-2"
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
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                </g>
              </svg>
              <input
                type="url"
                required
                placeholder="https://"
                pattern="^(https?://)?([a-zA-Z0-9]([a-zA-Z0-9\-].*[a-zA-Z0-9])?\.)+[a-zA-Z].*$"
                title="Must be valid URL"
                className="w-full"
                onChange={(e) => setInputProductImageURL(e.target.value)}
                value={inputProductImageURL}
              />
            </label>
          </fieldset>

          {editId ? (
            <>
              <button
                className="btn bg-sky-200 border-0 rounded-full shadow btnSky text-sky-600 mt-3"
                onClick={editThisProduct}
              >
                <svg
                  className="size-[1.2em]"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z"
                      stroke="#000000"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>{" "}
                    <path
                      d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13"
                      stroke="#000000"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>{" "}
                  </g>
                </svg>
                Edit
              </button>
            </>
          ) : (
            <>
              <button
                className="btn btn-soft btn-info mt-3 hover:text-white hover:bg-sky-400 border-0 rounded-2xl"
                onClick={addNewProduct}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-[1.2em]"
                >
                  <path
                    d="M4 12H20M12 4V20"
                    stroke="#000000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Add
              </button>
            </>
          )}
        </div>

        <div className="border-base-100 rounded-2xl shadow p-5 col-span-1 sm:col-span-2 lg:col-span-3 bg-white homeCard">
          <div className="overflow-x-auto">
            <table className="table min-w-full">
              {/* head */}
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {displayProductInTable.length > 0 ? (
                  <>
                    {displayProductInTable.map((eachProduct, index) => (
                      <tr key={index}>
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="avatar">
                              <div className="mask mask-squircle h-20 w-20 sm:h-20 sm:w-20">
                                <img
                                  src={eachProduct.productImageURL}
                                  alt="Product image"
                                  className="object-cover"
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
                        <td>{eachProduct.productQuantity}</td>
                        <td className="text-center">
                          <button
                            className="btn btn-soft btn-warning m-2 hover:text-amber-50 hover:bg-amber-300 border-0 rounded-2xl"
                            onClick={() => onCLickEditBtn(eachProduct)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-soft btn-error m-2 hover:text-red-50 hover:bg-red-400 border-0 rounded-2xl"
                            onClick={() => deleteThisProduct(eachProduct.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </>
                ) : (
                  <>
                    <tr>
                      <td
                        colSpan={5}
                        className="text-center text-red-500 text-lg font-bold"
                      >
                        No Products Added
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
export default Inventory;
