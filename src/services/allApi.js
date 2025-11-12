import axiosConfig from "./axiosConfig";

export const addProduct = async (reqBody) => {
    return await axiosConfig("post", "http://localhost:3000/inventory", reqBody);
};

export const displayProducts = async () => {
    return await axiosConfig("get", "http://localhost:3000/inventory", "");
}

export const editProduct = async (id,reqBody) => {
    return await axiosConfig("put", `http://localhost:3000/inventory/${id}`, reqBody)
}

export const deleteProduct = async (id) => {
    return await axiosConfig("delete", `http://localhost:3000/inventory/${id}`, {})

}

