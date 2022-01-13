import axios from 'axios';

const get = async (url) => {
  console.log(`get(${url})`);
  const body = await axios.get(url);
  return body;
};

export default { get };
