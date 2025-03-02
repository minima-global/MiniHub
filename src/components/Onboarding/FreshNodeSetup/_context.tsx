import { createContext, useContext, useEffect, useState } from "react";
import { appContext } from "../../../AppContext";
import { onboardingContext, Step } from "..";
import { addPeers } from "../../../lib";
import { hasPeers } from "./_api";
import { hideOnboarding } from "../utils";
import STEPS from "../steps";

const freshNodeContext = createContext<{
    seedPhrase: string[] | null;
    setSeedPhrase: (seedPhrase: string[]) => void;
    copySeedPhrase: () => void;
    step: Step;
    setStep: (step: Step) => void;
    keysGenerated: boolean;
    peerList: string;
    setPeerList: (peerList: string) => void;
    peerListError: boolean;
    autoConnectError: boolean;
    showingSeedPhrase: boolean;
    copiedSeedPhrase: boolean;
    setCopiedSeedPhrase: (copiedSeedPhrase: boolean) => void;
    viewedSeedPhrase: boolean;
    setViewedSeedPhrase: (viewedSeedPhrase: boolean) => void;
    seedPhraseWritten: boolean;
    setSeedPhraseWritten: (seedPhraseWritten: boolean) => void;
    seedPhraseAccess: boolean;
    setSeedPhraseAccess: (seedPhraseAccess: boolean) => void;
    goToConnectOptions: () => void;
    goToAddConnections: () => void;
    goToAutoConnect: () => void;
    goToSkipPeers: () => void;
    continueFromSeedPhrase: () => void;
    toggleShowingSeedPhrase: () => void;
    handlePeerListInfo: () => void;
    connectToNetwork: () => void;
    autoConnectToNetwork: () => void;
    completeOnboarding: () => void;
}>({
    step: null,
    setStep: () => { },
    keysGenerated: false,
    peerList: "",
    setPeerList: () => { },
    peerListError: false,
    autoConnectError: false,
    showingSeedPhrase: false,
    seedPhrase: null,
    setSeedPhrase: () => { },
    copiedSeedPhrase: false,
    setCopiedSeedPhrase: () => { },
    viewedSeedPhrase: false,
    setViewedSeedPhrase: () => { },
    seedPhraseWritten: false,
    setSeedPhraseWritten: () => { },
    seedPhraseAccess: false,
    setSeedPhraseAccess: () => { },
    goToConnectOptions: () => { },
    goToAddConnections: () => { },
    goToAutoConnect: () => { },
    goToSkipPeers: () => { },
    continueFromSeedPhrase: () => { },
    toggleShowingSeedPhrase: () => { },
    handlePeerListInfo: () => { },
    connectToNetwork: () => { },
    autoConnectToNetwork: () => { },
    completeOnboarding: () => { },  
    copySeedPhrase: () => { },
});

export const FreshNodeSetupProvider = ({ children }: { children: React.ReactNode }) => {
    const { appReady, setShowOnboarding, autoConnectPeers } = useContext(appContext);
    const { keysGenerated, setPrompt, step, setStep } = useContext(onboardingContext);
    const [seedPhrase, setSeedPhrase] = useState<string[] | null>(null);
    const [seedPhraseWritten, setSeedPhraseWritten] = useState(false);
    const [seedPhraseAccess, setSeedPhraseAccess] = useState(false);
    const [peerList, setPeerList] = useState<string>("");
    const [peerListError, setPeerListError] = useState(false);
    const [autoConnectError, setAutoConnectError] = useState(false);
    const [showingSeedPhrase, setShowingSeedPhrase] = useState(false);
    const [viewedSeedPhrase, setViewedSeedPhrase] = useState(false);
    const [copiedSeedPhrase, setCopiedSeedPhrase] = useState(false);

    useEffect(() => {
        if (appReady && !seedPhrase) {
            MDS.cmd("vault", function (msg) {
                setSeedPhrase(msg.response.phrase.split(" "));
            })
        }
    }, [appReady]);

    useEffect(() => {
        if (copiedSeedPhrase) {
            setTimeout(() => {
                setCopiedSeedPhrase(false);
            }, 2000);
        }
    }, [copiedSeedPhrase]);

    const connectToNetwork = async () => {
        try {
            await addPeers(peerList);
            setStep(STEPS.FRESH_NODE_WELCOME_TO_THE_NETWORK);
        } catch {
            setPeerListError(true);
        }
    }

    const autoConnectToNetwork = async () => {
        try {
            await autoConnectPeers();
            setStep(STEPS.FRESH_NODE_WELCOME_TO_THE_NETWORK);
        } catch {
            setAutoConnectError(true);
        }
    }

    const handlePeerListInfo = () => {
        setPrompt({ display: true, title: "Peer list", description: <span>An initial set of Minima nodes that are available to connect to.<br/><br/> Must be a comma separated list of nodes in the format ip:port or domain:port.<br/><br/> Existing users can find a shareable list of peers in the Settings of their MiniHub.</span> });
    }

    const continueFromSeedPhrase = () => {
        setStep(STEPS.FRESH_NODE_LOADING_FOR_KEYS);
    }

    const goToConnectOptions = async () => {
        if (await hasPeers()) {
            setStep(STEPS.FRESH_NODE_WELCOME_TO_THE_NETWORK);
        } else {
            setStep(STEPS.FRESH_NODE_CONNECT_OPTIONS);
        }
    }

    const goToAddConnections = () => {
        setStep(STEPS.FRESH_NODE_ADD_CONNECTIONS);
    }

    const goToAutoConnect = () => {
        setStep(STEPS.FRESH_NODE_AUTO_CONNECT);
    }

    const goToSkipPeers = () => {
        setStep(STEPS.FRESH_NODE_SKIP);
    }

    const completeOnboarding = async () => {
        hideOnboarding();
        setShowOnboarding(false);
    }

    const toggleShowingSeedPhrase = () => {
        setShowingSeedPhrase(!showingSeedPhrase)
        setViewedSeedPhrase(true)
    }

    const copySeedPhrase = () => {
        navigator.clipboard.writeText(seedPhrase?.join(" ") || "");
        setCopiedSeedPhrase(true);
    }

    const value = {
        step,
        setStep,
        keysGenerated,
        /**
         * State
         */
        seedPhrase,
        setSeedPhrase,
        copiedSeedPhrase,
        setCopiedSeedPhrase,
        viewedSeedPhrase,
        setViewedSeedPhrase,
        seedPhraseWritten,
        setSeedPhraseWritten,
        seedPhraseAccess,
        setSeedPhraseAccess,
        peerList,
        setPeerList,
        autoConnectError,
        showingSeedPhrase,        
        /**
         * Actions
         */
        peerListError,
        goToConnectOptions,
        goToAddConnections,
        goToAutoConnect,
        goToSkipPeers,
        continueFromSeedPhrase,
        copySeedPhrase,
        toggleShowingSeedPhrase,
        handlePeerListInfo,
        connectToNetwork,
        autoConnectToNetwork,
        completeOnboarding,
    };

    return (
        <freshNodeContext.Provider value={value}>
            {children}
        </freshNodeContext.Provider>
    );
};

export default freshNodeContext;