import axios from "axios";

const baseURL = "http://localhost:3001/anecdotes";

export const getAnecdotes = async () => {
  try {
    const response = await axios.get(baseURL);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createAnecdote = async (content) => {
  try {
    const response = await axios.post(baseURL, content);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const addVote = async (payload)=> {
  try {
    const response =await axios.put(`${baseURL}/${payload.id}`,payload);
    console.log(response.data)
    return response.data;
  } catch (error) {
    throw error;
  }
};
