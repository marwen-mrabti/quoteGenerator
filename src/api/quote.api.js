import axios from "axios";

export const getQuote = async () => {
  const response = await axios.get("https://api.quotable.io/random");
  return {
    text: response.data.content,
    author: response.data.author,
  };
};
