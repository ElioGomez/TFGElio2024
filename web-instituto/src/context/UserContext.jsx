import React, { createContext, useReducer, useContext } from 'react';

// Define el contexto
const UserContext = createContext();

// Define las acciones que se pueden realizar sobre el estado
const SET_USER = 'SET_USER';
const SET_USER_TYPE = 'SET_USER_TYPE';

// Define el estado inicial
const initialState = {
  userId: null,
  userType: null,
};

// Define el reducer que manejará las acciones
const userReducer = (state, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, userId: action.payload };
    case SET_USER_TYPE:
      return { ...state, userType: action.payload };
    default:
      return state;
  }
};

// Define el proveedor del contexto
export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hooks para usar el contexto
export const useUserState = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserState debe ser usado dentro de un UserProvider');
  }
  return context.state;
};

export const useUserDispatch = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserDispatch debe ser usado dentro de un UserProvider');
  }
  return context.dispatch;
};

// Acciones que se pueden despachar
export const setUser = (dispatch, userId) => {
  dispatch({ type: SET_USER, payload: userId });
};

export const setUserType = (dispatch, userType) => {
  dispatch({ type: SET_USER_TYPE, payload: userType });
};
