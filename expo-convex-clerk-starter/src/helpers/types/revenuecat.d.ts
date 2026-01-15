import type { CustomerInfo, PurchasesPackage } from 'react-native-purchases';

declare global {
    interface RevenueCatContextType {
        isInitialized: boolean;
        isProUser: boolean;
        customerInfo: CustomerInfo | null;
        packages: PurchasesPackage[];
        purchasePackage: (pkg: PurchasesPackage) => Promise<void>;
        restorePurchases: () => Promise<void>;
        presentPaywall: () => Promise<void>;
    }
}

export {};
