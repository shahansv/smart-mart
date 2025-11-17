import React, { useState } from "react";
import BillProductList from "../components/BillProductList";
import BillPreview from "../components/BillPreview";
import { saveInvoice, updateQuantity } from "../services/allApi";
import Swal from "sweetalert2";

const Billing = () => {
  const [purchasedProduct, setPurchasedProduct] = useState({
    product: [],
  });

  const removedProductQuantityUpdate = async (lastProduct) => {
    try {
      let reqBody = { productQuantity: lastProduct.productQuantity };
      await updateQuantity(lastProduct.id, reqBody);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "ERROR!",
        text: "Something went wrong",
      });
    }
  };

  const removeLastAddedProduct = () => {
    const current = purchasedProduct;
    const lastProduct = current.product[current.product.length - 1];
    removedProductQuantityUpdate(lastProduct);
    const updatedList = current.product.slice(0, -1);

    setPurchasedProduct({
      ...current,
      product: updatedList,
    });
  };

  const saveAndDownloadInvoice = async () => {
    try {
      let apiResponse = await saveInvoice(purchasedProduct);
      console.log(apiResponse.status);
      if (apiResponse.status == 201) {
        setPurchasedProduct({ product: [] });
        Swal.fire({
          icon: "success",
          title: "Invoice Created",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "ERROR!",
          text: "Failed to save invoice",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "ERROR!",
        text: "Failed to save invoice",
      });
    }
  };

  return (
    <>
      <h1 className="font-medium text-4xl text-center m-6 text-sky-600 homeCard ">
        Billing
      </h1>

      <div className="pe-10 text-end homeCard h-8">
        {purchasedProduct.product.length > 0 ? (
          <>
            <div className="pe-10 text-end homeCard">
              <button
                className=" m-1 btn btn-soft btn-warning hover:text-amber-50 hover:bg-amber-300 border-0 rounded-2xl"
                onClick={removeLastAddedProduct}
              >
                <svg
                  className="size-[1.2em]"
                  viewBox="0 0 24 24"
                  fill="#1C274C"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M18.22,17H9.8a2,2,0,0,1-2-1.55L5.2,4H3A1,1,0,0,1,3,2H5.2a2,2,0,0,1,2,1.55L9.8,15h8.42L20,7.76A1,1,0,0,1,22,8.24l-1.81,7.25A2,2,0,0,1,18.22,17ZM16.5,19A1.5,1.5,0,1,0,18,20.5,1.5,1.5,0,0,0,16.5,19Zm-5,0A1.5,1.5,0,1,0,13,20.5,1.5,1.5,0,0,0,11.5,19ZM18,8a1,1,0,0,0-1-1H11a1,1,0,0,0,0,2h6A1,1,0,0,0,18,8Z" />
                </svg>
                Remove Last Product
              </button>
              <button
                className=" m-1 btn btn-soft btn-info hover:text-white hover:bg-sky-400 border-0 rounded-2xl"
                onClick={saveAndDownloadInvoice}
              >
                <svg
                  className="size-[1.2em]"
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
                    <path
                      d="M12.5535 16.5061C12.4114 16.6615 12.2106 16.75 12 16.75C11.7894 16.75 11.5886 16.6615 11.4465 16.5061L7.44648 12.1311C7.16698 11.8254 7.18822 11.351 7.49392 11.0715C7.79963 10.792 8.27402 10.8132 8.55352 11.1189L11.25 14.0682V3C11.25 2.58579 11.5858 2.25 12 2.25C12.4142 2.25 12.75 2.58579 12.75 3V14.0682L15.4465 11.1189C15.726 10.8132 16.2004 10.792 16.5061 11.0715C16.8118 11.351 16.833 11.8254 16.5535 12.1311L12.5535 16.5061Z"
                      fill="#1C274C"
                    ></path>
                    <path
                      d="M3.75 15C3.75 14.5858 3.41422 14.25 3 14.25C2.58579 14.25 2.25 14.5858 2.25 15V15.0549C2.24998 16.4225 2.24996 17.5248 2.36652 18.3918C2.48754 19.2919 2.74643 20.0497 3.34835 20.6516C3.95027 21.2536 4.70814 21.5125 5.60825 21.6335C6.47522 21.75 7.57754 21.75 8.94513 21.75H15.0549C16.4225 21.75 17.5248 21.75 18.3918 21.6335C19.2919 21.5125 20.0497 21.2536 20.6517 20.6516C21.2536 20.0497 21.5125 19.2919 21.6335 18.3918C21.75 17.5248 21.75 16.4225 21.75 15.0549V15C21.75 14.5858 21.4142 14.25 21 14.25C20.5858 14.25 20.25 14.5858 20.25 15C20.25 16.4354 20.2484 17.4365 20.1469 18.1919C20.0482 18.9257 19.8678 19.3142 19.591 19.591C19.3142 19.8678 18.9257 20.0482 18.1919 20.1469C17.4365 20.2484 16.4354 20.25 15 20.25H9C7.56459 20.25 6.56347 20.2484 5.80812 20.1469C5.07435 20.0482 4.68577 19.8678 4.40901 19.591C4.13225 19.3142 3.9518 18.9257 3.85315 18.1919C3.75159 17.4365 3.75 16.4354 3.75 15Z"
                      fill="#1C274C"
                    ></path>
                  </g>
                </svg>
                Save & Download invoice
              </button>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 p-5 justify-center gap-4 w-full">
        <BillProductList
          purchasedProduct={purchasedProduct}
          setPurchasedProduct={setPurchasedProduct}
        />

        <div className="flex flex-col items-center bg-white rounded-2xl border-base-100 shadow homeCard h-fit p-4 col-span-1 w-full">
          <BillPreview purchasedProduct={purchasedProduct} />
        </div>
      </div>
    </>
  );
};

export default Billing;
