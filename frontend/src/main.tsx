import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { ChakraProviderApp } from "./providers/chakra-provider";
import { router } from "./routes";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProviderApp>
      <RouterProvider router={router} />
    </ChakraProviderApp>
  </React.StrictMode>
);