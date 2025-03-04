import { createContext, useContext, useState } from "react";
import { onboardingContext, Step } from "..";
import STEPS from "../steps";
import { ping } from "./_api";
import { resync } from "./_api";
import { hideOnboarding, resetOnboarding } from "../utils";
import { session } from "../../../env";
import bip39 from "../bip39";

export const restoreFromPhraseContext = createContext<{
    step: Step;
    action: string;
    error: string;
    isLoading: boolean;
    seedPhrase: (string | undefined)[];
    setSeedPhrase: React.Dispatch<React.SetStateAction<(string | undefined)[]>>;
    showSecretKey: boolean;
    secretKey: string;
    handleSecretKeyChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    secretKeyOne: string;
    secretKeyTwo: string;
    secretKeyThree: string;
    secretKeyFour: string;
    secretKeyFive: string;
    setSecretKeyOne: React.Dispatch<React.SetStateAction<string>>;
    setSecretKeyTwo: React.Dispatch<React.SetStateAction<string>>;
    setSecretKeyThree: React.Dispatch<React.SetStateAction<string>>;
    setSecretKeyFour: React.Dispatch<React.SetStateAction<string>>;
    setSecretKeyFive: React.Dispatch<React.SetStateAction<string>>;
    toggleShowSecretKey: () => void;
    onSecretKeyPaste: (e: React.ClipboardEvent<HTMLInputElement>) => void;
    handleSecretKeyKeyUp: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    customPhrase: string;
    showCustomPhrase: boolean;
    toggleShowCustomPhrase: () => void;
    handleCustomPhraseChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    keys: number;
    handleKeysChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    keyUses: number;
    handleKeyUsesChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    ip: string;
    handleIpChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    restoreFromIp: () => void;
    autoConnectAndRestore: () => void;
    /**
     * Gotos
     */
    goToKeyUses: () => void;
    goToNumberOfKeys: () => void;
    goToRestoreFromPhrase: () => void;
    goToRestoreFromSecretKey: () => void;
    goToRestoreFromCustomPhrase: () => void;
    goToRecoverWithMegaNodeOptions: () => void;
    goToRecoverWithMegaNodeManually: () => void;
    goToRecoverWithMegaNodeAutoConnect: () => void;
    /**
     * Disabled states
     */
    disableContinueWithSeedPhrase: boolean;
    disableContinueWithSecretKey: boolean;
    disableContinueWithCustomPhrase: boolean;
    disableIfNotIPAndHost: boolean;
}>({
    step: null,
    action: "",
    error: "",
    isLoading: false,
    seedPhrase: [],
    setSeedPhrase: () => {},
    showSecretKey: false,
    secretKey: "",
    handleSecretKeyChange: () => {},
    secretKeyOne: "",
    secretKeyTwo: "",
    secretKeyThree: "",
    secretKeyFour: "",
    secretKeyFive: "",
    setSecretKeyOne: () => {},
    setSecretKeyTwo: () => {},
    setSecretKeyThree: () => {},
    setSecretKeyFour: () => {},
    setSecretKeyFive: () => {},
    toggleShowSecretKey: () => {},
    onSecretKeyPaste: () => {},
    handleSecretKeyKeyUp: () => {},
    customPhrase: "",
    showCustomPhrase: false,
    toggleShowCustomPhrase: () => {},
    handleCustomPhraseChange: () => {},
    keys: 64,
    handleKeysChange: () => {},
    keyUses: 1000,
    handleKeyUsesChange: () => {},
    ip: "",
    handleIpChange: () => {},
    restoreFromIp: () => {},
    autoConnectAndRestore: () => {},
    /**
     * Gotos
     */
    goToKeyUses: () => {},
    goToNumberOfKeys: () => {},
    goToRestoreFromPhrase: () => {},
    goToRestoreFromSecretKey: () => {},
    goToRestoreFromCustomPhrase: () => {},
    goToRecoverWithMegaNodeOptions: () => {},
    goToRecoverWithMegaNodeManually: () => {},
    goToRecoverWithMegaNodeAutoConnect: () => {},
    /**
     * Disabled states
     */
    disableContinueWithSeedPhrase: false,
    disableContinueWithSecretKey: false,
    disableContinueWithCustomPhrase: false,
    disableIfNotIPAndHost: false,
});

