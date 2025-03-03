export const shouldShowOnboarding = (): Promise<boolean> => {
    return new Promise((resolve) => {
        MDS.keypair.get("onboarding_001", (response: any) => {
            if (response.status) {
                return resolve(!response.value);
            }

            resolve(true);
        });
    });
};

export const hideOnboarding = (): Promise<boolean> => {
    return new Promise((resolve) => {
        MDS.keypair.set("onboarding_001", 1, (response: any) => {
            if (response.status) {
                return resolve(true);
            }

            resolve(true);
        });
    });
};

export const resetOnboarding = (): Promise<boolean> => {
    return new Promise((resolve) => {
        MDS.keypair.set("onboarding_001", '', (response: any) => {
            if (response.status) {
                return resolve(true);
            }

            resolve(true);
        });
    });
};

(window as any).resetOnboarding = () => {
    MDS.keypair.set("onboarding_001", '');
};