import { useContext, useEffect, useState } from "react";
import { appContext } from "../../AppContext";
import ConfirmSeedPhrase from "./ConfirmSeedPhrase";
import { addPeers } from "../../lib";

const OnboardingStep: React.FC<React.PropsWithChildren<{ display: boolean }>> = ({ display, children }: { display: boolean, children: React.ReactNode }) => {
    return (
        <div className={`absolute left-0 top-0 w-full h-screen flex items-center justify-center ${display ? '' : 'pointer-events-none'}`}>
            <div className={`relative w-full mx-4 lg:mx-0 ${display ? 'opacity-100' : 'opacity-0'} transition-all duration-150`}>
                <div className="mx-auto w-full max-w-xl bg-black/50 p-4 text-sm rounded">
                    {children}
                </div>
            </div>
        </div>
    )
};

const Onboarding = () => {
    const { appReady, autoConnectPeers } = useContext(appContext);
    const [step, setStep] = useState<number | null>(0);
    const [seedPhrase, setSeedPhrase] = useState<string[] | null>(null);
    const [seedPhraseWritten, setSeedPhraseWritten] = useState(false);
    const [seedPhraseAccess, setSeedPhraseAccess] = useState(false);
    const [peerList, setPeerList] = useState<string>("");
    const [peerListError, setPeerListError] = useState(false);
    const [autoConnectError, setAutoConnectError] = useState(false);

    useEffect(() => {
        if (appReady && !seedPhrase) {
            MDS.cmd("vault", function (msg) {
                setSeedPhrase(msg.response.phrase.split(" "));
            })
        }
    }, [appReady]);

    const connect = async () => {
        try {
            await addPeers(peerList);
            setStep(999);
        } catch {
            setPeerListError(true);
        }
    }

    const autoConnect = async () => {
        try {
            await autoConnectPeers();
            setStep(999);
        } catch {
            setAutoConnectError(true);
        }
    }

    return (
        <div className="fixed top-0 left-0 w-full h-full z-50 bg-cover bg-center">
            <div className="absolute z-50 top-0 left-0 w-full h-full">
                <div className="relative z-30">
                    <OnboardingStep display={step === 0}>
                        <div className="mt-4 text-center text-white">
                            To get started, create a new node or import an existing one.
                        </div>
                        <div className="text-center text-white mb-8">
                            Have you previously run a Minima node?
                        </div>
                        <div className="flex flex-col gap-3">
                            <div onClick={() => setStep(1)} className="bg-black/30 hover:bg-black/50 transition-all duration-300 cursor-pointer p-4 rounded">
                                Create a new account
                            </div>
                            <div onClick={() => setStep(20)} className="bg-black/30 hover:bg-black/50 transition-all duration-300 cursor-pointer p-4 rounded">
                                Import a seed phrase
                            </div>
                            <div onClick={() => setStep(27)} className="bg-black hover:bg-black/30 transition-all duration-300 cursor-pointer p-4 rounded">
                                Import a Minima backup
                            </div>
                        </div>
                    </OnboardingStep>
                    <OnboardingStep display={step === 1}>
                        <div className="text-center text-white mb-8">
                            This phrase can be used to recover your wallet.
                            <div className="font-bold">DO NOT SHARE IT WITH ANYONE!</div>
                        </div>
                        <div className="grid grid-cols-12 gap-3 text-sm mb-8">
                            {seedPhrase?.map((word, index) => (
                                <div key={index} className="col-span-4 bg-black/30 transition-all duration-300 px-3 py-2 w-full rounded">
                                    <span className="font-thin pr-2">{index + 1}.</span> <strong>{word}</strong>
                                </div>
                            ))}
                        </div>
                        <div className="mb-8 flex flex-col gap-2">
                            <label className="relative text-sm flex items-center cursor-pointer">
                                <input type="checkbox" className="peer mr-3 inline-block min-w-4 min-h-4 h-4 w-4 appearance-none border border-grey checked:bg-white checked:text-white transition-all duration-150 checked:opacity-100" checked={seedPhraseWritten} onChange={() => setSeedPhraseWritten(!seedPhraseWritten)} />
                                <div className="pointer-events-none absolute left-[2px] bg-black w-[12px] h-[12px] bg-blue-600 rounded-sm opacity-0 peer-checked:opacity-100 transition-all duration-150" />
                                I have written down my secret seed phrase.
                            </label>
                            <label className="relative text-sm flex items-center cursor-pointer">
                                <input type="checkbox" className="peer mr-3 inline-block min-w-4 min-h-4 h-4 w-4 appearance-none border border-grey checked:bg-white checked:text-white transition-all duration-150 checked:opacity-100" checked={seedPhraseAccess} onChange={() => setSeedPhraseAccess(!seedPhraseAccess)} />
                                <div className="pointer-events-none absolute left-[2px] bg-black w-[12px] h-[12px] bg-blue-600 rounded-sm opacity-0 peer-checked:opacity-100 transition-all duration-150" />
                                I understand I can access my seed phrase from the Security MiniDapp
                            </label>
                        </div>
                        <button className="bg-black/30 enabled:hover:bg-black/50 transition-all duration-300 cursor-pointer p-4 w-full rounded disabled:cursor-not-allowed" disabled={!seedPhraseWritten || !seedPhraseAccess} onClick={() => setStep(2)}>Continue</button>
                    </OnboardingStep>
                    <OnboardingStep display={step === 2}>
                        <div className="text-center text-white mb-8">
                            Your node is starting up. This may take a few minutes.
                        </div>
                        <button className="bg-black/30 enabled:hover:bg-black/50 transition-all duration-300 cursor-pointer p-4 w-full rounded disabled:cursor-not-allowed" onClick={() => setStep(3)}>Continue</button>
                    </OnboardingStep>
                    <OnboardingStep display={step === 3}>
                        <div className="text-center text-white">
                            <h1 className="text-2xl font-bold mb-8">Join the network</h1>
                            <div className="mb-8">
                                <p>Minima is a completely decentralised network.</p>
                                <p>To join, ask a Minima user to share connections with you.</p>
                            </div>
                            <div className="flex flex-col gap-3 text-sm">
                                <div onClick={() => setStep(4)} className="bg-black/30 hover:bg-black/50 transition-all duration-300 cursor-pointer p-4 rounded">
                                    Add connections
                                </div>
                                <div onClick={() => setStep(5)} className="bg-black/30 hover:bg-black/50 transition-all duration-300 cursor-pointer p-4 rounded">
                                    Use auto-connect
                                </div>
                                <div onClick={() => setStep(6)} className="bg-black/30 hover:bg-black/50 transition-all duration-300 cursor-pointer p-4 rounded">
                                    I'll do it later
                                </div>
                            </div>
                        </div>
                    </OnboardingStep>
                    <OnboardingStep display={step === 4}>
                        <div className="text-center text-white w-full max-w-2xl">
                            <h1 className="text-2xl font-bold mb-8">Join the network</h1>
                            <div className="w-full">
                                <div className="flex flex-col gap-5 text-center">
                                    <p>Ask someone on the network to:</p>
                                    <div className="text-gray-400">
                                        <div>1. Open Settings &amp; select 'Share connections'</div>
                                        <div>2. Copy their connections or press the 'Share connections' button</div>
                                    </div>
                                    <p className="mb-2">Once they have shared them, paste the connections below.</p>
                                    <input value={peerList} onChange={(e) => setPeerList(e.target.value)} type="text" className="text-sm bg-black/50 w-full p-3 mb-5 outline-none placeholder-gray-500" placeholder="Enter connections" />
                                    <button onClick={connect} disabled={peerList === ''} className="bg-black/30 enabled:hover:bg-black/50 transition-all duration-300 cursor-pointer p-4 rounded disabled:cursor-not-allowed">
                                        Add connections
                                    </button>
                                    {peerListError && (
                                        <div className={`${peerListError ? 'opacity-100' : 'opacity-0 h-0'} transition-opacity duration-300 mx-auto text-red-500 font-bold text-[13px] border border-red-600/50 rounded px-2 py-1 bg-red-500/[5%]`}>
                                            There was an unknown error connecting to peer list
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </OnboardingStep>
                    <OnboardingStep display={step === 5}>
                        <div className="text-center text-white w-full max-w-2xl">
                            <h1 className="text-2xl font-bold mb-8">Auto-connect</h1>
                            <div className="w-full">
                                <div className="flex flex-col gap-5 text-center">
                                    <p className="mb-4">This method will randomly select peers for you from a megammr node by running</p>
                                    <div>
                                        <div onClick={autoConnect} className="bg-black/30 hover:bg-black/50 transition-all duration-300 cursor-pointer p-4 rounded">
                                            Auto-connect
                                        </div>
                                        {autoConnectError && (
                                            <div className={`${autoConnectError ? 'opacity-100' : 'opacity-0 h-0'} transition-opacity duration-300 mx-auto text-red-500 font-bold text-[13px] border border-red-600/50 rounded px-2 py-1 bg-red-500/[5%]`}>
                                                A connection could not be established, please try a different Mega node.
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </OnboardingStep>
                    <OnboardingStep display={step === 6}>
                        <div className="text-center text-white w-full max-w-2xl">
                            <h1 className="text-2xl font-bold mb-8">Welcome to the network</h1>
                            <div className="mb-8">
                                <p>You need to add connections before you can make transactions.</p>
                                <p>To add your connections later, visit Settings.</p>
                            </div>
                            <div onClick={() => setStep(null)} className="bg-black/30 hover:bg-black/50 transition-all duration-300 cursor-pointer p-4 rounded">
                                I'll do it later
                            </div>
                        </div>
                    </OnboardingStep>
                    <OnboardingStep display={step === 20}>
                        <div className="text-center text-white w-full max-w-2xl">
                            <h1 className="text-2xl font-bold mb-8">Import seed phrase</h1>
                            <div>
                                <div className="flex flex-col gap-3 text-sm">
                                    <div onClick={() => setStep(21)} className="bg-black/30 hover:bg-black/50 transition-all duration-300 cursor-pointer p-4 rounded">
                                        I have a 24 word seed phrase
                                    </div>
                                    <div onClick={() => setStep(22)} className="bg-black/30 hover:bg-black/50 transition-all duration-300 cursor-pointer p-4 rounded">
                                        I have a Public Wallet 16 character secret
                                    </div>
                                    <div onClick={() => setStep(6)} className="bg-black/30 hover:bg-black/50 transition-all duration-300 cursor-pointer p-4 rounded">
                                        I want to use a custom seed phrase
                                    </div>
                                </div>
                            </div>
                        </div>
                    </OnboardingStep>
                    <OnboardingStep display={step === 21}>
                        <div className="text-center text-white w-full max-w-2xl">
                            <h1 className="text-2xl font-bold mb-8">Enter seed phrase</h1>
                            <p className="mb-8">Please review your entry carefully before continuing</p>
                            <div className="mb-8">
                                <ConfirmSeedPhrase />
                            </div>
                            <div onClick={() => setStep(23)} className="bg-black/30 hover:bg-black/50 transition-all duration-300 cursor-pointer p-4 rounded">
                                Continue
                            </div>
                        </div>
                    </OnboardingStep>
                    <OnboardingStep display={step === 22}>
                        <div className="text-center text-white w-full max-w-2xl">
                            <h1 className="text-2xl font-bold mb-8">Enter your 16 character secret</h1>
                            <p className="mb-8">Please review your entry carefully before continuing</p>
                            <div className="mb-4 flex gap-4">
                                <input type="text" value={16} className="bg-black/50 w-full p-3 mb-5 outline-none placeholder-gray-500" placeholder="Enter number of keys" />
                                <input type="text" value={16} className="bg-black/50 w-full p-3 mb-5 outline-none placeholder-gray-500" placeholder="Enter number of keys" />
                                <input type="text" value={16} className="bg-black/50 w-full p-3 mb-5 outline-none placeholder-gray-500" placeholder="Enter number of keys" />
                                <input type="text" value={16} className="bg-black/50 w-full p-3 mb-5 outline-none placeholder-gray-500" placeholder="Enter number of keys" />
                            </div>
                            <div onClick={() => setStep(23)} className="bg-black/30 hover:bg-black/50 transition-all duration-300 cursor-pointer p-4 rounded">
                                Continue
                            </div>
                        </div>
                    </OnboardingStep>
                    <OnboardingStep display={step === 23}>
                        <div className="text-center text-white w-full max-w-2xl">
                            <h1 className="text-2xl font-bold mb-8">Keys</h1>
                            <p className="mb-4">Enter the number of wallet addresses (keys) to create.</p>
                            <p className="mb-8 text-sm">All Minima nodes are started with 64 addresses by default. If you previously manually created more, you can set the number of addresses to create here. Note that in future you should always create at least this many addresses to ensure all your coins are recovered.</p>
                            <div className="mb-4">
                                <input type="number" value={64} className="bg-black/50 w-full p-3 mb-5 outline-none placeholder-gray-500" placeholder="Enter number of keys" />
                            </div>
                            <div onClick={() => setStep(24)} className="bg-black/30 hover:bg-black/50 transition-all duration-300 cursor-pointer p-4 rounded">
                                Continue
                            </div>
                        </div>
                    </OnboardingStep>
                    <OnboardingStep display={step === 24}>
                        <div className="text-center text-white w-full max-w-2xl">
                            <h1 className="text-2xl font-bold mb-8">Key Uses</h1>
                            <p className="mb-4">Enter your key uses (nonce).</p>
                            <p className="mb-4 text-sm">
                                This number should be <strong>higher than the total times your node has generated a signature</strong>. A signature is created each time you spend from a wallet address, including all transactions, consolidating, and splitting coins. Some transactions may involve multiple signatures.
                            </p>
                            <p className="mb-8 text-sm italic">If unsure, use the default value provided if you believe you have not generated more than 1,000 signatures.</p>
                            <div className="mb-4">
                                <input type="number" value={1000} className="bg-black/50 w-full p-3 mb-5 outline-none placeholder-gray-500" placeholder="Enter number of keys" />
                            </div>
                            <div onClick={() => setStep(25)} className="bg-black/30 hover:bg-black/50 transition-all duration-300 cursor-pointer p-4 rounded">
                                Continue
                            </div>
                        </div>
                    </OnboardingStep>
                    <OnboardingStep display={step === 25}>
                        <div className="text-center text-white w-full max-w-2xl">
                            <h1 className="text-2xl font-bold mb-8">Connect to a Mega node</h1>
                            <p className="mb-4">To import your seed phrase/secret/custom phrase (delete as appropriate), you will need to connect to a Mega node to restore your coins and join the network.</p>
                            <p className="mb-8 text-sm">
                                Please enter the url:port or ip:port of a Mega node.
                            </p>
                            <div className="mb-4">
                                <input type="text" value="" placeholder="e.g. 34.32.59.133:9001" className="bg-black/50 w-full p-3 mb-5 outline-none placeholder-gray-500" />
                            </div>
                            <div className="flex flex-col gap-3">
                                <div onClick={() => setStep(26)} className="bg-black/30 hover:bg-black/50 transition-all duration-300 cursor-pointer p-4 rounded">
                                    Test connection
                                </div>
                                <div onClick={() => setStep(26)} className="bg-black/30 hover:bg-black/50 transition-all duration-300 cursor-pointer p-4 rounded">
                                    Use auto connect
                                </div>
                            </div>
                            <div className="mt-6 text-red-500 font-bold text-xs">A connection could not be established, please try a different Mega node.</div>
                        </div>
                    </OnboardingStep>
                    <OnboardingStep display={step === 26}>
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
                    </OnboardingStep>

                    <OnboardingStep display={step === 27}>
                        <div className="text-center text-white w-full max-w-2xl">
                            <h1 className="text-2xl font-bold mb-8">Upload backup file</h1>
                            <p className="mb-8">Importing a backup will restore your wallet to its locked or unlocked state when the backup was taken.</p>
                            <div className="flex flex-col gap-3">
                                <div onClick={() => setStep(26)} className="bg-black/30 hover:bg-black/50 transition-all duration-300 cursor-pointer p-4 rounded">
                                    Upload backup
                                </div>
                                <div onClick={() => setStep(28)} className="bg-black/30 hover:bg-black/50 transition-all duration-300 cursor-pointer p-4 rounded">
                                    Continue
                                </div>
                            </div>
                        </div>
                    </OnboardingStep>
                    <OnboardingStep display={step === 28}>
                        <div className="text-center text-white mb-8 w-full max-w-2xl">
                            <h1 className="text-2xl font-bold mb-8">Password</h1>
                            <p className="mb-4">Enter the password you used when creating your backup.</p>
                            <p className="italic mb-8 text-sm">Keep the field empty if you did not set one.</p>
                            <div className="mb-8">
                                <input type="text" value="" className="bg-black/50 w-full p-3 mb-5 outline-none placeholder-gray-500" placeholder="Enter password" />
                            </div>
                            <div className="flex flex-col gap-3">
                                <div onClick={() => setStep(28)} className="bg-black/30 hover:bg-black/50 transition-all duration-300 cursor-pointer p-4 rounded">
                                    Continue
                                </div>
                            </div>
                        </div>
                    </OnboardingStep>
                </div>
            </div>
            <div className="absolute z-10 backdrop-blur-2xl bg-black/60 w-full h-full" />
        </div>
    );
};

export default Onboarding;
