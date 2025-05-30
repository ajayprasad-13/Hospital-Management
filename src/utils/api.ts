import fetchApi from "../api/FetchaApi";

export const isEmailExist = async (email: string): Promise<boolean> => {
  try {
    const res = await fetchApi.get(`/users`, {
      params: { email },
    });
    return res.data.length > 0;
  } catch (error) {
    return false;
  }
};
