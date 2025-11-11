import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Role = 'admin' | 'medico' | 'hospital';

export type User = {
  id?: string;
  email?: string;
  name?: string;
  role: Role;
};

type AuthContextType = {
  user: User | null;
  login: (user: User, token?: string) => void;
  logout: () => void;
  getToken: () => string | null;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  getToken: () => null,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  // Aqui o usuário fixo para autologin
  const fixedUser: User = {
    id: 'adm-001',
    email: 'adm-vitor@capybaraworld.com',
    name: 'Vitor (admin)',
    role: 'admin',
  };
  const fixedToken = '631330'; // pode ser qualquer string pra teste

  // Autologin assim que o app sobe, se não tem usuário no localStorage
  useEffect(() => {
    try {
      const rawUser = localStorage.getItem('mh_user');
      if (rawUser) {
        setUser(JSON.parse(rawUser));
      } else {
        // autologin com user fixo
        setUser(fixedUser);
        localStorage.setItem('mh_user', JSON.stringify(fixedUser));
        localStorage.setItem('accessToken', fixedToken);
        navigate('/home');
      }
    } catch (err) {
      console.warn('Erro ao carregar/salvar usuário', err);
    }
  }, [navigate]);

  const login = (u: User, token?: string) => {
    setUser(u);
    try {
      localStorage.setItem('mh_user', JSON.stringify(u));
      if (token) localStorage.setItem('accessToken', token);
    } catch (err) {
      console.warn('Erro ao salvar usuário no localStorage', err);
    }
    navigate('/home');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mh_user');
    localStorage.removeItem('accessToken');
    navigate('/login');
  };

  const getToken = () => localStorage.getItem('accessToken');

  return (
    <AuthContext.Provider value={{ user, login, logout, getToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;