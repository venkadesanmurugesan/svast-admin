import React from "react";

const LoadingContext = React.createContext();
const LoadingContextProvider = LoadingContext.Provider;
const LoadingContextConsumer = LoadingContext.Consumer;

export { LoadingContext, LoadingContextProvider, LoadingContextConsumer };
