import { createContext, useContext, useEffect, useState } from "react";

interface OnboardingContextType {
  isOnboarded: boolean;
  completeOnboarding: () => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOnboarded, setIsOnboarded] = useState<boolean>(false);

  useEffect(() => {
    const onboarded = localStorage.getItem("isOnboarded");
    setIsOnboarded(onboarded === "true");
  }, []);

  const completeOnboarding = () => {
    localStorage.setItem("isOnboarded", "true");
    setIsOnboarded(true);
  };

  return (
    <OnboardingContext.Provider value={{ isOnboarded, completeOnboarding }}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return context;
};
