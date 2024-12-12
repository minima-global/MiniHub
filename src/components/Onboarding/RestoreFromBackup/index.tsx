import { useState } from "react";
import { useRef } from "react";
import OnboardingWrapper from "../OnboardingWrapper";
import OnboardingModal from "../OnboardingModal";
import { buttonClassName, inputClassName } from "../styling";
import OnboardingTitle from "../OnboardingTitle";

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

const uploadBackup = (file: File): Promise<any> => {
    return new Promise((resolve, reject) => {
        MDS.file.upload(file, async function (resp: any) {
            if (resp.allchunks >= 10) {
                // setProgress(resp.chunk / resp.allchunks);
            }
            const fileName = resp.filename;
            if (resp.allchunks === resp.chunk) {
                // setUploading(false);

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

const RestoreFromBackup: React.FC<{ step: number | null, setStep: React.Dispatch<React.SetStateAction<number | null>> }> = ({ step, setStep }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<File | null>(null);
    const [backupFilePath, setBackupFilePath] = useState<string | null>(null);
    const [backupFilePassword, setBackupFilePassword] = useState<string>("");

    const uploadBackupFile = async () => {
        setStep("RESTORE_FROM_BACKUP_PASSWORD");

        try {
            if (!file) return;
            const response = await uploadBackup(file);
            setBackupFilePath(response.response.move.movefile);
        } catch {
            // do nothing
        }
    }

    const restore = async () => {
        try {
            setStep(29);
            if (!backupFilePath) return;
            const path = await getPath(backupFilePath);
            await restoreFromBackup('', path, '');
        } catch (e) {
            console.error(e);
            // do nothing
        }
    }

    return (
        <div>
            <OnboardingWrapper display={step === "RESTORE_FROM_BACKUP"}>
                <OnboardingModal display={step === "RESTORE_FROM_BACKUP"}>
                    <OnboardingTitle title="Upload backup file" icon="RESTORE_FROM_BACKUP" />
                    <div className="text-white w-full max-w-2xl">
                        <p className="mb-8">Importing a backup will restore your wallet to its locked or unlocked state when the backup was taken.</p>
                        {inputRef.current && (
                            <div className="mb-8">
                                <input onClick={() => inputRef.current?.click()} value={inputRef.current.files?.[0]?.name} className={`${inputClassName} cursor-pointer`} readOnly={true} placeholder="Select a backup file" />
                            </div>
                        )}
                        <input
                            accept=".bak"
                            className="hidden"
                            type="file"
                            ref={inputRef}
                            readOnly={true}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                const file = e.target.files ? e.target.files[0] : null;
                                if (file) {
                                    setFile(file);
                                }
                            }}
                        />
                        <div className="flex flex-col gap-3">
                            <button disabled={!file} onClick={uploadBackupFile} className={buttonClassName}>
                                Continue
                            </button>
                        </div>
                    </div>
                </OnboardingModal>
            </OnboardingWrapper>
            <OnboardingWrapper display={step === "RESTORE_FROM_BACKUP_PASSWORD"}>
                <OnboardingModal display={step === "RESTORE_FROM_BACKUP_PASSWORD"}>
                    <OnboardingTitle title="Enter Backup Password" icon="RESTORE_FROM_BACKUP" />
                    <div className="text-white w-full max-w-2xl">
                        <p className="mb-4">Enter the password you used when creating your backup.</p>
                        <p className="italic mb-8 text-sm">Keep the field empty if you did not set one.</p>
                        <div className="mb-8">
                            <input type="text" value={backupFilePassword} onChange={(e) => setBackupFilePassword(e.target.value)} className={inputClassName} placeholder="Enter password" />
                        </div>
                        <div className="flex flex-col gap-3">
                            <div onClick={restore} className={buttonClassName}>
                                Continue
                            </div>
                        </div>
                    </div>
                </OnboardingModal>
            </OnboardingWrapper>
            <OnboardingWrapper display={step === 29}>
                <OnboardingModal display={step === 29}>
                    <div className="text-center text-white w-full max-w-2xl">
                        <h1 className="text-2xl -mt-2 font-bold mb-8">Restoring</h1>
                        <div className="block flex items-center justify-center mb-10">
                            <img src="/icons/loader3.gif" className="w-[64px] h-[64px]" alt="Loading" />
                        </div>
                        <p className="mb-4">Please wait while we restore your node.</p>
                    </div>
                </OnboardingModal>
            </OnboardingWrapper>
        </div>
    )
}

export default RestoreFromBackup;