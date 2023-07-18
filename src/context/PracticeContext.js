import React from "react";

const PracticeContext = React.createContext();
const PracticeContextProvider = PracticeContext.Provider;
const PracticeContextConsumer = PracticeContext.Consumer;

export { PracticeContext, PracticeContextProvider, PracticeContextConsumer };
