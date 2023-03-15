import React from "react";
import { defaultTheme, Provider } from "@adobe/react-spectrum";
import App from "./App";

export interface AppContainerProps {}

const AppContainer: React.FC<AppContainerProps> = () => {
  return (
    <Provider theme={defaultTheme}>
      <App />
    </Provider>
  );
};
AppContainer.displayName = "AppContainer";

export default AppContainer;
