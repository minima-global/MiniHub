import { useContext, useEffect } from "react";
import { useState } from "react";
import { appContext } from "../../../AppContext";
import { addPeers } from "../../../lib";
import { buttonClassName, greyButtonClassName, inputClassName, optionClassName } from "../styling";
import OnboardingTitle from "../OnboardingTitle";
import Info from "./info";
import { onboardingContext } from "..";
import STEPS from "../steps";
import { hideOnboarding } from "../utils";
import MobileOnboardingWrapper, { MobileOnboardingContent } from "../OnboardingMobileWrapper";
import OnboardingBackButton from "../OnboardingBackButton";

const MobileFreshNodeSetup: React.FC<{ step: number | string | null, setStep: React.Dispatch<React.SetStateAction<number | string | null>>, setShowOnboarding: React.Dispatch<React.SetStateAction<boolean>> }> = ({ step, setStep, setShowOnboarding }) => {
    const { appReady } = useContext(appContext);
    const { keysGenerated } = useContext(onboardingContext);
    const [seedPhrase, setSeedPhrase] = useState<string[] | null>(null);
    const [seedPhraseWritten, setSeedPhraseWritten] = useState(false);
    const [seedPhraseAccess, setSeedPhraseAccess] = useState(false);
    const [peerList, setPeerList] = useState<string>("");
    const [peerListError, setPeerListError] = useState(false);
    const [autoConnectError, setAutoConnectError] = useState(false);
    const { autoConnectPeers } = useContext(appContext);
    const { setPrompt } = useContext(onboardingContext);
    const [showingSeedPhrase, setShowingSeedPhrase] = useState(false);

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
            setStep(STEPS.FRESH_NODE_WELCOME_TO_THE_NETWORK);
        } catch {
            setPeerListError(true);
        }
    }

    const autoConnect = async () => {
        try {
            await autoConnectPeers();
            setStep(STEPS.FRESH_NODE_WELCOME_TO_THE_NETWORK);
        } catch {
            setAutoConnectError(true);
        }
    }

    const handlePeerListInfo = () => {
        setPrompt({ display: true, title: "Peer list", description: "Peer list is a list of connections to other nodes on the network. You can find this in the Settings menu." });
    }

    const continueFromSeedPhrase = () => {
        setStep(STEPS.FRESH_NODE_LOADING_FOR_KEYS);
    }

    const goToConnectOptions = () => {
        setStep(STEPS.FRESH_NODE_CONNECT_OPTIONS);
    }

    const goToAddConnections = () => {
        setStep(STEPS.FRESH_NODE_ADD_CONNECTIONS);
    }

    const goToAutoConnect = () => {
        setStep(STEPS.FRESH_NODE_AUTO_CONNECT);
    }

    const goToSkip = () => {
        setStep(STEPS.FRESH_NODE_SKIP);
    }

    const finish = async () => {
        hideOnboarding();
        setShowOnboarding(false);
    }

    return (
        <div className="text-sm">
            <MobileOnboardingWrapper display={step === STEPS.FRESH_NODE_SETUP}>
                <MobileOnboardingContent>
                    <OnboardingBackButton />
                    <OnboardingTitle title="Your seed phrase" icon="CREATE_NEW_ACCOUNT" />
                    <div className="text-left text-white mb-8">
                        This phrase can be used to recover your wallet.{" "}
                        <span className="font-bold">DO NOT SHARE IT WITH ANYONE!</span>
                    </div>
                    <div className="grid grid-cols-12 gap-1 text-sm mb-8">
                        {seedPhrase?.map((word, index) => (
                            <div key={index} className="col-span-6 bg-contrast-1 transition-all duration-300 px-3 py-2 w-full rounded flex items-center justify-start">
                                <span className="font-thin pr-2">{index + 1}.</span> {showingSeedPhrase ? <strong>{word}</strong> : <span className="w-[100px] h-[12px] bg-contrast-2"></span>}
                            </div>
                        ))}
                    </div>
                    <div className="mb-8 flex flex-col gap-2">
                        <label className="relative text-sm flex items-center cursor-pointer">
                            <input type="checkbox" className="peer mr-3 rounded-sm inline-block min-w-4 min-h-4 h-4 w-4 appearance-none border border-grey checked:bg-white checked:text-white transition-all duration-150 checked:opacity-100" checked={seedPhraseWritten} onChange={() => setSeedPhraseWritten(!seedPhraseWritten)} />
                            <div className="pointer-events-none absolute left-[3px] bg-black min-w-[10px] min-h-[10px] w-[10px] h-[10px] bg-orange border border-black/20 rounded-sm opacity-0 peer-checked:opacity-100 transition-all duration-150" />
                            I have written down my secret seed phrase.
                        </label>
                        <label className="relative text-sm flex items-start cursor-pointer">
                            <input type="checkbox" className="peer mr-3 mt-1 rounded-sm inline-block min-w-4 min-h-4 h-4 w-4 appearance-none border border-grey checked:bg-white checked:text-white transition-all duration-150 checked:opacity-100" checked={seedPhraseAccess} onChange={() => setSeedPhraseAccess(!seedPhraseAccess)} />
                            <div className="pointer-events-none absolute left-[3px] top-[7px] bg-black min-w-[10px] min-h-[10px] w-[10px] h-[10px] bg-orange border border-black/20 rounded-sm opacity-0 peer-checked:opacity-100 transition-all duration-150" />
                            <span className="flex-1">I understand I can access my seed phrase from the Security MiniDapp</span>
                        </label>
                    </div>
                    <div className="flex flex-col gap-3">
                        <button onClick={() => setShowingSeedPhrase(!showingSeedPhrase)} className={greyButtonClassName}>{showingSeedPhrase ? "Hide seed phrase" : "Show seed phrase"}</button>
                        <button onClick={continueFromSeedPhrase} className={buttonClassName} disabled={!seedPhraseWritten || !seedPhraseAccess}>Continue</button>
                    </div>
                </MobileOnboardingContent>
            </MobileOnboardingWrapper>
            <MobileOnboardingWrapper display={step === STEPS.FRESH_NODE_LOADING_FOR_KEYS}>
                <MobileOnboardingContent>
                    <div className="grow flex items-center">
                        <div className="px-8 mt-8">
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
                                Your node is starting up. This may take a few minutes.
                            </div>
                        </div>
                    </div>
                    <button onClick={goToConnectOptions} className={buttonClassName} disabled={!keysGenerated}>Continue</button>
                </MobileOnboardingContent>
            </MobileOnboardingWrapper>
            <MobileOnboardingWrapper display={step === STEPS.FRESH_NODE_CONNECT_OPTIONS}>
                <MobileOnboardingContent>
                    <OnboardingBackButton />
                    <OnboardingTitle title="Join the network" icon="CREATE_NEW_ACCOUNT" />
                    <div className="text-white">
                        <div className="mb-8">
                            <p>Minima is a completely decentralised network.</p>
                            <p>To join, ask a Minima user to share connections with you.</p>
                        </div>
                        <div className="flex flex-col gap-3 text-sm">
                            <button onClick={goToAddConnections} className={optionClassName}>
                                Add connections
                            </button>
                            <button onClick={goToAutoConnect} className={optionClassName}>
                                Use auto-connect
                            </button>
                            <button onClick={goToSkip} className={optionClassName}>
                                I'll do it later
                            </button>
                        </div>
                    </div>
                </MobileOnboardingContent>
            </MobileOnboardingWrapper>
            <MobileOnboardingWrapper display={step === STEPS.FRESH_NODE_ADD_CONNECTIONS}>
                <MobileOnboardingContent>
                    <div className="grow">
                        <OnboardingBackButton />
                        <OnboardingTitle title="Join the network" icon="CREATE_NEW_ACCOUNT" />
                        <div className="text-left text-white w-full max-w-2xl">
                            <div className="w-full">
                                <div className="flex flex-col gap-4">
                                    <p>Ask someone on the network to:</p>
                                    <div className="text-gray-400 mb-2">
                                        <div>1. Open Settings &amp; select 'Share connections'</div>
                                        <div>2. Copy their connections or press the 'Share connections' button</div>
                                    </div>
                                    <div className="mb-5">
                                        <label className="block mb-5">Once they have shared them, paste the connections below.</label>
                                        <div className="relative">
                                            <input value={peerList} onChange={(e) => setPeerList(e.target.value)} type="text" className={inputClassName} placeholder="Enter connections" />
                                            <div onClick={handlePeerListInfo} className="cursor-pointer absolute top-0 right-0 w-25 h-full flex items-center justify-end pr-4"><Info /></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {peerListError && (
                        <div className={`${peerListError ? 'opacity-100' : 'opacity-0 h-0'} w-full text-xs transition-opacity duration-300 mx-auto text-red-500 font-bold text-[13px] border border-red-600/50 rounded px-3 py-2 bg-red-600/[10%] mb-4`}>
                            There was an unknown error connecting<br /> to peer list
                        </div>
                    )}
                    <button onClick={connect} disabled={peerList === ''} className={buttonClassName}>
                        Add connections
                    </button>
                </MobileOnboardingContent>
            </MobileOnboardingWrapper>
            <MobileOnboardingWrapper display={step === STEPS.FRESH_NODE_AUTO_CONNECT}>
                <MobileOnboardingContent>
                    <div className="grow">
                        <OnboardingBackButton />
                        <OnboardingTitle title="Auto-connect" icon="CREATE_NEW_ACCOUNT" />
                        <div className="text-white w-full max-w-2xl">
                            <div className="w-full">
                                <div className="flex flex-col gap-5">
                                    <p className="mb-4">This method will randomly select peers for you from a megammr node by running</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div onClick={autoConnect} className={buttonClassName}>
                            Use Auto-connect
                        </div>
                        {autoConnectError && (
                            <div className={`${autoConnectError ? 'opacity-100' : 'opacity-0 h-0'} text-xs transition-opacity duration-300 mx-auto text-red-500 font-bold text-[13px] border border-red-600/50 rounded px-3 py-2 bg-red-500/[10%] mb-4`}>
                                A connection could not be established, please try a different Mega node.
                            </div>
                        )}
                    </div>
                </MobileOnboardingContent>
            </MobileOnboardingWrapper>
            <MobileOnboardingWrapper display={step === STEPS.FRESH_NODE_WELCOME_TO_THE_NETWORK}>
                <MobileOnboardingContent>
                    <div className="grow w-full h-full flex items-center justify-center text-center text-white w-full">
                        <div>
                            <h1 className="text-[28px] mb-10 leading-[36px]">Welcome<br />to the network</h1>
                            <div onClick={finish} className={`${buttonClassName} !max-w-[240px] mx-auto`}>
                                Let's go
                            </div>
                        </div>
                    </div>
                </MobileOnboardingContent>
            </MobileOnboardingWrapper>
            <MobileOnboardingWrapper display={step === STEPS.FRESH_NODE_SKIP}>
                <MobileOnboardingContent>
                    <div className="grow px-6 w-full h-full flex items-center justify-center text-center text-white w-full">
                        <div>
                            <h1 className="text-2xl font-bold mb-8">Welcome to the network</h1>
                            <div className="mb-10">
                                <p>You need to add connections before you can make transactions. To add your connections later, visit Settings.</p>
                            </div>
                            <div onClick={finish} className={buttonClassName}>
                                I'll do it later
                            </div>
                        </div>
                    </div>
                </MobileOnboardingContent>
            </MobileOnboardingWrapper>
        </div>
    )
}

export default MobileFreshNodeSetup;