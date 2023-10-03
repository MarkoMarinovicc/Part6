import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  console.log(response)
  return response.data
}

const postAnec = async (payload) => {
  const response = await axios.post(baseUrl,{content:payload,votes:0})
  console.log(response)
  return response.data
}
const updateVote = async (id, updatedAnecdote) => {
  const response = await axios.put(`${baseUrl}/${id}`, updatedAnecdote);
  console.log(response);
  return response.data;
};

const anecdoteService = { getAll, postAnec, updateVote };


export default anecdoteService;
