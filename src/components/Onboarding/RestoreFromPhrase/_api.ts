export const resync = (ip: string, phrase: string, keys: number, keyuses: number, useAnyPhrase: boolean = false) => {
    return new Promise((resolve) => {
        MDS.cmd(`megammrsync action:resync host:${ip.trim()} phrase:"${phrase}" keys:${keys} keyuses:${keyuses} anyphrase:${useAnyPhrase ? "true" : "false"}`, (resp) => {
            resolve(resp);
        });
    });
}

export const ping = (ip: string): Promise<{ response: { valid: boolean } }> => {
    return new Promise((resolve) => {
        MDS.cmd(`ping host:${ip}`, (resp) => {
            resolve(resp);
        });
    });
}
