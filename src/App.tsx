import { IonApp } from '@ionic/react'
import { OnboardingProvider } from './pages/context/OnboardingContext'
import { AuthProvider } from './pages/context/AuthContext'
import AppRoutes from './pages/routes/AppRoutes'
import { ToastProvider } from './shared/ToastContext.js'
const App: React.FC = () => {
  return (
    <IonApp>
      <OnboardingProvider>
        <AuthProvider>
          <ToastProvider>
            <AppRoutes />
          </ToastProvider>
        </AuthProvider>
      </OnboardingProvider>
    </IonApp>
  )
}

export default App