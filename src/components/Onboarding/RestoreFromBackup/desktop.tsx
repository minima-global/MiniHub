import { useContext } from "react";
import { useRef } from "react";
import OnboardingWrapper from "../OnboardingWrapper";
import OnboardingModal from "../OnboardingModal";
import { buttonClassName, inputClassName, optionClassName } from "../styling";
import OnboardingTitle from "../OnboardingTitle";
import STEPS from "../steps";
import { restoreFromBackupContext } from "./_context";

const RestoreFromBackup: React.FC = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const {
        step,
        isLoading,
        /**
         * State
         */
        keysGenerated,
        error,
        file,
        setFile,
        showPassword,
        setShowPassword,
        uploadBackupFile,
        backupFilePassword,
        handleBackupFilePassword,
        keyUses,
        handleKeyUses,
        ip,
        handleIp,
        disableIfNotIPAndHost,
        /**
         * Gotos
         */
        goToSelectFile,
        goToKeyUses,
        goToRecoverWithMegaNodeOptions,
        goToRecoverWithMegaNodeManually,
        goToRecoverWithMegaNodeAutoConnect,
        manuallyConnectAndRestore,
        autoConnectAndRestore,
    } = useContext(restoreFromBackupContext);

    return (
        <div>
            <OnboardingWrapper display={step === STEPS.RESTORE_FROM_BACKUP}>
                <OnboardingModal width="max-w-[480px]" display={step === STEPS.RESTORE_FROM_BACKUP}>
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
                        {!keysGenerated ? "Your node is generating keys. This may take a few minutes." : "Your node has successfully generated its keys." }
                    </div>
                    <button className={buttonClassName} disabled={!keysGenerated} onClick={goToSelectFile}>
                        Continue
                    </button>
                </OnboardingModal>
            </OnboardingWrapper>
            <OnboardingWrapper display={step === STEPS.RESTORE_FROM_BACKUP_SELECT_FILE}>
                <OnboardingModal display={step === STEPS.RESTORE_FROM_BACKUP_SELECT_FILE}>
                    <OnboardingTitle title="Upload backup file" icon="RESTORE_FROM_BACKUP" />
                    <div className="text-white w-full max-w-2xl">
                        <p className="mb-8">Importing a backup will restore your wallet to its locked or unlocked state when the backup was taken.</p>
                        <label onClick={() => inputRef.current?.click()} className="cursor-pointer transition-all duration-100 border-transparent border hover:border-white/5 flex active:scale-[0.99] items-center justify-center mb-8 gap-5 w-full bg-contrast-1 p-4 rounded-lg">
                            <div className="rounded-full w-8 h-8 bg-orange flex items-center justify-center">
                                <svg className="stroke-black w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                            </div>
                            {inputRef?.current?.files?.[0]?.name ? <div className="grow text-white">{inputRef?.current?.files?.[0]?.name}</div> : <div className="grow text-grey-80">Please select a backup file</div>}
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
                        <div className="flex flex-col gap-3">
                            <button disabled={!file} onClick={uploadBackupFile} className={buttonClassName}>
                                Continue
                            </button>
                        </div>
                    </div>
                </OnboardingModal>
            </OnboardingWrapper>
            <OnboardingWrapper display={step === STEPS.RESTORE_FROM_BACKUP_PASSWORD}>
                <OnboardingModal display={step === STEPS.RESTORE_FROM_BACKUP_PASSWORD}>
                    <OnboardingTitle title="Enter Backup Password" icon="RESTORE_FROM_BACKUP" />
                    <div className="text-white w-full max-w-2xl">
                        <p className="mb-4">Enter the password you used when creating your backup.</p>
                        <p className="italic mb-8 text-sm">Keep the field empty if you did not set one.</p>
                        <div className="mb-8 flex gap-4">
                            <input type={showPassword ? 'text' : 'password'} value={backupFilePassword} onChange={handleBackupFilePassword} className={inputClassName} placeholder="Enter password" />
                            <div onClick={() => setShowPassword(!showPassword)} className="w-[80px] bg-contrast-2 hover:bg-contrast-3 active:scale-[99%] rounded ml-2 flex grow items-center justify-center h-[52px]">
                                {showPassword && (
                                    <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                                )}
                                {!showPassword && (
                                    <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <div onClick={goToKeyUses} className={buttonClassName}>
                                Continue
                            </div>
                        </div>
                    </div>
                </OnboardingModal>
            </OnboardingWrapper>
            <OnboardingWrapper display={step === STEPS.RESTORE_FROM_BACKUP_KEY_USES}>
                <OnboardingModal display={step === STEPS.RESTORE_FROM_BACKUP_KEY_USES}>
                    <OnboardingTitle title="Key uses" icon="RESTORE_FROM_BACKUP" />
                    <div className="text-white w-full max-w-2xl">
                        <p className="mb-4 text-sm">
                            This number should be <strong>higher than the total times your node has generated a signature</strong>. A signature is created each time you spend from a wallet address, including all transactions, consolidating, and splitting coins. Some transactions may involve multiple signatures.
                        </p>
                        <p className="mb-8 text-sm italic">If unsure, use the default value provided if you believe you have not generated more than 1,000 signatures.</p>
                        <div className="mb-8">
                            <label className="block mb-3">Enter the number of times you have signed with your keys</label>
                            <input type="number" value={keyUses} onChange={handleKeyUses} className={inputClassName} placeholder="Enter number of keys" />
                        </div>
                        <div onClick={goToRecoverWithMegaNodeOptions} className={buttonClassName}>
                            Continue
                        </div>
                    </div>
                </OnboardingModal>
            </OnboardingWrapper>
            <OnboardingWrapper display={step === STEPS.RESTORE_FROM_BACKUP_RECOVER_WITH_MEGA_NODE_OPTIONS}>
                <OnboardingModal display={step === STEPS.RESTORE_FROM_BACKUP_RECOVER_WITH_MEGA_NODE_OPTIONS}>
                    <OnboardingTitle title="Connect to a Mega node" icon="RESTORE_FROM_BACKUP" />
                    <div className="text-white w-full max-w-2xl">
                        <p className="mb-8">To import restore your backup, you will need to connect to a Mega node to restore your coins and join the network.</p>
                        <div className="flex flex-col gap-3">
                            <button disabled={isLoading} onClick={goToRecoverWithMegaNodeManually} className={optionClassName}>
                                Enter manually
                            </button>
                            <button disabled={isLoading} onClick={goToRecoverWithMegaNodeAutoConnect} className={optionClassName}>
                                Use auto-connect
                            </button>
                        </div>
                        {error && <div className="mt-6 text-red-500 font-bold text-xs">{error}</div>}
                    </div>
                </OnboardingModal>
            </OnboardingWrapper>
            <OnboardingWrapper display={step === STEPS.RESTORE_FROM_BACKUP_RECOVER_WITH_MEGA_NODE_MANUALLY}>
                <OnboardingModal display={step === STEPS.RESTORE_FROM_BACKUP_RECOVER_WITH_MEGA_NODE_MANUALLY}>
                    <OnboardingTitle title="Connect to a Mega node" icon="RESTORE_FROM_BACKUP" />
                    <div className="text-white w-full max-w-2xl">
                        <p className="mb-6">To import your backup, you will need to connect to a Mega node to restore your coins and join the network.</p>
                        <div className="mb-8">
                            <label className="mb-3 block">
                                Please enter the url:port or ip:port of a Mega node.
                            </label>
                            <input type="text" value={ip} onChange={handleIp} placeholder="" className={inputClassName} />
                        </div>
                        <p className="mb-8">The node will shutdown once the restore has completed. Please restart the node to access your restored node.</p>
                        <div className="flex flex-col gap-3">
                            <button disabled={isLoading || disableIfNotIPAndHost} onClick={manuallyConnectAndRestore} className={buttonClassName}>
                                Restore
                            </button>
                        </div>
                        {error && <div className="mt-6 text-red-500 font-bold text-xs">{error}</div>}
                    </div>
                </OnboardingModal>
            </OnboardingWrapper>
            <OnboardingWrapper display={step === STEPS.RESTORE_FROM_BACKUP_RECOVER_WITH_MEGA_NODE_AUTO_CONNECT}>
                <OnboardingModal display={step === STEPS.RESTORE_FROM_BACKUP_RECOVER_WITH_MEGA_NODE_AUTO_CONNECT}>
                    <OnboardingTitle title="Confirmation" icon="RESTORE_FROM_BACKUP" />
                    <div className="text-white w-full max-w-2xl">
                        <p className="mb-6">You are about to import your backup and restore all coins.</p>
                        <p className="mb-8">The node will shutdown once the restore has completed. Please restart the node to access your restored node.</p>
                        <div className="flex flex-col gap-3">
                            <div onClick={autoConnectAndRestore} className={buttonClassName}>
                                Start restore
                            </div>
                        </div>
                    </div>
                </OnboardingModal>
            </OnboardingWrapper>
            <OnboardingWrapper display={step === STEPS.RESTORE_FROM_BACKUP_RESTORING}>
                <OnboardingModal display={step === STEPS.RESTORE_FROM_BACKUP_RESTORING}>
                    <div className="text-center text-white w-full max-w-2xl">
                        <h1 className="text-2xl -mt-2 font-bold mb-8">Restoring</h1>
                        <div className="block flex items-center justify-center mb-10">
                            <img src="./icons/loader3.gif" className="w-[64px] h-[64px]" alt="Loading" />
                        </div>
                        <p className="mb-4">Please wait while we restore your node.</p>
                    </div>
                </OnboardingModal>
            </OnboardingWrapper>
        </div>
    )
}

export default RestoreFromBackup;