import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addVotes, initializeAnecdotes } from "../reducers/anecdoteReducer";
import { displayNotification } from "../reducers/notificationReducer";
import Filter from "./Filter";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, [dispatch]);

  const vote = (id, anecdote) => {
    dispatch(addVotes(id));
    dispatch(displayNotification(`you voted ${anecdote}`,1000));
  };

  const filteredAnecdotes = anecdotes.filter(anecdote =>
    anecdote.content && typeof anecdote.content === 'string' && anecdote.content.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      {filteredAnecdotes
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default AnecdoteList;
