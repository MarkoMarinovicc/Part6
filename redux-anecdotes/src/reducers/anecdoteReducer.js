import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../service/anecdotes";

const anecdoteSlice = createSlice({
  name: "anecdote",
  initialState: [],

  reducers: {
    // createAnecdotes: (state, action) => {
    //   state.push({ content: action.payload, id: getId(), votes: 0 });
    // },
    addVote: (state, action) => {
      const id = action.payload;
      const index = state.findIndex((item) => item.id === id);
      state[index].votes += 1;
    },
    appendAnecdotes(state, action) {
      state.push(action.payload);
    },
    setAnecdotes: (state, action) => {
      return [...action.payload];
    },
  },
});

export const addAnecd=(anecdote)=>{
  return async dispatch => {
    const newAnecdote = await anecdoteService.postAnec(anecdote)
    dispatch(appendAnecdotes(newAnecdote))
  }
}
export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdote = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdote))
  }
}
export const addVotes = (id) => {
  return async (dispatch, getState) => {
    const findeID = getState().anecdotes.find(anecdote => anecdote.id === id);
    const updatedAnecdote = { ...findeID, votes: findeID.votes + 1 };

    await anecdoteService.updateVote(id, updatedAnecdote);
    dispatch(anecdoteSlice.actions.addVote(id));
  };
};

export const { createAnecdotes, addVote, setAnecdotes, appendAnecdotes } =
  anecdoteSlice.actions;

export default anecdoteSlice.reducer;
