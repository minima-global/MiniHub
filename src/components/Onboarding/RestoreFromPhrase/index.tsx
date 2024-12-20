import { useState } from "react";
import OnboardingWrapper from "../OnboardingWrapper";
import ConfirmSeedPhrase from "./ConfirmSeedPhrase";
import bip39 from "../bip39";
import STEPS from "../steps";
import OnboardingModal from "../OnboardingModal";
import OnboardingTitle from "../OnboardingTitle";
import { buttonClassName, inputClassName, optionClassName } from "../styling";
import { hideOnboarding } from "../utils";

type ImportProps = {
    step: number | string | null;
    setStep: (step: number | string) => void;
}

const resync = (ip: string, phrase: string, keys: number, keyuses: number, useAnyPhrase: boolean = false) => {
    return new Promise((resolve) => {
        MDS.cmd(`megammrsync action:resync host:${ip.trim()} phrase:"${phrase}" keys:${keys} keyuses:${keyuses}  phrase:"${phrase}" anyphrase:${useAnyPhrase ? "true" : "false"}`, (resp) => {
            resolve(resp);
        });
    });
}

const ping = (ip: string): Promise<{ response: { valid: boolean } }> => {
    return new Promise((resolve) => {
        MDS.cmd(`ping host:${ip}`, (resp) => {
            resolve(resp);
        });
    });
}

