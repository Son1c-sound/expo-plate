import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { Platform } from 'react-native';
import Purchases, { CustomerInfo, PurchasesPackage } from 'react-native-purchases';
import RevenueCatUI from 'react-native-purchases-ui';
import { REVENUECAT_CONFIG } from '../config/revenuecat';


const RevenueCatContext = createContext<RevenueCatContextType | undefined>(undefined);

export function RevenueCatProvider({ children }: { children: React.ReactNode }) {
    const [customerInfo, setCustomerInfo] = useState<CustomerInfo | null>(null);
    const [packages, setPackages] = useState<PurchasesPackage[]>([]);
    const [isInitialized, setIsInitialized] = useState(false);
    const listenerRemover = useRef<(() => void) | null>(null);

    useEffect(() => {
        const init = async () => {
            try {
                const apiKey = Platform.OS === 'ios' ? REVENUECAT_CONFIG.apiKey.ios : REVENUECAT_CONFIG.apiKey.android;

                await Purchases.configure({ apiKey });

                const info = await Purchases.getCustomerInfo();
                setCustomerInfo(info);

                try {
                    const offerings = await Purchases.getOfferings();
                    if (offerings.current?.availablePackages) {
                        setPackages(offerings.current.availablePackages);
                    }
                } catch (e) {
                    console.error('Error fetching offerings:', e);
                }

                const removeListener = Purchases.addCustomerInfoUpdateListener((info) => {
                    setCustomerInfo(info);
                });
                listenerRemover.current = removeListener as unknown as () => void;

                setIsInitialized(true);
            } catch (e) {
                console.error('Error initializing RevenueCat:', e);
            }
        };

        init();

        return () => {
            if (listenerRemover.current) {
                listenerRemover.current();
            }
        };
    }, []);

    const isProUser = customerInfo?.entitlements.active[REVENUECAT_CONFIG.entitlements.pro] !== undefined;

    const purchasePackage = async (pkg: PurchasesPackage) => {
        try {
            const { customerInfo } = await Purchases.purchasePackage(pkg);
            setCustomerInfo(customerInfo);
        } catch (e: any) {
            if (!e.userCancelled) {
                console.error('Purchase error:', e);
                throw e;
            }
        }
    };

    const restorePurchases = async () => {
        try {
            const info = await Purchases.restorePurchases();
            setCustomerInfo(info);
        } catch (e) {
            console.error('Restore error:', e);
            throw e;
        }
    };

    const presentPaywall = async () => {
        await RevenueCatUI.presentPaywall();
    };

    return (
        <RevenueCatContext.Provider
            value={{
                isInitialized,
                isProUser,
                customerInfo,
                packages,
                purchasePackage,
                restorePurchases,
                presentPaywall,
            }}
        >
            {children}
        </RevenueCatContext.Provider>
    );
}

export function useRevenueCat() {
    const context = useContext(RevenueCatContext);
    if (context === undefined) {
        throw new Error('useRevenueCat must be used within a RevenueCatProvider');
    }
    return context;
}
