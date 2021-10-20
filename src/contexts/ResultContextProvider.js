import React, { createContext, useContext, useState } from 'react';

const ResultContext = createContext();
const baseUrl = "https://google-search3.p.rapidapi.com/api/v1";

export const ResultContextProvider = ({ children }) => {
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const getResults = async (type) => {
        setIsLoading(true);

        const response = await fetch(`${baseUrl}${type}`, {
            method: "GET",
            headers: {
                'x-user-agent': 'desktop',
                'x-rapidapi-host': 'google-search3.p.rapidapi.com',
                'x-rapidapi-key': '1667df6c37msh9c7704a579e18cfp12dfa2jsna992b8486c18'
            }
        })
        const data = await response.json();

        setResults(data);
        setIsLoading(false);
    }

    return (
        <ResultContext.Provider value={{ results, isLoading, searchTerm, setSearchTerm, getResults }}>
            {children}
        </ResultContext.Provider>
    )
}

export const useResultContext = () => useContext(ResultContext);