import React, { useState } from "react";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useNotification } from "./NotificationContext.jsx";

import { getAnecdotes, createAnecdote, addVote } from "./service/request";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const App = () => {
  const { showNotification } = useNotification()
  const [newAnecdote, setNewAnecdote] = useState("");

  const queryClient = useQueryClient();
  const results = useQuery(["anecdotes"], getAnecdotes);
  if (results.isError) {
    return <div>anecdote service not available due to problems in server</div>;
  }
  const { mutate } = useMutation(createAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries(["anecdotes"]);
    },
  });
  const { mutate: voteMutate } = useMutation(addVote, {
    onSuccess: () => {
      queryClient.invalidateQueries(["anecdotes"]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newAnecdote.length >= 5) {
      mutate({ content: newAnecdote, votes: 0 });
      setNewAnecdote("");
    } else {
      showNotification("Anecdote content must be at least 5 characters long.");
    }
  };
  const handleVoting = (anecdote) => {
    console.log(anecdote.id);
    const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
    showNotification(`you voted ${anecdote.content}`);
    voteMutate({ id: anecdote.id, ...updatedAnecdote });
  };

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification message={showNotification} />
      <AnecdoteForm />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newAnecdote}
          onChange={(e) => setNewAnecdote(e.target.value)}
          placeholder="Enter a new anecdote"
        />
        <button type="submit">Add Anecdote</button>
      </form>

      {results.isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {results.data.map((anecdote) => (
            <div key={anecdote.id}>
              <div>{anecdote.content}</div>
              <div>
                has {anecdote.votes}
                <button onClick={() => handleVoting(anecdote)}>vote</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
