import { IonPage, IonContent, IonButton, IonText } from "@ionic/react";
import { useHistory } from "react-router-dom";
import WelcomeHeader from "../components/home/WelcomeHeader";
import News from "../components/home/NewsSection";
import Video  from "../components/home/InsightsVideo";
const Home: React.FC = () => {
  const history = useHistory();

  return <div className="overflow-y-auto h-full">
    <WelcomeHeader />
    <News />
    <Video />
  </div>;
};

export default Home;
