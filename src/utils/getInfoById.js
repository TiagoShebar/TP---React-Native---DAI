import axios from "axios";
import { API_KEY, BASE_URL } from '@env';

export const getInfoById = async (id) => {
    try {
        const urlFinal = `${BASE_URL}/${id}/information`;
      const response = await axios.get(urlFinal, {
        params: {
          apiKey: API_KEY,
        },
      });
      console.log("aaa");
      return response.data;
    } catch (error) {
      console.error('Error fetching info:', error);
    }
  };