import axios from "axios";
import { SERVER_BASE_API } from "./server_url";

export const matchUser = async () => {
  try {
    const { data } = await axios.get(`${SERVER_BASE_API}/api/v1/match`, {
      withCredentials: true,
    });
    return data.matches;
  } catch (error: any) {
    return error.response.data.msg;
  }
};

export const getUserProfiles = async () => {
  try {
    const { data } = await axios.get(
      `${SERVER_BASE_API}/api/v1/match/user-profiles`,
      { withCredentials: true }
    );
    return data.users;
  } catch (error: any) {
    return error.response.data.msg;
  }
};

export const swipeRight = async (user: any) => {
  try {
    const { data } = await axios.post(
      `${SERVER_BASE_API}/api/v1/match/swipe-right/${user._id}`,
      {},
      { withCredentials: true }
    );
    return data.msg;
  } catch (error: any) {
    return error.response?.data?.msg;
  }
};

export const swipeLeft = async (user: any) => {
  try {
    const { data } = await axios.post(
      `${SERVER_BASE_API}/api/v1/match/swipe-left/${user._id}`,
      {},
      { withCredentials: true }
    );
    return data.msg;
  } catch (error: any) {
    return error.response?.data?.msg;
  }
};

export const getUserMatches = async (userId: any) => {
  try {
    const { data } = await axios.get(
      `${SERVER_BASE_API}/api/v1/match/get-macthes/${userId}`,
      { withCredentials: true }
    );
    return data.matches;
  } catch (error: any) {
    return error.response?.data?.msg;
  }
};
