import React, { createContext, ReactNode, useContext, useState } from "react";
import { Alert } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

interface LoginDataProps {
  id: string;
  title: string;
  email: string;
  password: string;
}

type LoginListDataProps = LoginDataProps[];

interface StorageProviderProps {
  children: ReactNode;
}

interface StorageContextData {
  data: LoginListDataProps;
  searchListData: LoginListDataProps;
  loadStorage: () => Promise<void>;
  setStorage: (newLoginData: LoginDataProps) => Promise<void>;
  clearStorage: () => Promise<void>;
  filterLogins: (search: string) => void;
}

export const StorageContext = createContext({} as StorageContextData);

function StorageProvider({ children }: StorageProviderProps) {
  const [data, setData] = useState<LoginListDataProps>([]);
  const [searchListData, setSearchListData] = useState<LoginListDataProps>([]);

  const key = "@passmanager:logins";

  async function loadStorage() {
    try {
      const response = await AsyncStorage.getItem(key);

      if (!response) {
        return;
      }

      setData(JSON.parse(response));
      setSearchListData(JSON.parse(response));
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async function setStorage(newLoginData: LoginDataProps) {
    try {
      const existingData = await AsyncStorage.getItem(key);
      const existingDataParsed = existingData ? JSON.parse(existingData) : [];
      const formattedData = [...existingDataParsed, newLoginData];

      await AsyncStorage.setItem(key, JSON.stringify(formattedData));
    } catch (error) {
      throw new Error(error);
    }
  }

  async function clearStorage() {
    try {
      await AsyncStorage.removeItem(key);
      setData([]);
      setSearchListData([]);

      Alert.alert("Todos os logins foram removidos");
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  function filterLogins(search: string) {
    const filteredData: LoginListDataProps = data.filter(
      (item: LoginDataProps) =>
        item.title.toLowerCase().includes(search.toLowerCase())
    );
    setSearchListData(filteredData);
  }

  return (
    <StorageContext.Provider
      value={{
        data,
        searchListData,
        loadStorage,
        setStorage,
        clearStorage,
        filterLogins,
      }}
    >
      {children}
    </StorageContext.Provider>
  );
}

function useStorageData() {
  const context = useContext(StorageContext);

  return context;
}

export { StorageProvider, useStorageData };
