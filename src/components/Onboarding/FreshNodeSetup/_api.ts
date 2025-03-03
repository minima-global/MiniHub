export const hasPeers = (): Promise<boolean> => {
    return new Promise((resolve) => {
        MDS.cmd(`peers`, (response: any) => {
            if (response.status && response.response.havepeers) {
                resolve(true);
            }

            resolve(false);
        });
    });
};
