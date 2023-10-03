import { useDispatch } from "react-redux";
import { addAnecd } from "../reducers/anecdoteReducer";
import { useState } from "react";

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const [stanje, setStanje] = useState("");
  const addAnecdote = (event) => {
    event.preventDefault();
    dispatch(addAnecd(stanje));

    setStanje("");
  };
  return (
    <div>
      {" "}
      <h2>create new</h2>
      <form>
        <div>
          <input
            onChange={(e) => setStanje(e.target.value)}
            value={stanje}
            name="anec"
          />
        </div>
        <button type="submit" onClick={addAnecdote}>
          create
        </button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
