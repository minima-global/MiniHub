import { useContext, useState } from "react";
import OnboardingWrapper from "../OnboardingWrapper";
import ConfirmSeedPhrase from "./ConfirmSeedPhrase";
import bip39 from "../bip39";
import STEPS from "../steps";
import OnboardingModal from "../OnboardingModal";
import OnboardingTitle from "../OnboardingTitle";
import { buttonClassName, inputClassName, inputClassName, optionClassName } from "../styling";
import { onboardingContext } from "..";

type ImportProps = {
    step: number | null;
    setStep: (step: number) => void;
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
    const { setBackButton } = useContext(onboardingContext);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const [action, setAction] = useState('');

    const [seedPhrase, setSeedPhrase] = useState<(string | undefined)[]>([
        'CONCERT', 'SQUEEZE', 'FLAME', 'DISH', 'FLAVOR', 'VALID', 'ALPHA', 'UNUSUAL', 'FOSTER', 'COST', 'APPROVE', 'WING', 'SUN', 'TORNADO', 'STICK', 'SHELL', 'DECORATE', 'UNVEIL', 'PARENT', 'CROP', 'VOLUME', 'ACTUAL', 'VIVID', 'SWEAR'
    ]);

    const [secretKeyOne, setSecretKeyOne] = useState("");
    const [secretKeyTwo, setSecretKeyTwo] = useState("");
    const [secretKeyThree, setSecretKeyThree] = useState("");
    const [secretKeyFour, setSecretKeyFour] = useState("");
    const [secretKeyFive, setSecretKeyFive] = useState("");

    const [customPhrase, setCustomPhrase] = useState("");

    const [keys, setKeys] = useState(64);
    const [keyUses, setKeyUses] = useState(1);

    const [ip, setIp] = useState('34.32.59.133:9001');
    const [restorable, setRestorable] = useState(false);

    const testConnection = async () => {
        setLoading(true);
        const resp = await ping(ip);

        setLoading(false);

        if (resp.response.valid) {
            setRestorable(true);
        } else {
            setError("Enable to connect to the Mega node. Please try a different Mega node.");
        }
    }

    const restore = async () => {
        setLoading(true);

        if (action === 'phrase') {
            await resync(ip, seedPhrase.join(" "), keys, keyUses);
        } else if (action === 'secret') {
            await resync(ip, `${secretKeyOne}-${secretKeyTwo}-${secretKeyThree}-${secretKeyFour}-${secretKeyFive}`, keys, keyUses, true);
        } else if (action === 'custom') {
            await resync(ip, customPhrase, keys, keyUses, true);
        }

        setStep("CONNECT_TO_MEGA_NODE_RESTORE");
        setLoading(false);
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
                nextTarget.focus();
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
        setStep(21);
        setBackButton(1);
    };

    const disableContinueWithSeedPhrase = seedPhrase.filter(i => i && !bip39.includes(i)).length > 0;
    const disableContinueWithSecretKey = secretKeyOne.length !== 4 || secretKeyTwo.length !== 4 || secretKeyThree.length !== 4 || secretKeyFour.length !== 4 || secretKeyFive.length !== 4;

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
                                <div onClick={() => { setAction('secret'); setStep(22) }} className={optionClassName}>
                                    I have a Public Wallet 16 character secret
                                </div>
                                <div onClick={() => { setAction('custom'); setStep(30) }} className={optionClassName}>
                                    I want to use a custom seed phrase
                                </div>
                            </div>
                        </div>
                    </div>
                </OnboardingModal>
            </OnboardingWrapper>
            <OnboardingWrapper display={step === 21}>
                <OnboardingModal display={step === 21}>
                    <OnboardingTitle title="Enter your seed phrase" icon="RESTORE_FROM_SEED_PHRASE" />
                    <div className="text-white w-full max-w-2xl">
                        <p className="mb-8">Please review your entry carefully before continuing</p>
                        <div className="mb-8">
                            <ConfirmSeedPhrase seedPhrase={seedPhrase} setSeedPhrase={setSeedPhrase} />
                        </div>
                        <button onClick={() => setStep(23)} disabled={disableContinueWithSeedPhrase} className={buttonClassName}>
                            Continue
                        </button>
                    </div>
                </OnboardingModal>
            </OnboardingWrapper>
            <OnboardingWrapper display={step === 22}>
                <OnboardingModal display={step === 22}>
                    <OnboardingTitle title="Enter your 16 character secret" icon="RESTORE_FROM_SEED_PHRASE" />
                    <div className="text-white w-full max-w-2xl">
                        <p className="mb-8">Please review your entry carefully before continuing</p>
                        <div className="mb-8 flex gap-4">
                            <input id="phrase-1" type="text" maxLength={4} value={secretKeyOne} onChange={(e) => setSecretKeyOne(e.target.value)} onPaste={onPaste} onKeyUp={(e) => handleKeyUp(e)} className="bg-contrast-1 text-2xl font-bold text-center w-full p-3 mb-5 outline-none placeholder-gray-500" />
                            <input id="phrase-2" type="text" maxLength={4} value={secretKeyTwo} onChange={(e) => setSecretKeyTwo(e.target.value)} onPaste={onPaste} onKeyUp={(e) => handleKeyUp(e)} className="bg-contrast-1 text-2xl font-bold text-center w-full p-3 mb-5 outline-none placeholder-gray-500" />
                            <input id="phrase-3" type="text" maxLength={4} value={secretKeyThree} onChange={(e) => setSecretKeyThree(e.target.value)} onPaste={onPaste} onKeyUp={(e) => handleKeyUp(e)} className="bg-contrast-1 text-2xl font-bold text-center w-full p-3 mb-5 outline-none placeholder-gray-500" />
                            <input id="phrase-4" type="text" maxLength={4} value={secretKeyFour} onChange={(e) => setSecretKeyFour(e.target.value)} onPaste={onPaste} onKeyUp={(e) => handleKeyUp(e)} className="bg-contrast-1 text-2xl font-bold text-center w-full p-3 mb-5 outline-none placeholder-gray-500" />
                            <input id="phrase-5" type="text" maxLength={4} value={secretKeyFive} onChange={(e) => setSecretKeyFive(e.target.value)} onPaste={onPaste} onKeyUp={(e) => handleKeyUp(e)} className="bg-contrast-1 text-2xl font-bold text-center w-full p-3 mb-5 outline-none placeholder-gray-500" />
                        </div>
                        <button disabled={disableContinueWithSecretKey} onClick={() => setStep(23)} className={buttonClassName}>
                            Continue
                        </button>
                    </div>
                </OnboardingModal>
            </OnboardingWrapper>
            <OnboardingWrapper display={step === 30}>
                <OnboardingModal display={step === 30}>
                    <OnboardingTitle title="Enter your custom phrase" icon="RESTORE_FROM_SEED_PHRASE" />
                    <div className="text-white w-full max-w-2xl">
                        <p className="mb-8">Please review your entry carefully before continuing</p>
                        <div className="mb-8 flex gap-4">
                            <input type="text" value={customPhrase} onChange={(e) => setCustomPhrase(e.target.value)} onPaste={onPaste} className={inputClassName} placeholder="Enter your custom phrase" />
                        </div>
                        <div onClick={() => setStep(23)} className={buttonClassName}>
                            Continue
                        </div>
                    </div>
                </OnboardingModal>
            </OnboardingWrapper>
            <OnboardingWrapper display={step === 23}>
                <OnboardingModal display={step === 23}>
                    <OnboardingTitle title="Number of Keys" icon="RESTORE_FROM_SEED_PHRASE" />
                    <div className="text-white w-full max-w-2xl">
                        <p className="mb-4">Enter the number of wallet addresses (keys) to create.</p>
                        <p className="mb-8 text-sm">All Minima nodes are started with 64 addresses by default. If you previously manually created more, you can set the number of addresses to create here. Note that in future you should always create at least this many addresses to ensure all your coins are recovered.</p>
                        <div className="mb-8">
                            <label className="block mb-3">Enter number of keys</label>
                            <input type="number" value={keys} onChange={(e) => setKeys(parseInt(e.target.value))} className={inputClassName} placeholder="Enter number of keys" />
                        </div>
                        <div onClick={() => setStep(24)} className={buttonClassName}>
                            Continue
                        </div>
                    </div>
                </OnboardingModal>
            </OnboardingWrapper>
            <OnboardingWrapper display={step === 24}>
                <OnboardingModal display={step === 24}>
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
                        <div onClick={() => setStep("CONNECT_TO_MEGA_NODE_OPTIONS")} className={buttonClassName}>
                            Continue
                        </div>
                    </div>
                </OnboardingModal>
            </OnboardingWrapper>
            <OnboardingWrapper display={step === "CONNECT_TO_MEGA_NODE_OPTIONS"}>
                <OnboardingModal display={step === "CONNECT_TO_MEGA_NODE_OPTIONS"}>
                    <OnboardingTitle title="Connect to a Mega node" icon="RESTORE_FROM_SEED_PHRASE" />
                    <div className="text-white w-full max-w-2xl">
                        <p className="mb-8">To import your seed phrase/secret/custom phrase (delete as appropriate), you will need to connect to a Mega node to restore your coins and join the network.</p>
                        <div className="flex flex-col gap-3">
                            <button disabled={loading} onClick={() => setStep("CONNECT_TO_MEGA_NODE_MANUALLY")} className={optionClassName}>
                                Enter manually
                            </button>
                            <button disabled={loading} onClick={() => setStep("CONNECT_TO_MEGA_NODE_AUTO_CONNECT")} className={optionClassName}>
                                Use auto-connect
                            </button>
                        </div>
                        {error && <div className="mt-6 text-red-500 font-bold text-xs">{error}</div>}
                    </div>
                </OnboardingModal>
            </OnboardingWrapper>
            <OnboardingWrapper display={step === "CONNECT_TO_MEGA_NODE_MANUALLY"}>
                <OnboardingModal display={step === "CONNECT_TO_MEGA_NODE_MANUALLY"}>
                    <OnboardingTitle title="Connect to a Mega node" icon="RESTORE_FROM_SEED_PHRASE" />
                    <div className="text-white w-full max-w-2xl">
                        <p className="mb-6">To import your seed phrase/secret/custom phrase (delete as appropriate), you will need to connect to a Mega node to restore your coins and join the network.</p>
                        <div className="mb-8">
                            <label className="mb-3 block">
                                Please enter the url:port or ip:port of a Mega node.
                            </label>
                            <input type="text" value={ip} onChange={(e) => setIp(e.target.value)} placeholder="34.32.59.133:9001" className={inputClassName} />
                        </div>
                        <div className="flex flex-col gap-3">
                            {!restorable && (
                                <button disabled={loading} onClick={testConnection} className={buttonClassName}>
                                    {loading ? 'Testing...' : 'Test connection'}
                                </button>
                            )}
                            {restorable && <div onClick={restore} className={buttonClassName}>
                                Restore
                            </div>}
                        </div>
                        {error && <div className="mt-6 text-red-500 font-bold text-xs">{error}</div>}
                    </div>
                </OnboardingModal>
            </OnboardingWrapper>
            <OnboardingWrapper display={step === "CONNECT_TO_MEGA_NODE_RESTORE"}>
                <div className="text-center text-white w-full max-w-2xl">
                    <h1 className="text-2xl font-bold mb-8">Confirmation</h1>
                    <p className="mb-8">You are about to import a seed phrase to this node and restore all coins.</p>
                    <div className="flex flex-col gap-3">
                        <div onClick={() => setStep(26)} className="bg-black/30 hover:bg-black/50 transition-all duration-300 cursor-pointer p-4 rounded">
                            Start recovery
                        </div>
                        <div onClick={() => setStep(20)} className="bg-black/30 hover:bg-black/50 transition-all duration-300 cursor-pointer p-4 rounded">
                            Cancel
                        </div>
                    </div>
                </div>
            </OnboardingWrapper>

        </div>
    )
}

export default RestoreFromPhrase;  