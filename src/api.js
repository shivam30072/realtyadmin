import axios from "axios";

// production
const BASE_URL = "https://3.111.38.0/api/v1";

// local
// const BASE_URL = "http://localhost:5000/api/v1";

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
      `https://3.111.38.0/upload`,
      // `http://localhost:5000/upload`,
      formData,
      apiFileHeaders
    );
    return data.urls;
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

export const getProperties = async (pageNumber) => {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/property/getProperties?pageNumber=${pageNumber}`,
      apiBodyHeaders
    );
    return data.data || {};
  } catch (error) {
    console.log(error);
  }
};

export const addImagesForProperty = async (payload) => {
  try {
    const { data } = await axios.post(
      `${BASE_URL}/property/addImagesForProperty`,
      payload,
      apiBodyHeaders
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
