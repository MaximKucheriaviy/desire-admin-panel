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
