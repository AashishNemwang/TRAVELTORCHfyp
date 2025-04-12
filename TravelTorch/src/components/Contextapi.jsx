import React, { createContext, useContext, useState } from 'react';
const useContextApi=createContext();

export const getContext=()=>{
    return useContext(useContextApi);
}

function Contextapi({children }) {
    const [user,setUser]=useState(null);
    const [count,setCount]=useState(0);
  return (
    <useContextApi.Provider value={{user,setUser,count,setCount}}>
      {children}
    </useContextApi.Provider>
  )
}

export default Contextapi
