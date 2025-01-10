export const getPath = (filename: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        MDS.file.getpath(filename, (response: any) => {
            if (response.status) {
                resolve(response.response.getpath.path);
            }

            if (!response.status && !response.pending) {
                reject(response.error ? response.error : "RPC FAILED");
            }
        });
    });
};

export const restoreFromBackup = (
    host: string,
    filepath: string,
    password: string
) => {
    return new Promise((resolve, reject) => {
        MDS.cmd(
            `restoresync ${host.length ? 'host:"' + host + '"' : ""
            } file:"${filepath}" password:"${password.length ? password : "minima"}"`,
            (response: any) => {
                if (!response.status)
                    return reject(
                        response.error
                            ? response.error
                            : "Restoring from backup failed, please try again"
                    );

                resolve(response);
            }
        );
    });
};

export const uploadBackup = (file: File): Promise<any> => {
    return new Promise((resolve, reject) => {
        MDS.file.upload(file, async function (resp: any) {
            const fileName = resp.filename;
            if (resp.allchunks === resp.chunk) {

                // Move uploaded file to internal, then set full path to prepare for reset command
                MDS.file.move(
                    "/fileupload/" + fileName,
                    "/archives/" + fileName,
                    (resp: any) => {
                        if (resp.status) {
                            resolve(resp);
                        } else {
                            reject(resp.error);
                        }
                    }
                );
            }
        });
    });
}