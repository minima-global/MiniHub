import { createContext, useContext, useEffect, useState } from "react";
import { appContext } from "../../../AppContext";
import { onboardingContext, Step } from "..";
import { addPeers } from "../../../lib";
import { hasPeers, maximaSetName } from "./_api";
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
    seedPhraseWritten: boolean;
    seedPhraseAccess: boolean;
    toggleViewedSeedPhrase: () => void;
    toggleSeedPhraseWritten: () => void;
    toggleSeedPhraseAccess: () => void;
    name: string;
    handleName: (e: React.ChangeEvent<HTMLInputElement>) => void;
    setMaximaName: () => void;
    error: string;
    goToConnectOptions: () => void;
    goToAddConnections: () => void;
    goToAutoConnect: () => void;
    goToSkipPeers: () => void;
    goToSetName: () => void;
    goToSkipTour: () => void;
    continueFromSeedPhrase: () => void;
    toggleShowingSeedPhrase: () => void;
    handlePeerListInfo: () => void;
    connectToNetwork: () => void;
    autoConnectToNetwork: () => void;
    completeOnboarding: () => void;
    completeOnboardingButStartTour: () => void;
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
    seedPhraseWritten: false,
    seedPhraseAccess: false,
    toggleViewedSeedPhrase: () => { },
    toggleSeedPhraseWritten: () => { },
    toggleSeedPhraseAccess: () => { },
    name: "",
    handleName: () => { },
    setMaximaName: () => { },
    error: "",
    goToConnectOptions: () => { },
    goToAddConnections: () => { },
    goToAutoConnect: () => { },
    goToSkipPeers: () => { },
    goToSetName: () => { },
    goToSkipTour: () => { },
    copySeedPhrase: () => { },
    continueFromSeedPhrase: () => { },
    toggleShowingSeedPhrase: () => { },
    handlePeerListInfo: () => { },
    connectToNetwork: () => { },
    autoConnectToNetwork: () => { },
    completeOnboarding: () => { },  
    completeOnboardingButStartTour: () => { },
});

export const FreshNodeSetupProvider = ({ children }: { children: React.ReactNode }) => {
    const { appReady, setShowOnboarding, autoConnectPeers, setShowOnboard, getMaximaDetails } = useContext(appContext);
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
    const [name, setName] = useState("");
    const [error, setError] = useState("");

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
            setStep(STEPS.FRESH_NODE_SET_NAME);
        } catch {
            setPeerListError(true);
        }
    }

    const autoConnectToNetwork = async () => {
        try {
            await autoConnectPeers();
            setStep(STEPS.FRESH_NODE_SET_NAME);
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
            setStep(STEPS.FRESH_NODE_SET_NAME);
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

    const setMaximaName = async () => {
        try {
            setError("");
            await maximaSetName(name);
            await getMaximaDetails();
            setStep(STEPS.FRESH_NODE_WELCOME_TO_THE_NETWORK);
        } catch {
            setError("Unable to set name, please try a different name.");
        }
    }

    const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }

    const goToSetName = () => {
        setStep(STEPS.FRESH_NODE_SET_NAME);
    }

    const goToSkipPeers = () => {
        setStep(STEPS.FRESH_NODE_SKIP_PEERS);
    }

    const goToSkipTour = () => {
        setStep(STEPS.FRESH_NODE_SKIP_TOUR);
    };

    const completeOnboarding = async () => {
        hideOnboarding();
        setShowOnboarding(false);
    }

    const completeOnboardingButStartTour = async () => {
        hideOnboarding();
        setShowOnboarding(false);
        setShowOnboard(true); // tour
    }

    const toggleShowingSeedPhrase = () => {
        setShowingSeedPhrase(!showingSeedPhrase)
        setViewedSeedPhrase(true)
    }

    const copySeedPhrase = () => {
        navigator.clipboard.writeText(seedPhrase?.join(" ") || "");
        setCopiedSeedPhrase(true);
    }

    const toggleViewedSeedPhrase = () => {
        setViewedSeedPhrase(!viewedSeedPhrase)
    }

    const toggleSeedPhraseWritten = () => {
        setSeedPhraseWritten(!seedPhraseWritten)
    }

    const toggleSeedPhraseAccess = () => {
        setSeedPhraseAccess(!seedPhraseAccess)
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
        seedPhraseWritten,
        seedPhraseAccess,
        toggleViewedSeedPhrase,
        toggleSeedPhraseWritten,
        toggleSeedPhraseAccess,
        peerList,
        setPeerList,
        autoConnectError,
        showingSeedPhrase,        
        /**
         * Actions
         */
        name,
        handleName,
        setMaximaName,
        error,
        peerListError,
        goToConnectOptions,
        goToAddConnections,
        goToAutoConnect,
        goToSkipPeers,
        goToSetName,
        goToSkipTour,
        continueFromSeedPhrase,
        copySeedPhrase,
        toggleShowingSeedPhrase,
        handlePeerListInfo,
        connectToNetwork,
        autoConnectToNetwork,
        completeOnboarding,
        completeOnboardingButStartTour,
    };

    return (
        <freshNodeContext.Provider value={value}>
            {children}
        </freshNodeContext.Provider>
    );
};

export default freshNodeContext;