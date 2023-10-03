import { createContext, useContext, useReducer } from "react";

const NotificationContext = createContext();

export const useNotification = () => {
  return useContext(NotificationContext);
};

export const NotificationProvider = ({ children }) => {
  const initialState = {
    message: "",
    isVisible: false,
  };

  const notificationReducer = (state, action) => {
    switch (action.type) {
      case "SHOW_NOTIFICATION":
        return { message: action.payload, isVisible: true };
      case "HIDE_NOTIFICATION":
        return { ...state, isVisible: false };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(notificationReducer, initialState);

  const showNotification = (message) => {
    dispatch({ type: "SHOW_NOTIFICATION", payload: message });
    setTimeout(() => {
      dispatch({ type: "HIDE_NOTIFICATION" });
    }, 5000); 
  };

  return (
    <NotificationContext.Provider
      value={{
        message: state.message,
        isVisible: state.isVisible,
        showNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
