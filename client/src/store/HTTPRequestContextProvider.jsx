import { createContext, useState } from "react";
import React from "react";
export const RequestContext = createContext({
  requestBody: null,
  createRequest: () => {},
});

const HTTPRequestContextProvider = ({ children }) => {
  const [requestBody, setRequestBody] = useState(null);

  function createRequest(requestBody) {
    setRequestBody(requestBody);
  }

  const requestctx = {
    requestBody,
    createRequest,
  };
  return (
    <RequestContext.Provider value={requestctx}>
      {children}
    </RequestContext.Provider>
  );
};

export default HTTPRequestContextProvider;
