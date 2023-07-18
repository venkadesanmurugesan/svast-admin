import React from "react";

const TicketsContext = React.createContext();
const TicketsContextProvider = TicketsContext.Provider;
const TicketsContextConsumer = TicketsContext.Consumer;

export { TicketsContext, TicketsContextProvider, TicketsContextConsumer };
