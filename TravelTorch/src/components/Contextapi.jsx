import React, { createContext, useContext, useState } from 'react';
const useContextApi=createContext();

export const getContext=()=>{
    return useContext(useContextApi);
}

function Contextapi({children }) {
    const [user,setUser]=useState(null);
  return (
    <useContextApi.Provider value={{user,setUser}}>
      {children}
    </useContextApi.Provider>
  )
}

export default Contextapi
