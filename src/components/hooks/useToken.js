import { useState } from "react";

const useToken = () => {
  const getToken = () => {
    const tokenString = localStorage.getItem("token");
    const userToken = JSON.parse(tokenString);
    return userToken;
  };
  const [token, setToken] = useState(getToken());

  const saveToken = (userToken) => {
    if(userToken === null){
      localStorage.removeItem('token');
      setToken(userToken)
      return;
    }
    localStorage.setItem("token", JSON.stringify(userToken));
    setToken(userToken);
  };


  return{
    setToken: saveToken,
    token
  }
};

export default useToken;
