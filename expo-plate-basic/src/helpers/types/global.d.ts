
declare global {
    interface OnboardingContextType {
        onboardingDone: boolean | null;
        setOnboardingDone: (done: boolean) => Promise<void>;
    }
}

export {};