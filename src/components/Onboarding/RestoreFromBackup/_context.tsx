import { createContext, useContext, useState } from "react";
import { onboardingContext, Step } from "..";
import { session } from "../../../env";
import { hideOnboarding, resetOnboarding } from "../utils";
import { getPath, restoreFromBackup, uploadBackup } from "./_api";
import STEPS from "../steps";
import { ping } from "../RestoreFromPhrase/_api";

export const restoreFromBackupContext = createContext<{
    isLoading: boolean;
    step: Step;
    keysGenerated: boolean;
    error: string | null;
    resetError: () => void;
    file: File | null;
    setFile: (file: File | null) => void;
    showPassword: boolean;
    setShowPassword: (showPassword: boolean) => void;
    uploadBackupFile: () => void;
    backupFilePassword: string;
    handleBackupFilePassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
    keyUses: number;
    handleKeyUses: (e: React.ChangeEvent<HTMLInputElement>) => void;
    ip: string;
    handleIp: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disableIfNotIPAndHost: boolean;
    /**
     * Gotos
     */
    goToSelectFile: () => void;
    goToKeyUses: (e: React.MouseEvent<HTMLButtonElement>) => void;
    goToRecoverWithMegaNodeOptions: (e: React.MouseEvent<HTMLButtonElement>) => void;
    goToRecoverWithMegaNodeManually: () => void;
    goToRecoverWithMegaNodeAutoConnect: () => void;
    manuallyConnectAndRestore: (e: React.FormEvent<HTMLButtonElement>) => void;
    autoConnectAndRestore: () => void;
}>({
    isLoading: false,
    step: null,
    keysGenerated: false,
    error: null,
    resetError: () => { },
    file: null,
    setFile: () => { },
    showPassword: false,
    setShowPassword: () => { },
    uploadBackupFile: () => { },
    backupFilePassword: "",
    handleBackupFilePassword: () => { },
    keyUses: 0,
    handleKeyUses: () => { },
    ip: "",
    handleIp: () => { },
    disableIfNotIPAndHost: false,
    /**
     * Gotos
     */
    goToSelectFile: () => { },
    goToKeyUses: () => { },
    goToRecoverWithMegaNodeOptions: () => { },
    goToRecoverWithMegaNodeManually: () => { },
    goToRecoverWithMegaNodeAutoConnect: () => { },
    manuallyConnectAndRestore: () => { },
    autoConnectAndRestore: () => { },
});

export const RestoreFromBackupProvider = ({ children }: { children: React.ReactNode }) => {
    const { step, setStep, keysGenerated } = useContext(onboardingContext);
    const [file, setFile] = useState<File | null>(null);
    const [backupFilePath, setBackupFilePath] = useState<string | null>(null);
    const [backupFilePassword, setBackupFilePassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(false);
    const [ip, setIp] = useState<string>("");
    const [keyUses, setKeyUses] = useState<number>(1000);

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

    const restore = async (ip: string) => {
        try {
            setIsLoading(true);
            setError(null);
            setStep(STEPS.RESTORE_FROM_BACKUP_RESTORING);
            if (!backupFilePath) return;
            const path = await getPath(backupFilePath);
            session.IS_RESTORING = true;
            await hideOnboarding();
            await restoreFromBackup(ip, path, backupFilePassword, keyUses);
        } catch (e) {
            session.IS_RESTORING = false;
            await resetOnboarding();
            setStep(STEPS.RESTORE_FROM_BACKUP_SELECT_FILE);
            setError("There was an error with your backup file, please double check your backup file and password and try again.");
        } finally {
            setIsLoading(false);
        }
    }

    const goToSelectFile = () => {
        setError("");
        setStep(STEPS.RESTORE_FROM_BACKUP_SELECT_FILE);
    }

    const goToKeyUses = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setError("");
        setStep(STEPS.RESTORE_FROM_BACKUP_KEY_USES);
    }

    const goToRecoverWithMegaNodeOptions = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setStep(STEPS.RESTORE_FROM_BACKUP_RECOVER_WITH_MEGA_NODE_OPTIONS);
    };

    const goToRecoverWithMegaNodeManually = () => {
        setStep(STEPS.RESTORE_FROM_BACKUP_RECOVER_WITH_MEGA_NODE_MANUALLY);
    };

    const goToRecoverWithMegaNodeAutoConnect = () => {
        setStep(STEPS.RESTORE_FROM_BACKUP_RECOVER_WITH_MEGA_NODE_AUTO_CONNECT);
    };

    const manuallyConnectAndRestore = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const pingTest = await ping(ip);

        if (pingTest.response.valid === false) {
            setIsLoading(false);
            return setError("Unable to restore from Mega node. Please try again.");
        }

        if (pingTest.response.valid) {
            restore(ip);
        }
    }

    const autoConnectAndRestore = async () => {
        restore("megammr.minima.global:9001");
    }

    const handleBackupFilePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBackupFilePassword(e.target.value);
    }

    const handleKeyUses = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyUses(parseInt(e.target.value));
    }

    const handleIp = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIp(e.target.value);
    }

    const resetError = () => {
        setError("");
    }

    const disableIfNotIPAndHost = !/^(?:\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}:\d+|(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}:\d+)$/.test(ip);

    const value = {
        isLoading,
        step,
        keysGenerated,
        error,
        resetError,
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
    }

    return <restoreFromBackupContext.Provider value={value}>{children}</restoreFromBackupContext.Provider>;
};


export default restoreFromBackupContext;