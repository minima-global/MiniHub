import { useContext, useState } from "react";
import { useRef } from "react";
import OnboardingWrapper from "../OnboardingWrapper";
import { buttonClassName, inputClassName } from "../styling";
import OnboardingTitle from "../OnboardingTitle";
import STEPS from "../steps";
import { hideOnboarding, resetOnboarding } from "../utils";
import { onboardingContext } from "..";
import MobileOnboardingWrapper, { MobileOnboardingContent } from "../OnboardingMobileWrapper";
import OnboardingBackButton from "../OnboardingBackButton";
import { session } from "../../../env";
import { restoreFromBackup, getPath, uploadBackup } from "./api";

const MobileRestoreFromBackup: React.FC<{ step: number | string | null, setStep: React.Dispatch<React.SetStateAction<number | string | null>> }> = ({ step, setStep }) => {
    const { keysGenerated } = useContext(onboardingContext);
    const inputRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<File | null>(null);
    const [backupFilePath, setBackupFilePath] = useState<string | null>(null);
    const [backupFilePassword, setBackupFilePassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const uploadBackupFile = async () => {
        try {
            if (!file) return;
            const response = await uploadBackup(file);
            setBackupFilePath(response.response.move.movefile);
            setStep(STEPS.RESTORE_FROM_BACKUP_PASSWORD);
        } catch {
            // do nothing
        }
    }

    const restore = async () => {
        try {
            setError(null);
            setStep(STEPS.RESTORE_FROM_BACKUP_RESTORING);
            if (!backupFilePath) return;
            const path = await getPath(backupFilePath);
            await hideOnboarding();
            session.IS_RESTORING = true;
            await restoreFromBackup('', path, backupFilePassword);
        } catch (e) {
            session.IS_RESTORING = false;
            await resetOnboarding();
            setStep(STEPS.RESTORE_FROM_BACKUP_SELECT_FILE);
            setError("There was an error with your backup file, please double check your backup file and password and try again.");
        }
    }

    return (
        <div className="text-sm">
            <MobileOnboardingWrapper display={step === STEPS.RESTORE_FROM_BACKUP}>
                <MobileOnboardingContent>
                    <div className="grow flex items-center justify-center">
                        <div className="p-8 mt-10">
                            {!keysGenerated && (
                                <div className="block flex items-center justify-center mb-6">
                                    <img src="./icons/loader3.gif" className="w-[50px] h-[50px]" alt="Loading" />
                                </div>
                            )}
                            {keysGenerated && (
                                <div className="mx-auto text-center flex items-center justify-center w-full mb-6">
                                    <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M21.1922 35.8875L38.6 18.4797L36.3493 16.269L21.1922 31.4513L13.5416 23.8007L11.3555 26.0114L21.1922 35.8875ZM25.0071 49.5443C21.6393 49.5443 18.4661 48.9002 15.4875 47.6119C12.509 46.3237 9.90431 44.5647 7.6736 42.3348C5.44289 40.105 3.683 37.5014 2.39392 34.5241C1.10526 31.5473 0.460938 28.3749 0.460938 25.0071C0.460938 21.6126 1.10505 18.422 2.39327 15.4352C3.68149 12.4485 5.44053 9.85049 7.67038 7.64131C9.90022 5.43213 12.5038 3.683 15.4811 2.39392C18.4579 1.10526 21.6303 0.460938 24.9981 0.460938C28.3926 0.460938 31.5832 1.10505 34.57 2.39327C37.5567 3.68149 40.1547 5.42976 42.3639 7.63808C44.5731 9.8464 46.3222 12.4433 47.6113 15.4288C48.8999 18.4142 49.5443 21.604 49.5443 24.9981C49.5443 28.3659 48.9002 31.5391 47.6119 34.5177C46.3237 37.4962 44.5754 40.1009 42.3671 42.3316C40.1588 44.5623 37.5619 46.3222 34.5764 47.6113C31.591 48.8999 28.4012 49.5443 25.0071 49.5443ZM25.0026 46.6128C31.017 46.6128 36.1223 44.5083 40.3185 40.2992C44.5147 36.0896 46.6128 30.9908 46.6128 25.0026C46.6128 18.9882 44.5147 13.8829 40.3185 9.68666C36.1223 5.49047 31.017 3.39238 25.0026 3.39238C19.0144 3.39238 13.9156 5.49047 9.70604 9.68666C5.49693 13.8829 3.39237 18.9882 3.39237 25.0026C3.39237 30.9908 5.49693 36.0896 9.70604 40.2992C13.9156 44.5083 19.0144 46.6128 25.0026 46.6128Z" fill="#4FE3C1" />
                                    </svg>
                                </div>
                            )}
                            <div className="text-center text-white mb-8">
                                {!keysGenerated ? "Your node is generating keys. This may take a few minutes." : "Your node has successfully generated its keys. You can now continue."}
                            </div>
                        </div>
                    </div>
                    <button className={buttonClassName} disabled={!keysGenerated} onClick={() => setStep("RESTORE_FROM_BACKUP_SELECT_FILE")}>
                        Continue
                    </button>
                </MobileOnboardingContent>
            </MobileOnboardingWrapper>
            <MobileOnboardingWrapper display={step === STEPS.RESTORE_FROM_BACKUP_SELECT_FILE}>
                <MobileOnboardingContent>
                    <div className="grow">
                        <OnboardingBackButton />
                        <OnboardingTitle title="Upload backup file" icon="RESTORE_FROM_BACKUP" />
                        <div className="text-white w-full max-w-2xl">
                            <p className="mb-8">Importing a backup will restore your wallet to its locked or unlocked state when the backup was taken.</p>
                            <label onClick={() => inputRef.current?.click()} className="cursor-pointer transition-all duration-100 border-transparent border hover:border-white/5 flex active:scale-[0.99] items-center justify-center mb-8 gap-5 w-full bg-contrast-1 p-4 rounded-lg">
                                <div className="rounded-full w-8 h-8 bg-orange flex items-center justify-center">
                                    <svg className="stroke-black w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                </div>
                                {inputRef?.current?.files?.[0]?.name ? <div className="grow text-white">{inputRef?.current?.files?.[0]?.name.length > 24 ? inputRef?.current?.files?.[0]?.name.slice(0, 24) + '...' : inputRef?.current?.files?.[0]?.name}</div> : <div className="grow text-grey-80">Please select a backup file</div>}
                            </label>
                            {inputRef.current && (
                                <div className="mb-8 hidden">
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
                            {error && (
                                <div className={`-mt-2 mb-6 ${error ? 'opacity-100' : 'opacity-0 h-0'} transition-opacity duration-300 mx-auto text-red-500 font-bold text-[13px] border border-red-600/50 rounded px-3 py-2 bg-red-500/[5%]`}>
                                    {error}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <button disabled={!file} onClick={uploadBackupFile} className={buttonClassName}>
                            Continue
                        </button>
                    </div>
                </MobileOnboardingContent>
            </MobileOnboardingWrapper>
            <OnboardingWrapper display={step === STEPS.RESTORE_FROM_BACKUP_PASSWORD}>
                <MobileOnboardingContent>
                    <div className="grow">
                        <OnboardingBackButton />
                        <OnboardingTitle title="Enter Backup Password" icon="RESTORE_FROM_BACKUP" />
                        <div className="text-white w-full max-w-2xl">
                            <p className="mb-4">Enter the password you used when creating your backup.</p>
                            <p className="italic mb-8 text-sm">Keep the field empty if you did not set one.</p>
                            <div className="mb-8 flex gap-3">
                                <input type={showPassword ? 'text' : 'password'} value={backupFilePassword} onChange={(e) => setBackupFilePassword(e.target.value)} className={inputClassName} placeholder="Enter password" />
                                <div onClick={() => setShowPassword(!showPassword)} className="w-[80px] bg-contrast-2 hover:bg-contrast-3 active:scale-[99%] rounded flex grow items-center justify-center h-[52px]">
                                    {showPassword && (
                                        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                                    )}
                                    {!showPassword && (
                                        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <div onClick={restore} className={buttonClassName}>
                            Continue
                        </div>
                    </div>
                </MobileOnboardingContent>
            </OnboardingWrapper>
            <OnboardingWrapper display={step === STEPS.RESTORE_FROM_BACKUP_RESTORING}>
                <MobileOnboardingContent>
                    <div className="grow flex items-center justify-center">
                        <div className="text-center text-white w-full max-w-2xl">
                            <h1 className="text-2xl -mt-2 font-bold mb-8">Restoring</h1>
                            <div className="block flex items-center justify-center mb-10">
                                <img src="./icons/loader3.gif" className="w-[64px] h-[64px]" alt="Loading" />
                            </div>
                            <p className="mb-4">Please wait while we restore your node.</p>
                        </div>
                    </div>
                </MobileOnboardingContent>
            </OnboardingWrapper>
        </div>
    )
}

export default MobileRestoreFromBackup;