// SessionContext.js
import React, { createContext, useState, useContext } from 'react';

// Creamos el contexto
const SessionContext = createContext();

// Componente proveedor para envolver la app
export const SessionProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <SessionContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </SessionContext.Provider>
  );
};

// Hook para acceder al contexto
export const useSession = () => useContext(SessionContext);
