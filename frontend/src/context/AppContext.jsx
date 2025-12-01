import { createContext, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';

// Initial state
const initialState = {
  user: null,
  loading: false,
  error: null,
  backendData: null,
  authStatus: null,
};

// Create context
const AppContext = createContext();

// Reducer function
const appReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null,
      };
    case 'SET_BACKEND_DATA':
      return {
        ...state,
        backendData: action.payload,
        loading: false,
      };
    case 'SET_AUTH_STATUS':
      return {
        ...state,
        authStatus: action.payload,
        loading: false,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

// Provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Actions
  const setLoading = (isLoading) => {
    dispatch({ type: 'SET_LOADING', payload: isLoading });
  };

  const setError = (error) => {
    dispatch({ type: 'SET_ERROR', payload: error });
  };

  const setUser = (user) => {
    dispatch({ type: 'SET_USER', payload: user });
  };

  const setBackendData = (data) => {
    dispatch({ type: 'SET_BACKEND_DATA', payload: data });
  };

  const setAuthStatus = (status) => {
    dispatch({ type: 'SET_AUTH_STATUS', payload: status });
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const value = {
    ...state,
    setLoading,
    setError,
    setUser,
    setBackendData,
    setAuthStatus,
    logout,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired
};

// Custom hook to use the app context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};