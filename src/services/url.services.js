import axios from 'axios';

export const getUrls = (parameters) => {
    return axios.get(`${process.env.VUE_APP_APIURL}/urls`, { params: parameters});
};

export const createUrl = (data) => {
    return axios.post(`${process.env.VUE_APP_APIURL}/urls`, data);
}

export default {
    getUrls,
    createUrl,
};
  