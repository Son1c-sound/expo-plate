import React, { createContext, useContext, useEffect, useState } from 'react';
import { storage, StorageKeys, storage_instance } from '../helpers/utils/storage';


const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
    const [onboardingDone, setOnboardingDoneState] = useState<boolean | null>(() => {
        return storage_instance.getBoolean(StorageKeys.ONBOARDING_DONE) ?? false;
    });

    const setOnboardingDone = async (done: boolean) => {
        await storage.set(StorageKeys.ONBOARDING_DONE, done);
        setOnboardingDoneState(done);
    };

    return (
        <OnboardingContext.Provider value={{ onboardingDone, setOnboardingDone }}>
            {children}
        </OnboardingContext.Provider>
    );
}

export function useOnboarding() {
    const context = useContext(OnboardingContext);
    if (context === undefined) {
        throw new Error('useOnboarding must be used within an OnboardingProvider');
    }
    return context;
}
