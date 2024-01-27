import { useState, createContext, useContext } from "react";

const SearchContext = createContext();

export const SearchContextProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchFriends , setSearchFriends] = useState([])

  const values = { searchTerm, setSearchTerm, searchFriends, setSearchFriends };


  return (
    <SearchContext.Provider value={values}>{children}</SearchContext.Provider>
  );
};


export function useSearch(){
    return useContext(SearchContext)
}