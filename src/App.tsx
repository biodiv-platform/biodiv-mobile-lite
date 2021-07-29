import "./theme/global.css";
import "./theme/variables.css";
import "@ionic/react/css/core.css";
import "@ionic/react/css/display.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/typography.css";
import "@translations/i18n";

import { Menu } from "@components/core/menu";
import { GlobalLoading } from "@components/core/spinner";
import { AutoSync } from "@components/pages/observation/common/autosync";
import { GlobalStateProvider } from "@hooks/use-global-state";
import { IonApp, IonRouterOutlet, IonSplitPane } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { LoginPage } from "@pages/auth/login";
import { LogoutPage } from "@pages/auth/logout";
import { HomePage } from "@pages/home";
import { MyObservationsPage } from "@pages/my-observations";
import { ObservationCreatePage } from "@pages/observation/create";
import { ObservationListPage } from "@pages/observation/list";
import React from "react";
import { Route, Switch } from "react-router-dom";
import { ShowPage } from "@pages/observation/show";

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <GlobalStateProvider>
        <AutoSync />
        <GlobalLoading />

        <IonSplitPane contentId="main">
          <Menu />

          <IonRouterOutlet id="main">
            <Switch>
              <Route path="/" exact={true}>
                <HomePage />
              </Route>

              <Route path="/login" exact={true}>
                <LoginPage />
              </Route>
              <Route path="/logout" exact={true}>
                <LogoutPage />
              </Route>
              <Route path="/observation/list" exact={true}>
                <ObservationListPage />
              </Route>
              <Route path="/observation/create" exact={true}>
                <ObservationCreatePage />
              </Route>
              <Route path="/my-observations" exact={true}>
                <MyObservationsPage />
              </Route>
              <Route path="/observation/show/:id" component={ShowPage} />
            </Switch>
          </IonRouterOutlet>
        </IonSplitPane>
      </GlobalStateProvider>
    </IonReactRouter>
  </IonApp>
);

export default App;
