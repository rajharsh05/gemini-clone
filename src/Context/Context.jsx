import { createContext, useState } from "react";
import run from "../Config/Gimini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompt, setPrevPrompt] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const delaypara = (index, nextword) => {
    setTimeout(function () {
      setResultData((prev) => prev + nextword);
    }, 75 * index);
  };

  const onsent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);

    let response;
    if (prompt !== undefined) {
      response = await run(prompt);
      setRecentPrompt(prompt)
    } else {
      setPrevPrompt(prev => [...prev, input])
      setRecentPrompt(input)
      response = await run(input)
    }

    // setRecentPrompt(input);
    // setPrevPrompt((prev) => [...prev, input]);
    // const response = await run(input);

    let responseArray = response.split("**");
    let newResponse = "";
    for (let i = 0; i <= responseArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newResponse += responseArray[i];
      } else {
        newResponse += "<br>" + responseArray[i] + "<b/>";
      }
    }

    let newResponse2 = newResponse.split("*").join("</br>");
    let newResponseArray = newResponse2.split(" ");

    for (let i = 0; i < newResponseArray.length; i++) {
      const nextWord = newResponseArray[i];
      delaypara(i, nextWord + " ");
    }

    setLoading(false);
    setInput("");
  };

  const newchat = () => {
    setLoading(false)
    setShowResult(false)
  }

  const contextValue = {
    prevPrompt,
    setPrevPrompt,
    onsent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newchat,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
