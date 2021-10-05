/* eslint-disable react-hooks/exhaustive-deps */
import AsyncStorage from '@react-native-community/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { PERMISSIONS_BACKOFFICE, PERMISSIONS_CLIENT, PERMISSIONS_INVENTORY_MAKER } from '../constants/permissions-profile.constants';
import { PERMISSIONS_APP } from '../infra/permissions.enum';
import { UserProfile } from '../models/enums/user-profile.enum';
import { User } from '../models/user';
import api from '../services/api';
import authService from '../services/authService';

type AuthContextData = {
  signed: boolean;
  user: User | null;
  loading: boolean;
  signIn(login: any): Promise<void>;
  signOut(): void;
  isAllowed(permission: PERMISSIONS_APP): boolean;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
      const { storedUser, storedToken } = await getAuthItemsFromLocalStorage();

      if (storedUser && storedToken) {
        setDefaultHeaderToken(JSON.parse(storedToken));
        setUser(JSON.parse(storedUser));
      }

      setLoading(false);
    }

    loadStorageData();
  }, []);

  const signIn = async (login: User) => {
    const response = await authService.signIn(login);
    const { data } = response;
    const { token } = data;

    saveInLocalStorage(response.data.user, token);
    setDefaultHeaderToken(token);
    setUser(response.data.user);
  };

  const signOut = () => {
    setUser(null);
    cleanAuthItemsFromLocalStorage();
  };

  const cleanAuthItemsFromLocalStorage = () => {
    AsyncStorage.removeItem('@RJSAuth:user');
    AsyncStorage.removeItem('@RJSAuth:token');
  };

  const setDefaultHeaderToken = (token: string) => {
    api.defaults.headers['authorization'] = `Bearer ${token}`;

    api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response.status === 401) {
          signOut();
        }
        return Promise.reject(error);
      }
    );
  };

  const saveInLocalStorage = async (user: User, token: string) => {
    await AsyncStorage.setItem('@RJSAuth:user', JSON.stringify(user));
    await AsyncStorage.setItem('@RJSAuth:token', JSON.stringify(token));
  };

  const getAuthItemsFromLocalStorage = async () => {
    const storedUser = await AsyncStorage.getItem('@RJSAuth:user') || '';
    const storedToken = await AsyncStorage.getItem('@RJSAuth:token') || '';

    return { storedUser, storedToken };
  };

  const isAllowed = (permission: PERMISSIONS_APP) => {
    
    let hasPermission = false;
    
    switch (user?.profile) {
      case UserProfile.ADMIN:
        hasPermission = true;
        break;
      case UserProfile.INVENTORY_MAKER:
        hasPermission = PERMISSIONS_INVENTORY_MAKER.includes(permission);
        break;
      case UserProfile.BACKOFFICE:
        hasPermission = PERMISSIONS_BACKOFFICE.includes(permission);
        break;
      case UserProfile.CLIENT:
        hasPermission = PERMISSIONS_CLIENT.includes(permission);
        break;
    }

    return hasPermission;
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, signIn, signOut, loading, isAllowed }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
