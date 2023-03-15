import React from "react";
import {
  defaultTheme,
  Provider as SpectrumProvider,
} from "@adobe/react-spectrum";
import { Provider as IdeSessionProvider } from "@/utils/useIdeSession.hook";
import App from "./App";
import { IdeSession } from "@deephaven/jsapi-types";
import { initIDESession } from "@/utils/initTable";

export interface AppContainerProps {}

const AppContainer: React.FC<AppContainerProps> = () => {
  const [ideSession, setIdeSession] = React.useState<IdeSession | null>(null);

  React.useEffect(() => {
    initIDESession().then(setIdeSession);
  }, []);

  return ideSession ? (
    <SpectrumProvider theme={defaultTheme}>
      <IdeSessionProvider value={ideSession}>
        <App />
      </IdeSessionProvider>
    </SpectrumProvider>
  ) : null;
};
AppContainer.displayName = "AppContainer";

export default AppContainer;
