import axios from "axios";

export const API_URL = process.env.REACT_APP_API_URL;

export const fetchUserData = () => {
    return axios(API_URL)
}
