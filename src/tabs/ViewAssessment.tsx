        import { IonPage, IonContent, IonButton, IonText } from "@ionic/react";
        import { useHistory } from "react-router-dom";
        
        const ViewAssessment: React.FC = () => {
          const history = useHistory();
        
          return (
            <IonPage>
              <IonContent className="ion-padding">
                <IonText>You can track assessments and view reports.</IonText>
                <IonButton expand="full" onClick={() => history.push("/onboarding3")}>
                  Next
                </IonButton>
              </IonContent>
            </IonPage>
          );
        };
        
        export default ViewAssessment;
        