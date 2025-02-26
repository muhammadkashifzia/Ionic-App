import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet } from "@ionic/react";
import { Route, Redirect } from "react-router-dom";
import { home, list, eye, person } from "ionicons/icons";
import Home from "../tabs/Home";
import Assessment from "../tabs/Assessment";
import ViewAssessment from "../tabs/ViewAssessment";
import Profile from "../tabs/Profile";


const Tabs: React.FC = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/tabs/home" component={Home} />
        <Route exact path="/tabs/assessment" component={Assessment} />
        <Route exact path="/tabs/view-assessment" component={ViewAssessment} />
        <Route exact path="/tabs/profile" component={Profile} />
        <Redirect exact from="/tabs" to="/tabs/home" />
      </IonRouterOutlet>

      <IonTabBar slot="bottom">
        <IonTabButton tab="home" href="/tabs/home">
          <IonIcon icon={home} />
          <IonLabel>Home</IonLabel>
        </IonTabButton>
        <IonTabButton tab="assessment" href="/tabs/assessment">
          <IonIcon icon={list} />
          <IonLabel>Assessment</IonLabel>
        </IonTabButton>
        <IonTabButton tab="view-assessment" href="/tabs/view-assessment">
          <IonIcon icon={eye} />
          <IonLabel>View Assessment</IonLabel>
        </IonTabButton>
        <IonTabButton tab="profile" href="/tabs/profile">
          <IonIcon icon={person} />
          <IonLabel>Profile</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default Tabs;
