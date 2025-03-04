import OnboardingWrapper from "../OnboardingWrapper";
import OnboardingModal from "../OnboardingModal";
import { buttonClassName, greyButtonClassName, inputClassName, optionClassName } from "../styling";
import OnboardingTitle from "../OnboardingTitle";
import Info from "./info";
import STEPS from "../steps";
import freshNodeContext from "./_context";
import { useContext } from "react";

const FreshNodeSetup: React.FC = () => {
    const {
        step,
        seedPhrase,
        autoConnectError,
        showingSeedPhrase,
        toggleShowingSeedPhrase,
        toggleSeedPhraseWritten,
        toggleSeedPhraseAccess,
        copiedSeedPhrase,
        viewedSeedPhrase,
        seedPhraseWritten,
        seedPhraseAccess,
        copySeedPhrase,
        continueFromSeedPhrase,
        name,
        handleName,
        setMaximaName,
        error,
        connectToNetwork,
        autoConnectToNetwork,
        completeOnboarding,
        keysGenerated,
        peerList,
        setPeerList,
        peerListError,
        goToConnectOptions,
        goToAddConnections,
        goToAutoConnect,
        goToSkipPeers,
        goToSkipTour,
        goToSetName,
        handlePeerListInfo,
        completeOnboardingButStartTour,
    } = useContext(freshNodeContext);

    return (
        <div>
            <OnboardingWrapper display={step === STEPS.FRESH_NODE_SETUP}>
                <OnboardingModal display={true}>
                    <OnboardingTitle title="Your seed phrase" icon="CREATE_NEW_ACCOUNT" />
                    <div className="text-left text-white mb-8">
                        This phrase can be used to recover your wallet.{" "}
                        <span className="font-bold">DO NOT SHARE IT WITH ANYONE!</span>
                    </div>
                    <div className="grid grid-cols-12 gap-3 text-sm mb-8">
                        {seedPhrase && seedPhrase?.length > 4 && seedPhrase?.map((word, index) => (
                            <div key={index} className="col-span-3 bg-contrast-1 transition-all duration-300 px-3 py-2 w-full rounded flex items-center justify-start">
                                <span className="font-thin pr-2">{index + 1}.</span> {showingSeedPhrase ? <strong>{word}</strong> : <span className="w-[100px] h-[12px] bg-contrast-2"></span>}
                            </div>
                        ))}
                        {seedPhrase && seedPhrase?.length < 4 && (
                            <div className="col-span-12 bg-contrast-1 transition-all duration-300 px-2 py-2 w-full rounded">
                                <div>{showingSeedPhrase ? seedPhrase : <div className="block w-full h-full min-h-[20px] rounded bg-contrast-2" />}</div>
                            </div>
                        )}
                    </div>
                    <div className="mb-8 flex flex-col gap-2">
                        <label className="relative text-sm flex items-center cursor-pointer">
                            <div className="relative flex items-center gap-2 mr-3">
                                <input type="checkbox" className="peer rounded-sm inline-block min-w-4 min-h-4 h-4 w-4 appearance-none border border-2 border-grey checked:border-orange transition-all duration-150 checked:opacity-100" checked={seedPhraseWritten} onChange={toggleSeedPhraseWritten} />
                                {seedPhraseWritten && (
                                    <svg className="absolute mx-auto w-full px-[2px] text-orange" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"></path></svg>
                                )}
                            </div>
                            <div className="pointer-events-none absolute left-[3px] bg-black w-[10px] h-[10px] bg-orange border border-black/20 rounded-sm opacity-0 peer-checked:opacity-100 transition-all duration-150" />
                            I have written down my secret seed phrase.
                        </label>
                        <label className="relative text-sm flex items-center cursor-pointer">
                            <div className="relative flex items-center gap-2 mr-3">
                                <input type="checkbox" className="peer rounded-sm inline-block min-w-4 min-h-4 h-4 w-4 appearance-none border border-2 border-grey checked:border-orange transition-all duration-150 checked:opacity-100" checked={seedPhraseAccess} onChange={toggleSeedPhraseAccess} />
                                {seedPhraseAccess && (
                                    <svg className="absolute mx-auto w-full px-[2px] text-orange" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"></path></svg>
                                )}
                            </div>
                            <div className="pointer-events-none absolute left-[3px] bg-black w-[10px] h-[10px] bg-orange border border-black/20 rounded-sm opacity-0 peer-checked:opacity-100 transition-all duration-150" />
                            I understand I can access my seed phrase from the Security MiniDapp
                        </label>
                    </div>
                    <div className="flex flex-col gap-3">
                        <button onClick={toggleShowingSeedPhrase} className={greyButtonClassName}>{showingSeedPhrase ? "Hide seed phrase" : "Show seed phrase"}</button>
                        <button onClick={copySeedPhrase} className={`${greyButtonClassName} !duration-[100ms] ${copiedSeedPhrase ? '!bg-emerald-500 !text-black' : ''} relative`}>
                            {copiedSeedPhrase ? "Copied" : "Copy seed phrase"}
                        </button>
                        <button onClick={continueFromSeedPhrase} className={buttonClassName} disabled={!seedPhraseWritten || !seedPhraseAccess || !viewedSeedPhrase}>Continue</button>
                    </div>
                </OnboardingModal>
            </OnboardingWrapper>
            <OnboardingWrapper display={step === STEPS.FRESH_NODE_LOADING_FOR_KEYS}>
                <OnboardingModal display={true} width="max-w-[440px]">
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
                    <div className="text-center text-white mb-8 max-w-[240px] mx-auto">
                        {!keysGenerated ? "Your node is generating keys. This may take a few minutes." : "Your node has successfully generated its keys."}
                    </div>
                    <button onClick={goToConnectOptions} className={buttonClassName}>
                        {keysGenerated ? "Continue" : "Skip"}
                    </button>
                </OnboardingModal>
            </OnboardingWrapper>
            <OnboardingWrapper display={step === STEPS.FRESH_NODE_CONNECT_OPTIONS}>
                <OnboardingModal display={true}>
                    <OnboardingTitle title="Join the network" icon="CREATE_NEW_ACCOUNT" />
                    <div className="text-white">
                        <div className="mb-8">
                            <p>Minima is a completely decentralised network.</p>
                            <p>To join, add connections manually or use auto-connect</p>
                        </div>
                        <div className="flex flex-col gap-3 text-sm">
                            <button onClick={goToAddConnections} className={optionClassName}>
                                Add connections manually
                            </button>
                            <button onClick={goToAutoConnect} className={optionClassName}>
                                Use auto-connect
                            </button>
                            <button onClick={goToSkipPeers} className={optionClassName}>
                                I'll do it later
                            </button>
                        </div>
                    </div>
                </OnboardingModal>
            </OnboardingWrapper>
            <OnboardingWrapper display={step === STEPS.FRESH_NODE_ADD_CONNECTIONS}>
                <OnboardingModal display={true}>
                    <OnboardingTitle title="Join the network" icon="CREATE_NEW_ACCOUNT" />
                    <form className="text-left text-white w-full max-w-2xl">
                        <div className="w-full">
                            <div className="flex flex-col gap-4">
                                <p>Ask another Minima user to:</p>
                                <div className="text-gray-400 mb-2">
                                    <div>1. Open Settings &amp; select 'Share connections'</div>
                                    <div>2. Copy their connections or press the 'Share connections' button</div>
                                </div>
                                <div className="mb-5">
                                    <label className="block mb-3">Once they have shared them, paste the connections below.</label>
                                    <div className="relative">
                                        <input value={peerList} onChange={(e) => setPeerList(e.target.value)} type="text" className={inputClassName} placeholder="Enter connections" />
                                        <div onClick={handlePeerListInfo} className="cursor-pointer absolute top-0 right-0 w-25 h-full flex items-center justify-end pr-4"><Info /></div>
                                    </div>
                                </div>
                                <button type="submit" disabled={peerList === ''} onClick={connectToNetwork} className={buttonClassName}>
                                    Add connections
                                </button>
                                {peerListError && (
                                    <div className={`${peerListError ? 'opacity-100' : 'opacity-0 h-0'} transition-opacity duration-300 mx-auto text-red-500 font-bold text-[13px] border border-red-600/50 rounded px-3 py-2 bg-red-500/[5%]`}>
                                        There was an unknown error connecting to peer list
                                    </div>
                                )}
                            </div>
                        </div>
                    </form>
                </OnboardingModal>
            </OnboardingWrapper>
            <OnboardingWrapper display={step === STEPS.FRESH_NODE_AUTO_CONNECT}>
                <OnboardingModal display={true}>
                    <OnboardingTitle title="Auto-connect" icon="CREATE_NEW_ACCOUNT" />
                    <div className="text-white w-full max-w-2xl">
                        <div className="w-full">
                            <div className="flex flex-col gap-5">
                                <p className="mb-4">This method will attempt to search for peers and automatically connect you to the Minima network</p>
                                <div>
                                    <div onClick={autoConnectToNetwork} className={buttonClassName}>
                                        Use auto-connect
                                    </div>
                                    {autoConnectError && (
                                        <div className={`${autoConnectError ? 'opacity-100' : 'opacity-0 h-0'} transition-opacity duration-300 mx-auto text-red-500 font-bold text-[13px] border border-red-600/50 rounded px-3 py-2 bg-red-500/[5%]`}>
                                            A connection could not be established, please try a different Mega node.
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </OnboardingModal>
            </OnboardingWrapper>
            <OnboardingWrapper display={step === STEPS.FRESH_NODE_SKIP_PEERS}>
                <OnboardingModal display={true} width="max-w-[520px]">
                    <OnboardingTitle title="Skipped joining the network" icon="CREATE_NEW_ACCOUNT" />
                    <p className="mb-9 text-left">You can add connections later from the Settings.</p>
                    <div className="flex flex-col gap-3">
                        <button onClick={goToSetName} className={`${buttonClassName} w-full`}>
                            I'll do it later
                        </button>
                        <button onClick={goToConnectOptions} className={greyButtonClassName}>
                            Add connections now
                        </button>
                    </div>
                </OnboardingModal>
            </OnboardingWrapper>
            <OnboardingWrapper display={step === STEPS.FRESH_NODE_SET_NAME}>
                <OnboardingModal display={true} width="max-w-[480px]">
                    <OnboardingTitle title="What should we call you?" icon="CREATE_NEW_ACCOUNT" />
                    <form className="w-full h-full flex items-center justify-center text-center text-white w-full">
                        <div className="w-full">
                            <div className="flex flex-col gap-6">
                                <input value={name} onChange={handleName} className={inputClassName} placeholder="Enter a name" />
                                {error && (
                                    <div className={`${error ? 'opacity-100' : 'opacity-0 h-0'} w-full text-left transition-opacity duration-300 mx-auto text-red-500 font-bold text-[13px] border border-red-600/50 rounded px-3 py-2 bg-red-500/[5%]`}>
                                        {error}
                                    </div>
                                )}
                                <button type="submit" disabled={name === ''} onClick={setMaximaName} className={`${buttonClassName} w-full`}>
                                    Set Maxima name
                                </button>
                            </div>
                        </div>
                    </form>
                </OnboardingModal>
            </OnboardingWrapper>
            <OnboardingWrapper display={step === STEPS.FRESH_NODE_WELCOME_TO_THE_NETWORK}>
                <OnboardingModal display={true} width="max-w-[520px]">
                    <div className="w-full h-full flex items-center justify-center text-center text-white w-full">
                        <div>
                            <h1 className="text-[24px] text-left leading-[34px] font-bold mb-8">Welcome to Minima{name ? `, ${name}` : ""}.</h1>
                            <div className="mb-10 text-left space-y-4">
                                <div>Before you get started, there are some important things you need to know:</div>
                                <div>🌍 &nbsp;Minima is not like any other blockchain—it runs entirely on your device without relying on centralized servers or third parties. Your device connects directly to the Minima blockchain, and by keeping it running, you help make Minima more decentralized.</div>
                                <div>⛓️ &nbsp;Your device creates, receives, and shares transactions with other users. When you transact, your device immediately sends your transaction to other Minima nodes to be processed. Every node, including yours, has an equal chance of finding the next block: no miners, no validators, true peer-to-peer consensus.</div>
                                <div>🔄 &nbsp;To transact, your device needs to stay in sync with the latest block. If it goes offline, it will attempt to catch up when reconnected. If your device is offline for too long and does not sync automatically, you will need to run a QuickSync from the Security MiniDapp before transacting.</div>
                                <div>📍 &nbsp;Check your device's latest block number in the top right corner. If it is not up to date, a warning will appear there.</div>
                            </div>
                            <div className="flex flex-col gap-3">
                                <div onClick={completeOnboardingButStartTour} className={buttonClassName}>
                                    Start tour
                                </div>
                                <div onClick={goToSkipTour} className={greyButtonClassName}>
                                    Skip tour
                                </div>
                            </div>
                        </div>
                    </div>
                </OnboardingModal>
            </OnboardingWrapper>
            <OnboardingWrapper display={step === STEPS.FRESH_NODE_SKIP_TOUR}>
                <OnboardingModal display={true} width="max-w-[400px]">
                    <div className="w-full h-full text-center">
                        <div>
                            <h1 className="text-2xl font-bold mb-6">All set!</h1>
                            <div className="mb-10 space-y-4 max-w-[260px] mx-auto">
                                <div>You can replay the tour from the Settings at any time.</div>
                            </div>
                            <div className="flex flex-col gap-3">
                                <div onClick={completeOnboarding} className={buttonClassName}>
                                    Let's go
                                </div>
                            </div>
                        </div>
                    </div>
                </OnboardingModal>
            </OnboardingWrapper>
        </div>
    )
}

export default FreshNodeSetup;