export const RestoreFromPhraseProvider = ({ children }: { children: React.ReactNode }) => {
    const { step, setStep } = useContext(onboardingContext);

    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [action, setAction] = useState('');

    const [seedPhrase, setSeedPhrase] = useState<(string | undefined)[]>([]);

    const [secretKey, setSecretKey] = useState("");
    const [secretKeyOne, setSecretKeyOne] = useState("");
    const [secretKeyTwo, setSecretKeyTwo] = useState("");
    const [secretKeyThree, setSecretKeyThree] = useState("");
    const [secretKeyFour, setSecretKeyFour] = useState("");
    const [secretKeyFive, setSecretKeyFive] = useState("");

    const [customPhrase, setCustomPhrase] = useState("");

    const [keys, setKeys] = useState(64);
    const [keyUses, setKeyUses] = useState(1000);

    const [showSecretKey, setShowSecretKey] = useState(false);
    const [showCustomPhrase, setShowCustomPhrase] = useState(false);

    const [ip, setIp] = useState('');

    const restoreFromIp = async (evt: React.MouseEvent<HTMLButtonElement>) => {
        evt.preventDefault();

        try {
            let resp;
            setError("");
            setIsLoading(true);
            const pingTest = await ping(ip);

            if (pingTest.response.valid === false) {
                session.IS_RESTORING = false;
                resetOnboarding();
                setIsLoading(false);
                return setError("Unable to restore from Mega node. Please try again.");
            }

            if (pingTest.response.valid) {
                setStep(STEPS.IMPORT_SEED_PHRASE_RESTORING_FROM_PHRASE);

                await hideOnboarding();
                session.IS_RESTORING = true;

                if (action === 'phrase') {
                    resp = await resync(ip, seedPhrase.join(" "), keys, keyUses);
                } else if (action === 'secret') {
                    resp = await resync(ip, `${secretKeyOne}-${secretKeyTwo}-${secretKeyThree}-${secretKeyFour}-${secretKeyFive}`, keys, keyUses, true);
                } else if (action === 'custom') {
                    resp = await resync(ip, customPhrase, keys, keyUses, true);
                }

                if (resp.status === false) {
                    session.IS_RESTORING = false;
                    resetOnboarding();
                    setIsLoading(false);
                    setStep(STEPS.IMPORT_SEED_PHRASE_RECOVER_WITH_MEGA_NODE_OPTIONS);
                    return setError("Unable to restore from Mega node. Please try again.");
                }

                setIsLoading(false);
            }
        } catch {
            session.IS_RESTORING = false;
            setIsLoading(false);
            setError("Enable to connect to the Mega node. Please try a different Mega node.");
        }
    }

    const autoConnectAndRestore = async () => {
        try {
            let resp;
            setIsLoading(true);
            setStep(STEPS.IMPORT_SEED_PHRASE_RESTORING_FROM_PHRASE);

            const ip = 'megammr.minima.global:9001';

            await hideOnboarding();
            session.IS_RESTORING = true;

            if (action === 'phrase') {
                resp = await resync(ip, seedPhrase.join(" "), keys, keyUses);
            } else if (action === 'secret') {
                resp = await resync(ip, secretKey, keys, keyUses, true);
            } else if (action === 'custom') {
                resp = await resync(ip, customPhrase, keys, keyUses, true);
            }

            if (resp.status === false) {
                session.IS_RESTORING = false;
                resetOnboarding();
                setIsLoading(false);
                setStep(STEPS.IMPORT_SEED_PHRASE_RECOVER_WITH_MEGA_NODE_OPTIONS);
                return setError("Unable to restore from Mega node. Please try again.");
            }

            setIsLoading(false);
        } catch {
            session.IS_RESTORING = false;
            setIsLoading(false);
            setError("Enable to connect to the Mega node. Please try a different Mega node.");
        }
    }

    const onSecretKeyPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        const pastedData = e.clipboardData.getData('Text');
        if (/[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}/gmi.test(pastedData)) {
            setSecretKeyOne(pastedData.split('-')[0]);
            setSecretKeyTwo(pastedData.split('-')[1]);
            setSecretKeyThree(pastedData.split('-')[2]);
            setSecretKeyFour(pastedData.split('-')[3]);
            setSecretKeyFive(pastedData.split('-')[4]);
            const inputs = document.querySelectorAll('input');
            inputs.forEach(input => input.blur());
            setSecretKey(pastedData);
        }
    }

    const handleSecretKeyKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        if (target.value.length === 0) {
            const nextTarget = document.getElementById(`phrase-${parseInt(target.id.split('-')[1]) - 1}`);
            if (nextTarget) {
                return nextTarget.focus();
            }
        }
        if (target.value.length === 4) {
            const nextTarget = document.getElementById(`phrase-${parseInt(target.id.split('-')[1]) + 1}`);
            if (nextTarget) {
                nextTarget.focus();
            }
        }

        if (secretKeyOne.length === 4 && secretKeyTwo.length === 4 && secretKeyThree.length === 4 && secretKeyFour.length === 4 && secretKeyFive.length === 4) {
            setSecretKey(`${secretKeyOne}-${secretKeyTwo}-${secretKeyThree}-${secretKeyFour}-${secretKeyFive}`);
        }
    }

    const toggleShowSecretKey = () => {
        setShowSecretKey(!showSecretKey);
    }

    const handleSecretKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSecretKey(e.target.value);
    }

    const handleCustomPhraseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCustomPhrase(e.target.value);
    }

    const toggleShowCustomPhrase = () => {
        setShowCustomPhrase(!showCustomPhrase);
    }

    const handleKeysChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeys(parseInt(e.target.value));
    }

    const handleKeyUsesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyUses(parseInt(e.target.value));
    }

    const handleIpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIp(e.target.value);
    }

    const goToRestoreFromPhrase = () => {
        setAction('phrase');
        setStep(STEPS.IMPORT_SEED_PHRASE_ENTER_SEED_PHRASE);
    };

    const goToRestoreFromSecretKey = () => {
        setAction('secret');
        setStep(STEPS.IMPORT_SEED_PHRASE_ENTER_SECRET_KEY);
    };

    const goToRestoreFromCustomPhrase = () => {
        setAction('custom');
        setStep(STEPS.IMPORT_SEED_PHRASE_ENTER_CUSTOM_PHRASE);
    };

    const goToNumberOfKeys = (evt: React.MouseEvent<HTMLButtonElement>) => {
        evt.preventDefault();
        setStep(STEPS.IMPORT_SEED_PHRASE_NUMBER_OF_KEYS);
    };

    const goToKeyUses = (evt: React.MouseEvent<HTMLButtonElement>) => {
        evt.preventDefault();
        setStep(STEPS.IMPORT_SEED_PHRASE_KEY_USES);
    };

    const goToRecoverWithMegaNodeOptions = (evt: React.MouseEvent<HTMLButtonElement>) => {
        evt.preventDefault();
        setStep(STEPS.IMPORT_SEED_PHRASE_RECOVER_WITH_MEGA_NODE_OPTIONS);
    };

    const goToRecoverWithMegaNodeManually = () => {
        setError("");
        setStep(STEPS.IMPORT_SEED_PHRASE_RECOVER_WITH_MEGA_NODE_MANUALLY);
    };

    const goToRecoverWithMegaNodeAutoConnect = () => {
        setError("");
        setStep(STEPS.IMPORT_SEED_PHRASE_RECOVER_WITH_MEGA_NODE_AUTO_CONNECT);
    };

    const disableContinueWithSeedPhrase = seedPhrase.filter(i => i ? bip39.includes(i) : true).length !== 24;
    const disableContinueWithSecretKey = secretKey.length !== 24;
    const disableContinueWithCustomPhrase = customPhrase.length === 0;
    const disableIfNotIPAndHost = !/^(?:\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}:\d+|(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}:\d+)$/.test(ip);

    const value = {
        step,
        action,
        error,
        isLoading,
        seedPhrase,
        setSeedPhrase,
        secretKey,
        handleSecretKeyChange,
        showSecretKey,
        secretKeyOne,
        secretKeyTwo,
        secretKeyThree,
        secretKeyFour,
        secretKeyFive,
        setSecretKeyOne,
        setSecretKeyTwo,
        setSecretKeyThree,
        setSecretKeyFour,
        setSecretKeyFive,
        toggleShowSecretKey,
        onSecretKeyPaste,
        handleSecretKeyKeyUp,
        customPhrase,
        showCustomPhrase,
        toggleShowCustomPhrase,
        handleCustomPhraseChange,
        keys,
        handleKeysChange,
        keyUses,
        handleKeyUsesChange,
        ip,
        handleIpChange,
        restoreFromIp,
        autoConnectAndRestore,
        /**
         * Gotos
         */
        goToKeyUses,
        goToNumberOfKeys,
        goToRestoreFromPhrase,
        goToRestoreFromSecretKey,
        goToRestoreFromCustomPhrase,
        goToRecoverWithMegaNodeOptions,
        goToRecoverWithMegaNodeManually,
        goToRecoverWithMegaNodeAutoConnect,
        /**
         * Disabled states
         */
        disableContinueWithSeedPhrase,
        disableContinueWithSecretKey,
        disableContinueWithCustomPhrase,
        disableIfNotIPAndHost,
    }

    return <restoreFromPhraseContext.Provider value={value}>{children}</restoreFromPhraseContext.Provider>;
};
