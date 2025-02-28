import { useState } from "react";
import ConfirmSeedPhrase from "./ConfirmSeedPhrase";
import bip39 from "../bip39";
import STEPS from "../steps";
import OnboardingTitle from "../OnboardingTitle";
import { buttonClassName, greyButtonClassName, inputClassName, optionClassName } from "../styling";
import { hideOnboarding } from "../utils";
import MobileOnboardingWrapper, { MobileOnboardingContent } from "../OnboardingMobileWrapper";
import OnboardingBackButton from "../OnboardingBackButton";
import { session } from "../../../env";
import { ping, resync } from "./api";

type ImportProps = {
    step: number | string | null;
    setStep: (step: number | string) => void;
}

const MobileRestoreFromPhrase: React.FC<ImportProps> = ({ step, setStep }) => {
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [action, setAction] = useState('');

    const [seedPhrase, setSeedPhrase] = useState<(string | undefined)[]>([]);

    const [secretKeyOne, setSecretKeyOne] = useState("");

    const [customPhrase, setCustomPhrase] = useState("");

    const [keys, setKeys] = useState(64);
    const [keyUses, setKeyUses] = useState(1000);

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

                await hideOnboarding();
                session.IS_RESTORING = true;

                if (action === 'phrase') {
                    await resync(ip, seedPhrase.join(" "), keys, keyUses);
                } else if (action === 'secret') {
                    await resync(ip, `${secretKeyOne}`, keys, keyUses, true);
                } else if (action === 'custom') {
                    await resync(ip, customPhrase, keys, keyUses, true);
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
            setIsLoading(true);
            setStep(STEPS.IMPORT_SEED_PHRASE_RESTORING_FROM_PHRASE);

            const ip = 'megammr.minima.global:9001';

            await hideOnboarding();
            session.IS_RESTORING = true;

            if (action === 'phrase') {
                await resync(ip, seedPhrase.join(" "), keys, keyUses);
            } else if (action === 'secret') {
                await resync(ip, `${secretKeyOne}`, keys, keyUses, true);
            } else if (action === 'custom') {
                await resync(ip, customPhrase, keys, keyUses, true);
            }

            setIsLoading(false);
        } catch {
            session.IS_RESTORING = false;
            setIsLoading(false);
            setError("Enable to connect to the Mega node. Please try a different Mega node.");
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
    const disableContinueWithSecretKey = secretKeyOne.length !== 24 || !/^[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}$/.test(secretKeyOne);
    const disableContinueWithCustomPhrase = customPhrase.length === 0;
    const disableIfNotIPAndHost = !/^(?:\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}:\d+|(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}:\d+)$/.test(ip);

    return (
        <div className="text-sm">
            <MobileOnboardingWrapper display={step === STEPS.IMPORT_SEED_PHRASE_OPTIONS}>
                <MobileOnboardingContent>
                    <OnboardingBackButton />
                    <OnboardingTitle title="Import seed phrase" icon="RESTORE_FROM_SEED_PHRASE" />
                    <div className="text-center text-white w-full max-w-2xl">
                        <div>
                            <div className="flex flex-col gap-3 text-sm">
                                <div onClick={goToRestoreFromPhrase} className={optionClassName}>
                                    I have a 24 word seed phrase
                                </div>
                                <div onClick={goToRestoreFromSecretKey} className={optionClassName}>
                                    I have a Web Wallet secret key
                                </div>
                                <div onClick={goToRestoreFromCustomPhrase} className={optionClassName}>
                                    I want to use a custom seed phrase
                                </div>
                            </div>
                        </div>
                    </div>
                </MobileOnboardingContent>
            </MobileOnboardingWrapper>
            <MobileOnboardingWrapper display={step === STEPS.IMPORT_SEED_PHRASE_ENTER_SEED_PHRASE}>
                <MobileOnboardingContent>
                    <div className="grow text-white w-full max-w-2xl">
                        <OnboardingBackButton />
                        <OnboardingTitle title="Enter your seed phrase" icon="RESTORE_FROM_SEED_PHRASE" />
                        <div className="text-white w-full max-w-2xl">
                            <p className="mb-8">Please review your entry carefully before continuing</p>
                            <div className="mb-8">
                                <ConfirmSeedPhrase seedPhrase={seedPhrase} setSeedPhrase={setSeedPhrase} />
                            </div>
                        </div>
                    </div>
                    <button onClick={goToNumberOfKeys} disabled={disableContinueWithSeedPhrase} className={buttonClassName}>
                        Continue
                    </button>
                </MobileOnboardingContent>
            </MobileOnboardingWrapper>
            <MobileOnboardingWrapper display={step === STEPS.IMPORT_SEED_PHRASE_ENTER_SECRET_KEY}>
                <MobileOnboardingContent>
                    <div className="grow text-white w-full max-w-2xl">
                        <OnboardingBackButton />
                        <OnboardingTitle title="Enter your 20 character secret" icon="RESTORE_FROM_SEED_PHRASE" />
                        <p className="mb-8">Please review your entry carefully before continuing</p>
                        <div>
                            <input id="phrase" type={showSecretKey ? 'text' : 'password'} maxLength={24} value={secretKeyOne} onChange={(evt) => setSecretKeyOne(evt.target.value)} className="bg-contrast-1 text-left font-bold w-full p-3 outline-none placeholder-gray-500" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <button onClick={() => setShowSecretKey(!showSecretKey)} className={greyButtonClassName}>
                            {!showSecretKey ? "Show secret key" : "Hide secret key"}
                        </button>
                        <button disabled={disableContinueWithSecretKey} onClick={goToNumberOfKeys} className={buttonClassName}>
                            Continue
                        </button>
                    </div>
                </MobileOnboardingContent>
            </MobileOnboardingWrapper>
            <MobileOnboardingWrapper display={step === STEPS.IMPORT_SEED_PHRASE_ENTER_CUSTOM_PHRASE}>
                <MobileOnboardingContent>
                    <div className="grow">
                        <OnboardingBackButton />
                        <OnboardingTitle title="Enter your custom phrase" icon="RESTORE_FROM_SEED_PHRASE" />
                        <p className="mb-8">Please review your entry carefully before continuing</p>
                        <div className="mb-8 flex gap-4">
                            <input type={showCustomPhrase ? 'text' : 'password'} value={customPhrase} onChange={(e) => setCustomPhrase(e.target.value)} className={inputClassName} placeholder="Enter your custom phrase" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <button onClick={() => setShowCustomPhrase(!showCustomPhrase)} className={greyButtonClassName}>
                            {!showSecretKey ? "Show custom phrase" : "Hide custom phrase"}
                        </button>
                        <button disabled={disableContinueWithCustomPhrase} onClick={goToNumberOfKeys} className={buttonClassName}>
                            Continue
                        </button>
                    </div>
                </MobileOnboardingContent>
            </MobileOnboardingWrapper>
            <MobileOnboardingWrapper display={step === STEPS.IMPORT_SEED_PHRASE_NUMBER_OF_KEYS}>
                <MobileOnboardingContent>
                    <div className="grow">
                        <OnboardingBackButton />
                        <OnboardingTitle title="Number of Keys" icon="RESTORE_FROM_SEED_PHRASE" />
                        <div className="text-white w-full max-w-2xl">
                            <p className="mb-4">Enter the number of wallet addresses (keys) to create.</p>
                            <p className="mb-4">All Minima nodes start with 64 addresses by default. If you previously manually created more, you can set the number of addresses to create here.</p>
                            <p className="mb-8 text-sm">Note that in future you should always create at least this many addresses to ensure all your coins are recovered.</p>
                            <div className="mb-8">
                                <label className="block mb-3">Enter number of keys</label>
                                <input type="number" value={keys} onChange={(e) => setKeys(parseInt(e.target.value))} className={inputClassName} placeholder="Enter number of keys" />
                            </div>
                        </div>
                    </div>
                    <div onClick={goToKeyUses} className={buttonClassName}>
                        Continue
                    </div>
                </MobileOnboardingContent>
            </MobileOnboardingWrapper>
            <MobileOnboardingWrapper display={step === STEPS.IMPORT_SEED_PHRASE_KEY_USES}>
                <MobileOnboardingContent>
                    <div className="grow">
                        <OnboardingBackButton />
                        <OnboardingTitle title="Key uses" icon="RESTORE_FROM_SEED_PHRASE" />
                        <div className="text-white w-full max-w-2xl">
                            <p className="mb-4 text-sm">
                                This number should be <strong>higher than the total times your node has generated a signature</strong>. A signature is created each time you spend from a wallet address, including all transactions, consolidating, and splitting coins. Some transactions may involve multiple signatures.
                            </p>
                            <p className="mb-8 text-sm italic">If unsure, use the default value provided if you believe you have not generated more than 1,000 signatures.</p>
                            <div className="mb-8">
                                <label className="block mb-3">Enter the number of times you have signed with your keys</label>
                                <input type="number" value={keyUses} onChange={(e) => setKeyUses(parseInt(e.target.value))} className={inputClassName} placeholder="Enter number of keys" />
                            </div>
                        </div>
                    </div>
                    <div onClick={goToRecoverWithMegaNodeOptions} className={buttonClassName}>
                        Continue
                    </div>
                </MobileOnboardingContent>
            </MobileOnboardingWrapper>
            <MobileOnboardingWrapper display={step === STEPS.IMPORT_SEED_PHRASE_RECOVER_WITH_MEGA_NODE_OPTIONS}>
                <MobileOnboardingContent>
                    <OnboardingBackButton />
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
                </MobileOnboardingContent>
            </MobileOnboardingWrapper>
            <MobileOnboardingWrapper display={step === STEPS.IMPORT_SEED_PHRASE_RECOVER_WITH_MEGA_NODE_MANUALLY}>
                <MobileOnboardingContent>
                    <OnboardingBackButton />
                    <OnboardingTitle title="Connect to a Mega node" icon="RESTORE_FROM_SEED_PHRASE" />
                    <div className="grow text-white w-full max-w-2xl">
                        <div className="mb-8">
                            <label className="mb-3 block">
                                Please enter the url:port or ip:port of a Mega node.
                            </label>
                            <input type="text" value={ip} onChange={(e) => setIp(e.target.value)} placeholder="" className={inputClassName} />
                        </div>
                        <div className="flex flex-col gap-3">
                        </div>
                        {error && <div className="mt-6 text-red-500 font-bold text-xs">{error}</div>}
                    </div>
                    <button disabled={isLoading || disableIfNotIPAndHost} onClick={restoreFromIp} className={buttonClassName}>
                        Restore
                    </button>
                </MobileOnboardingContent>
            </MobileOnboardingWrapper>
            <MobileOnboardingWrapper display={step === STEPS.IMPORT_SEED_PHRASE_RECOVER_WITH_MEGA_NODE_AUTO_CONNECT}>
                <MobileOnboardingContent>
                    <div className="grow">
                        <OnboardingBackButton />
                        <OnboardingTitle title="Confirmation" icon="RESTORE_FROM_SEED_PHRASE" />
                        <div className="text-white w-full max-w-2xl">
                            <p className="mb-8">You are about to import a seed phrase to this node and restore all coins.</p>
                            <div className="flex flex-col gap-3">

                            </div>
                        </div>
                    </div>
                    <div onClick={autoConnectAndRestore} className={buttonClassName}>
                        Start restore
                    </div>
                </MobileOnboardingContent>
            </MobileOnboardingWrapper>
            <MobileOnboardingWrapper display={step === STEPS.IMPORT_SEED_PHRASE_RESTORING_FROM_PHRASE}>
                <MobileOnboardingContent>
                    <div className="grow flex items-center justify-center">
                        <div>
                            <div className="block flex items-center justify-center mb-6">
                                <img src="./icons/loader3.gif" className="w-[64px] h-[64px]" alt="Loading" />
                            </div>
                            <div className="text-center text-white mb-4">
                                Restoring your node...
                            </div>
                        </div>
                    </div>
                </MobileOnboardingContent>
            </MobileOnboardingWrapper>
        </div>
    )
}

export default MobileRestoreFromPhrase;  