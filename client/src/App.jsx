import React, { useState, useEffect, useMemo } from 'react';
import { ApolloProvider } from '@apollo/client';
import { ToastContainer } from 'react-toastify';
import client from './config/apollo';
import { getToken, decodeToken } from './util/token';
import AuthContext from './context/AuthContext';
import Auth from './pages/Auth/Auth';
import Navigation from './routes/Navigation';

function App() {

  const [auth, setAuth] = useState(undefined);

  //auth cambia el estado a true osea que ya se autehntico
  useEffect(() => {
    const token = getToken();
    if (token) {
      setAuth(decodeToken(token));
    }else{
      setAuth(null)
    }
  }, []);

  const logout = () => {
    console.log("Cerrar sesión");
  };

  const setUser = (user) => {
    setAuth(user);
  };

  //este auth, deberia llamarse dataUser que es el token desencriptado
  const authData =  useMemo(() => ({
    auth, 
    logout,
    setUser
  }), [auth]);

  if(auth === undefined) return null;

  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider value={authData}>
        {auth?<Navigation/>:<Auth/>}
        <ToastContainer 
          position="top-right"
          autoClose={3000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </AuthContext.Provider>
    </ApolloProvider>
  );
}

export default App;
