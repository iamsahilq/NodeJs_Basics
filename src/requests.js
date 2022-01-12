import axios from 'axios';

const get = async (url) => {
  console.log(`get(${url})`);
  try {
    const body = await axios.get(url);
    return body;
  } catch (error) {
    if (error.isAxiosError) {
      const axiosError = new Error(error.response.data);
      axiosError.message = error.response.data?.message || error.statusText || error.toString();
      axiosError.status = error.response.status || 500;
      throw axiosError;
    }
    throw error;
  }
};

export default { get };