const RestoreFromPhrase: React.FC<ImportProps> = ({ step, setStep }) => {
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [action, setAction] = useState('');

    const [seedPhrase, setSeedPhrase] = useState<(string | undefined)[]>([]);

    const [secretKeyOne, setSecretKeyOne] = useState("");
    const [secretKeyTwo, setSecretKeyTwo] = useState("");
    const [secretKeyThree, setSecretKeyThree] = useState("");
    const [secretKeyFour, setSecretKeyFour] = useState("");
    const [secretKeyFive, setSecretKeyFive] = useState("");

    const [customPhrase, setCustomPhrase] = useState("");

    const [keys, setKeys] = useState(64);
    const [keyUses, setKeyUses] = useState(1);

    const [showSecretKey, setShowSecretKey] = useState(false);
    const [showCustomPhrase, setShowCustomPhrase] = useState(false);

    const [ip, setIp] = useState('');

    const restoreFromIp = async () => {
        try {
            setError("");
            setIsLoading(true);
            const resp = await ping(ip);

            if (resp.response.valid) {
                setStep(STEPS.IMPORT_SEED_PHRASE_RESTORING_FROM_PHRASE);
                if (action === 'phrase') {
                    await resync(ip, seedPhrase.join(" "), keys, keyUses);
                } else if (action === 'secret') {
                    await resync(ip, `${secretKeyOne}-${secretKeyTwo}-${secretKeyThree}-${secretKeyFour}-${secretKeyFive}`, keys, keyUses, true);
                } else if (action === 'custom') {
                    await resync(ip, customPhrase, keys, keyUses, true);
                }

                await hideOnboarding();
                setIsLoading(false);
            }
        } catch {
            setIsLoading(false);
            setError("Enable to connect to the Mega node. Please try a different Mega node.");
        }
    }

    const autoConnectAndRestore = async () => {
        try {
            setIsLoading(true);
            setStep(STEPS.IMPORT_SEED_PHRASE_RESTORING_FROM_PHRASE);

            const ip = 'megammr.minima.global:9001';

            await hideOnboarding();

            if (action === 'phrase') {
                await resync(ip, seedPhrase.join(" "), keys, keyUses);
            } else if (action === 'secret') {
                await resync(ip, `${secretKeyOne}-${secretKeyTwo}-${secretKeyThree}-${secretKeyFour}-${secretKeyFive}`, keys, keyUses, true);
            } else if (action === 'custom') {
                await resync(ip, customPhrase, keys, keyUses, true);
            }

            setIsLoading(false);
        } catch {
            setIsLoading(false);
            setError("Enable to connect to the Mega node. Please try a different Mega node.");
        }
    }

    const onPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        const pastedData = e.clipboardData.getData('Text');
        if (/[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}/gmi.test(pastedData)) {
            setSecretKeyOne(pastedData.split('-')[0]);
            setSecretKeyTwo(pastedData.split('-')[1]);
            setSecretKeyThree(pastedData.split('-')[2]);
            setSecretKeyFour(pastedData.split('-')[3]);
            setSecretKeyFive(pastedData.split('-')[4]);
            const inputs = document.querySelectorAll('input');
            inputs.forEach(input => input.blur());
        }
    }

    const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
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

    const goToNumberOfKeys = () => {
        setStep(STEPS.IMPORT_SEED_PHRASE_NUMBER_OF_KEYS);
    };

    const goToKeyUses = () => {
        setStep(STEPS.IMPORT_SEED_PHRASE_KEY_USES);
    };

    const goToRecoverWithMegaNodeOptions = () => {
        setStep(STEPS.IMPORT_SEED_PHRASE_RECOVER_WITH_MEGA_NODE_OPTIONS);
    };

    const goToRecoverWithMegaNodeManually = () => {
        setStep(STEPS.IMPORT_SEED_PHRASE_RECOVER_WITH_MEGA_NODE_MANUALLY);
    };

    const goToRecoverWithMegaNodeAutoConnect = () => {
        setStep(STEPS.IMPORT_SEED_PHRASE_RECOVER_WITH_MEGA_NODE_AUTO_CONNECT);
    };

    const disableContinueWithSeedPhrase = seedPhrase.filter(i => i ? !bip39.includes(i) : true).length > 0;
    const disableContinueWithSecretKey = secretKeyOne.length !== 4 || secretKeyTwo.length !== 4 || secretKeyThree.length !== 4 || secretKeyFour.length !== 4 || secretKeyFive.length !== 4;
    const disableContinueWithCustomPhrase = customPhrase.length === 0;
    const disableIfNotIPAndHost = !/^(?:\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}:\d+|(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}:\d+)$/.test(ip);

    return (
        <div>
            <OnboardingWrapper display={step === STEPS.IMPORT_SEED_PHRASE_OPTIONS}>
                <OnboardingModal display={step === STEPS.IMPORT_SEED_PHRASE_OPTIONS}>
                    <OnboardingTitle title="Import seed phrase" icon="RESTORE_FROM_SEED_PHRASE" />
                    <div className="text-center text-white w-full max-w-2xl">
                        <div>
                            <div className="flex flex-col gap-3 text-sm">
                                <div onClick={goToRestoreFromPhrase} className={optionClassName}>
                                    I have a 24 word seed phrase
                                </div>
                                <div onClick={goToRestoreFromSecretKey} className={optionClassName}>
                                    I have a Public Wallet 16 character secret
                                </div>
                                <div onClick={goToRestoreFromCustomPhrase} className={optionClassName}>
                                    I want to use a custom seed phrase
                                </div>
                            </div>
                        </div>
                    </div>
                </OnboardingModal>
            </OnboardingWrapper>
            <OnboardingWrapper display={step === STEPS.IMPORT_SEED_PHRASE_ENTER_SEED_PHRASE}>
                <OnboardingModal display={step === STEPS.IMPORT_SEED_PHRASE_ENTER_SEED_PHRASE}>
                    <OnboardingTitle title="Enter your seed phrase" icon="RESTORE_FROM_SEED_PHRASE" />
                    <div className="text-white w-full max-w-2xl">
                        <p className="mb-8">Please review your entry carefully before continuing</p>
                        <div className="mb-8">
                            <ConfirmSeedPhrase seedPhrase={seedPhrase} setSeedPhrase={setSeedPhrase} />
                        </div>
                        <button onClick={goToNumberOfKeys} disabled={disableContinueWithSeedPhrase} className={buttonClassName}>
                            Continue
                        </button>
                    </div>
                </OnboardingModal>
            </OnboardingWrapper>
            <OnboardingWrapper display={step === STEPS.IMPORT_SEED_PHRASE_ENTER_SECRET_KEY}>
                <OnboardingModal display={step === STEPS.IMPORT_SEED_PHRASE_ENTER_SECRET_KEY}>
                    <OnboardingTitle title="Enter your 16 character secret" icon="RESTORE_FROM_SEED_PHRASE" />
                    <div className="text-white w-full max-w-2xl">
                        <p className="mb-8">Please review your entry carefully before continuing</p>
                        <div className="flex items-center gap-2 mb-8 w-full h-[40px]">
                            <input id="phrase-1" type={showSecretKey ? 'text' : 'password'} maxLength={4} value={secretKeyOne} onChange={(e) => setSecretKeyOne(e.target.value)} onPaste={onPaste} onKeyUp={(e) => handleKeyUp(e)} className="bg-contrast-1 text-xl font-bold text-center w-full p-3 outline-none placeholder-gray-500" />
                            <span className="text-white opacity-50 font-bold">-</span>
                            <input id="phrase-2" type={showSecretKey ? 'text' : 'password'} maxLength={4} value={secretKeyTwo} onChange={(e) => setSecretKeyTwo(e.target.value)} onPaste={onPaste} onKeyUp={(e) => handleKeyUp(e)} className="bg-contrast-1 text-xl font-bold text-center w-full p-3 outline-none placeholder-gray-500" />
                            <span className="text-white opacity-50 font-bold">-</span>
                            <input id="phrase-3" type={showSecretKey ? 'text' : 'password'} maxLength={4} value={secretKeyThree} onChange={(e) => setSecretKeyThree(e.target.value)} onPaste={onPaste} onKeyUp={(e) => handleKeyUp(e)} className="bg-contrast-1 text-xl font-bold text-center w-full p-3 outline-none placeholder-gray-500" />
                            <span className="text-white opacity-50 font-bold">-</span>
                            <input id="phrase-4" type={showSecretKey ? 'text' : 'password'} maxLength={4} value={secretKeyFour} onChange={(e) => setSecretKeyFour(e.target.value)} onPaste={onPaste} onKeyUp={(e) => handleKeyUp(e)} className="bg-contrast-1 text-xl font-bold text-center w-full p-3 outline-none placeholder-gray-500" />
                            <span className="text-white opacity-50 font-bold">-</span>
                            <input id="phrase-5" type={showSecretKey ? 'text' : 'password'} maxLength={4} value={secretKeyFive} onChange={(e) => setSecretKeyFive(e.target.value)} onPaste={onPaste} onKeyUp={(e) => handleKeyUp(e)} className="bg-contrast-1 text-xl font-bold text-center w-full p-3 outline-none placeholder-gray-500" />
                            <div onClick={() => setShowSecretKey(!showSecretKey)} className="bg-contrast-2 hover:bg-contrast-3 active:scale-[99%] rounded w-full ml-2 flex grow items-center justify-center h-[52px]">
                                {showSecretKey && (
                                    <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                                )}
                                {!showSecretKey && (
                                    <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
                                )}
                            </div>
                        </div>
                    </div>
                    <button disabled={disableContinueWithSecretKey} onClick={goToNumberOfKeys} className={buttonClassName}>
                        Continue
                    </button>
                </OnboardingModal>
            </OnboardingWrapper>
            <OnboardingWrapper display={step === STEPS.IMPORT_SEED_PHRASE_ENTER_CUSTOM_PHRASE}>
                <OnboardingModal display={step === STEPS.IMPORT_SEED_PHRASE_ENTER_CUSTOM_PHRASE}>
                    <OnboardingTitle title="Enter your custom phrase" icon="RESTORE_FROM_SEED_PHRASE" />
                    <div className="text-white w-full max-w-2xl">
                        <p className="mb-8">Please review your entry carefully before continuing</p>
                        <div className="mb-8 flex gap-4">
                            <input type={showCustomPhrase ? 'text' : 'password'} value={customPhrase} onChange={(e) => setCustomPhrase(e.target.value)} className={inputClassName} placeholder="Enter your custom phrase" />
                            <div onClick={() => setShowCustomPhrase(!showCustomPhrase)} className="w-[80px] bg-contrast-2 hover:bg-contrast-3 active:scale-[99%] rounded ml-2 flex grow items-center justify-center h-[52px]">
                                {showCustomPhrase && (
                                    <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                                )}
                                {!showCustomPhrase && (
                                    <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
                                )}
                            </div>
                        </div>
                        <button disabled={disableContinueWithCustomPhrase} onClick={goToNumberOfKeys} className={buttonClassName}>
                            Continue
                        </button>
                    </div>
                </OnboardingModal>
            </OnboardingWrapper>
            <OnboardingWrapper display={step === STEPS.IMPORT_SEED_PHRASE_NUMBER_OF_KEYS}>
                <OnboardingModal display={step === STEPS.IMPORT_SEED_PHRASE_NUMBER_OF_KEYS}>
                    <OnboardingTitle title="Number of Keys" icon="RESTORE_FROM_SEED_PHRASE" />
                    <div className="text-white w-full max-w-2xl">
                        <p className="mb-4">Enter the number of wallet addresses (keys) to create.</p>
                        <p className="mb-8 text-sm">All Minima nodes are started with 64 addresses by default. If you previously manually created more, you can set the number of addresses to create here. Note that in future you should always create at least this many addresses to ensure all your coins are recovered.</p>
                        <div className="mb-8">
                            <label className="block mb-3">Enter number of keys</label>
                            <input type="number" value={keys} onChange={(e) => setKeys(parseInt(e.target.value))} className={inputClassName} placeholder="Enter number of keys" />
                        </div>
                        <div onClick={goToKeyUses} className={buttonClassName}>
                            Continue
                        </div>
                    </div>
                </OnboardingModal>
            </OnboardingWrapper>
            <OnboardingWrapper display={step === STEPS.IMPORT_SEED_PHRASE_KEY_USES}>
                <OnboardingModal display={step === STEPS.IMPORT_SEED_PHRASE_KEY_USES}>
                    <OnboardingTitle title="Enter your key uses (nonce)" icon="RESTORE_FROM_SEED_PHRASE" />
                    <div className="text-white w-full max-w-2xl">
                        <p className="mb-4 text-sm">
                            This number should be <strong>higher than the total times your node has generated a signature</strong>. A signature is created each time you spend from a wallet address, including all transactions, consolidating, and splitting coins. Some transactions may involve multiple signatures.
                        </p>
                        <p className="mb-8 text-sm italic">If unsure, use the default value provided if you believe you have not generated more than 1,000 signatures.</p>
                        <div className="mb-8">
                            <label className="block mb-3">Enter your key uses</label>
                            <input type="number" value={keyUses} onChange={(e) => setKeyUses(parseInt(e.target.value))} className={inputClassName} placeholder="Enter number of keys" />
                        </div>
                        <div onClick={goToRecoverWithMegaNodeOptions} className={buttonClassName}>
                            Continue
                        </div>
                    </div>
                </OnboardingModal>
            </OnboardingWrapper>
            <OnboardingWrapper display={step === STEPS.IMPORT_SEED_PHRASE_RECOVER_WITH_MEGA_NODE_OPTIONS}>
                <OnboardingModal display={step === STEPS.IMPORT_SEED_PHRASE_RECOVER_WITH_MEGA_NODE_OPTIONS}>
                    <OnboardingTitle title="Connect to a Mega node" icon="RESTORE_FROM_SEED_PHRASE" />
                    <div className="text-white w-full max-w-2xl">
                        <p className="mb-8">To import your seed phrase/secret/custom phrase (delete as appropriate), you will need to connect to a Mega node to restore your coins and join the network.</p>
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
            <OnboardingWrapper display={step === STEPS.IMPORT_SEED_PHRASE_RECOVER_WITH_MEGA_NODE_MANUALLY}>
                <OnboardingModal display={step === STEPS.IMPORT_SEED_PHRASE_RECOVER_WITH_MEGA_NODE_MANUALLY}>
                    <OnboardingTitle title="Connect to a Mega node" icon="RESTORE_FROM_SEED_PHRASE" />
                    <div className="text-white w-full max-w-2xl">
                        <p className="mb-6">To import your seed phrase/secret/custom phrase (delete as appropriate), you will need to connect to a Mega node to restore your coins and join the network.</p>
                        <div className="mb-8">
                            <label className="mb-3 block">
                                Please enter the url:port or ip:port of a Mega node.
                            </label>
                            <input type="text" value={ip} onChange={(e) => setIp(e.target.value)} placeholder="" className={inputClassName} />
                        </div>
                        <div className="flex flex-col gap-3">
                            <button disabled={isLoading || disableIfNotIPAndHost} onClick={restoreFromIp} className={buttonClassName}>
                                Restore
                            </button>
                        </div>
                        {error && <div className="mt-6 text-red-500 font-bold text-xs">{error}</div>}
                    </div>
                </OnboardingModal>
            </OnboardingWrapper>
            <OnboardingWrapper display={step === STEPS.IMPORT_SEED_PHRASE_RECOVER_WITH_MEGA_NODE_AUTO_CONNECT}>
                <OnboardingModal display={step === STEPS.IMPORT_SEED_PHRASE_RECOVER_WITH_MEGA_NODE_AUTO_CONNECT}>
                    <OnboardingTitle title="Confirmation" icon="RESTORE_FROM_SEED_PHRASE" />
                    <div className="text-white w-full max-w-2xl">
                        <p className="mb-8">You are about to import a seed phrase to this node and restore all coins.</p>
                        <div className="flex flex-col gap-3">
                            <div onClick={autoConnectAndRestore} className={buttonClassName}>
                                Start restore
                            </div>
                        </div>
                    </div>
                </OnboardingModal>
            </OnboardingWrapper>
            <OnboardingWrapper display={step === STEPS.IMPORT_SEED_PHRASE_RESTORING_FROM_PHRASE}>
                <OnboardingModal display={true} width="max-w-[572px]">
                    <div className="block flex items-center justify-center mb-8">
                        <img src="./icons/loader3.gif" className="w-[64px] h-[64px]" alt="Loading" />
                    </div>
                    <div className="text-center text-white mb-4">
                        Restoring your node...
                    </div>
                </OnboardingModal>
            </OnboardingWrapper>
        </div>
    )
}

export default RestoreFromPhrase;  