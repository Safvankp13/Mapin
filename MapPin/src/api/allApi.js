import commonApi from "./commonApi";

const Baseurl = "https://mapin-kofk.onrender.com/pins";

export const getData = async () => {
  return await commonApi('GET', Baseurl, {});
}

export const deleteApi = async (id) => {
  return await commonApi('DELETE', `${Baseurl}/${id}`, {});
}

export const addData = async (data) => {
  return await commonApi('POST', Baseurl, data);
}

export const updateData = async (id, data) => {
  return await commonApi('PUT', `${Baseurl}/${id}`, data);
}