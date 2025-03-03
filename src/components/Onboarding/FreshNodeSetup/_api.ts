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

export const maximaSetName = (name: string): Promise<boolean> => {
    return new Promise((resolve) => {
        MDS.cmd(`maxima action:setname name:${name}`, (response: any) => {
            if (response.status) {
                resolve(true);
            }

            resolve(false);
        });
    });
};
