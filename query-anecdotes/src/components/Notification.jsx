import React from "react";

const Notification = ({ message }) => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={style}>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Notification;
