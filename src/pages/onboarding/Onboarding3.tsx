import { IonPage, IonContent, IonButton, IonText } from "@ionic/react";
import { useHistory } from "react-router-dom";
import { useOnboarding } from "../context/OnboardingContext";

const Onboarding3: React.FC = () => {
  const history = useHistory();
  const { completeOnboarding } = useOnboarding();

  const finishOnboarding = () => {
    completeOnboarding();
    history.push("/signin"); // Redirect to Sign In
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <IonText>Let's get started!</IonText>
        <IonButton expand="full" onClick={finishOnboarding}>
          Get Started
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Onboarding3;
