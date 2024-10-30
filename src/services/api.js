import axios from "axios";

axios.defaults.baseURL = "http://localhost:3001/api";

export const createBrand = async (name) => {
  try {
    const result = await axios.post("/brand", { name });
    return result.data;
  } catch (err) {
    console.log(err);
  }
};

export const getAllBrands = async () => {
  try {
    const data = await axios.get("/brand");
    return data.data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteBrand = async (_id) => {
  try {
    const data = await axios.delete("/brand", { data: { _id } });
    return data.data;
  } catch (err) {
    console.log(err);
  }
};

export const getCategories = async () => {
  try {
    const data = await axios.get("/service/categories");
    return data.data;
  } catch (err) {
    console.log(err);
  }
};

export const getTypes = async (catID) => {
  try {
    const data = await axios.get(`/service/categories/types/${catID}`);
    return data.data;
  } catch (err) {
    console.log(err);
  }
};

export const createItem = async (data) => {
  try {
    const result = await axios.post("/item", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return result.data;
  } catch (err) {
    console.log(err);
  }
};

export const getAllItems = async (data) => {
  try {
    const items = await axios.get("/item");
    return items.data;
  } catch (err) {
    console.log(err);
  }
};

export const getItemByID = async (ID) => {
  try {
    const item = await axios.get(`/item/${ID}`);
    return item.data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteItem = async (id) => {
  try {
    const item = await axios.delete(`/item`, { data: { id } });
    return item.data;
  } catch (err) {
    console.log(err);
  }
};

export const updateItem = async (id, fields) => {
  try {
    const item = await axios.patch(`/item/${id}`, { fields });
    return item.data;
  } catch (err) {
    console.log(err);
  }
};

export const createStoredItem = async (data) => {
  try {
    const result = await axios.post("/storeditem", data);
    return result.data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteStoredItem = async (id) => {
  try {
    const data = await axios.delete("/storeditem", { data: { id } });
    return data.data;
  } catch (err) {
    console.log(err);
  }
};

export const updateStoredItem = async (id, fields) => {
  try {
    const item = await axios.patch(`/storeditem/${id}`, { fields });
    return item.data;
  } catch (err) {
    console.log(err);
  }
};

export const updateItemImage = async (id, data) => {
  try {
    const result = await axios.patch(`/item/image/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return result.data;
  } catch (err) {
    console.log(err);
  }
};

export const createStyle = async (name, type) => {
  try {
    const result = await axios.post("/style", { name, type });
    return result.data;
  } catch (err) {
    console.log(err);
  }
};

export const getAllStyles = async (type) => {
  try {
    const result = await axios.get("/style");
    return result.data;
  } catch (err) {
    console.log(err);
  }
};

export const getTopStyle = async () => {
  try {
    const result = await axios.get("/style/top");
    return result.data;
  } catch (err) {
    console.log(err);
  }
};

export const getBottomStyle = async () => {
  try {
    const result = await axios.get("/style/bottom");
    return result.data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteStyle = async (_id) => {
  try {
    const data = await axios.delete("/style", { data: { _id } });
    return data.data;
  } catch (err) {
    console.log(err);
  }
};

export const addImageToSet = async (id, data) => {
  try {
    const result = await axios.patch(`/item/imageset/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return result.data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteImageFromSet = async (id, image) => {
  try {
    const data = await axios.patch(`/item/imageset/delete/${id}`, {
      imageID: image._id,
      publickID: image.id,
    });
    return data.data;
  } catch (err) {
    console.log(err);
  }
};
