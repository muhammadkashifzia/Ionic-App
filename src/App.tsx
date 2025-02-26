import { IonApp } from "@ionic/react";
import { OnboardingProvider } from "./pages/context/OnboardingContext";
import { AuthProvider } from "./pages/context/AuthContext";
import AppRoutes from "./pages/routes/AppRoutes";

const App: React.FC = () => {
  return (
    <IonApp>
    <OnboardingProvider>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </OnboardingProvider>
  </IonApp>
  );
};

export default App;
