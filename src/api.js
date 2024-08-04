import axios from "axios";

// production
const BASE_URL = "http://3.111.38.0:5000/api/v1";

// local
// const BASE_URL = 'http://localhost:5000/api/v1/'

const apiFileHeaders = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};
const apiBodyHeaders = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const getBulkUploadFiles = async () => {
  try {
    const { data } = await axios.get(`${BASE_URL}/files/getFiles`);
    return data.data || [];
  } catch (error) {
    console.log(error);
  }
};

export const uploadFile = async (formData) => {
  try {
    const { data } = await axios.post(
      `http://3.111.38.0:5000/upload`,
      formData,
      apiFileHeaders
    );
    return data.url || "";
  } catch (error) {
    console.log(error);
  }
};

export const storeFiles = async (payload) => {
  try {
    const { data } = await axios.post(
      `${BASE_URL}/files/storeFiles`,
      payload,
      apiBodyHeaders
    );
    return data.data || [];
  } catch (error) {
    console.log(error);
  }
};
