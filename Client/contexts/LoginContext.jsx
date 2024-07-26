import { createContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

async function saveToken(value = "") {
  return await SecureStore.setItemAsync("token", value);
}

async function getToken() {
  return await SecureStore.getItemAsync("token");
}

export const LoginContext = createContext({
  token: "",
  isLogin: false,
  setLoggedIn: async (token) => {},
  deleteLoggedIn: async () => {},
});

export const LoginProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [token, setToken] = useState("");

  const checkToken = async () => {
    try {
      const data = await getToken();
      setToken(data ? data : "");
      setIsLogin(data ? true : false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);
  console.log({token, isLogin}, "<<< ini token dari LoginContext");

  const setLoggedIn = async (value) => {
    try {
      await saveToken(value)
      setToken(value)
      setIsLogin(true)
    } catch (error) {
      console.log(error);
      throw error
    }
  }

  const deleteLoggedIn = async () => {
    try {
      await SecureStore.deleteItemAsync("token")
      setToken("")
      setIsLogin(false)
    } catch (error) {
      console.log(error);
      throw error
      
    }
  }
  return (
    <LoginContext.Provider value={{ token, isLogin, setLoggedIn, deleteLoggedIn }}>
      {children}
    </LoginContext.Provider>
  );
};
