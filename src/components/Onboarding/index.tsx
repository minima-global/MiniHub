import { createContext, useContext, useEffect, useState } from "react";

import RestoreFromPhrase from "./RestoreFromPhrase";
import RestoreFromBackup from "./RestoreFromBackup";
import OnboardingWrapper from "./OnboardingWrapper";
import FreshNodeSetup from "./FreshNodeSetup";
import OnboardingModal from "./OnboardingModal";
import STEPS from "./steps";
import OnboardingPrompt from "./OnboardingPrompt";
import OnboardingBackButton from "./OnboardingBackButton";
import { appContext } from "../../AppContext";
import MobileRestoreFromBackup from "./RestoreFromBackup/mobile";
import MobileOnboardingWrapper from "./OnboardingMobileWrapper";
import MobileFreshNodeSetup from "./FreshNodeSetup/mobile";
import MobileRestoreFromPhrase from "./RestoreFromPhrase/mobile";
import { FreshNodeSetupProvider } from "./FreshNodeSetup/_context";

export type Step = number | string | null;
export type Prompt = {
    display: boolean;
    title: string;
    description: string | JSX.Element;
}
type BackButton = string | number | null;

export const onboardingContext = createContext<{
    step: Step;
    setStep: (step: Step) => void;
    prompt: Prompt;
    setPrompt: (prompt: Prompt) => void;
    backButton: BackButton;
    setBackButton: (backButton: BackButton) => void;
    keysGenerated: boolean;
}>({
    step: 0,
    setStep: (_step: Step) => { },
    prompt: {
        display: false,
        title: "",
        description: "",
    },
    setPrompt: (_prompt: Prompt) => { },
    backButton: null,
    setBackButton: (_backButton: BackButton) => { },
    keysGenerated: false,
});

const Onboarding = () => {
    const { appReady, showOnboarding, setShowOnboarding } = useContext(appContext);
    const [step, setStep] = useState<number | string | null>(0);
    const [introductionStep, setIntroductionStep] = useState(0);
    const [prompt, setPrompt] = useState<Prompt>({
        display: false,
        title: "",
        description: "",
    });
    const [backButton, setBackButton] = useState<BackButton>(null);
    const [keysGenerated, setKeysGenerated] = useState<boolean>(false);
    const [isTestMode, setIsTestMode] = useState<boolean>(false);

    useEffect(() => {
        if (appReady) {
            MDS.cmd("status", function (msg) {
                if (msg.response.version.includes("-TEST")) {
                    setIsTestMode(true);
                }
            })
        }
    }, [appReady]);

    useEffect(() => {
        if (appReady && !keysGenerated) {
            const interval = setInterval(() => {
                MDS.cmd("keys", function (msg) {
                    const numberOfKeysRequired = isTestMode ? 8 : 64;

                    if (msg.response.total >= numberOfKeysRequired) {
                        setKeysGenerated(true);
                        clearInterval(interval);
                    }
                });
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [appReady, isTestMode]);

    useEffect(() => {
        if (introductionStep === 0) {
            const timeout = setTimeout(() => {
                setIntroductionStep(1);
            }, 2000);

            return () => {
                clearTimeout(timeout);
            }
        }
    }, [step]);

    const incrementStep = () => {
        return setIntroductionStep(1);
    };

    const dismissIntroduction = () => {
        setIntroductionStep(2);
        setStep(1);
    };

    const fullGradientOnSteps = [
        0,
        STEPS.FRESH_NODE_WELCOME_TO_THE_NETWORK,
        STEPS.FRESH_NODE_SKIP
    ];

    const goToFreshNodeSetup = () => {
        setStep(STEPS.FRESH_NODE_SETUP);
    };

    const goToSeedPhraseOptions = () => {
        setStep(STEPS.IMPORT_SEED_PHRASE_OPTIONS);
    };

    const goToRestoreFromBackup = () => {
        if (keysGenerated) {
            setStep(STEPS.RESTORE_FROM_BACKUP_SELECT_FILE);
        } else {
            setStep(STEPS.RESTORE_FROM_BACKUP);
        }
    };

    return (
        <onboardingContext.Provider value={{ keysGenerated, step, setStep, prompt, setPrompt, backButton, setBackButton }}>
            {/* Mobile */}
            <div className={`block lg:hidden fixed z-50 bg-black top-0 left-0 w-full h-full overflow-y-auto ${showOnboarding ? 'opacity-100' : 'transition-all duration-200 !hidden opacity-0 pointer-events-none'}`}>
                <div className="absolute z-50 top-0 left-0 w-full">
                    <OnboardingPrompt />
                    <OnboardingWrapper display={step === 0}>
                        <div onClick={() => incrementStep()} className={`fixed top-0 left-0 z-20 h-screen w-screen flex items-center justify-center transition-transform duration-300 ${introductionStep === 0 ? 'cursor-pointer opacity-100' : 'pointer-events-none translate-y-1 opacity-0 h-0 w-0'}`}>
                            <div className={`animate-fadeIn transition-opacity ${introductionStep === 0 ? 'w-16 h-16 lg:h-20 lg:w-20' : 'h-0 w-0'}`}>
                                <img src="./m.svg" alt="Minima" className="w-16 h-16 lg:w-20 lg:h-20" />
                            </div>
                        </div>
                        <div onClick={() => dismissIntroduction()} className={`fixed top-0 left-0 z-20 h-full w-full flex items-center justify-center transition-all duration-300 ${introductionStep === 1 ? 'cursor-pointer opacity-100 translate-y-0' : 'pointer-events-none translate-y-2 opacity-0'}`}>
                            <div className="text-white text-xl lg:text-4xl">Welcome to Minima</div>
                        </div>
                    </OnboardingWrapper>
                    <MobileOnboardingWrapper display={step === 1}>
                        <div className="pt-8 px-5">
                            <h1 className="mb-7 text-xl text-center mx-auto">Let's get started</h1>
                            <div className="flex flex-col lg:flex-row gap-3 text-sm">
                                <div onClick={goToFreshNodeSetup} className="relative after:chevron-right flex gap-5 p-4 items-center bg-contrast-1 hover:bg-contrast-1.5 active:scale-[98%] text-center transition-all duration-100 cursor-pointe rounded">
                                    <img src="./icons/create_a_new_account.svg" alt="Create a new account" className="w-8 h-8 mx-auto" />
                                    <div className="grow text-left">Create a new account</div>
                                </div>
                                <div onClick={goToSeedPhraseOptions} className="relative after:chevron-right flex gap-5 p-4 items-center bg-contrast-1 hover:bg-contrast-1.5 active:scale-[98%] text-center transition-all duration-100 cursor-pointe rounded">
                                    <img src="./icons/restore_from_phrase.svg" alt="Create a new account" className="w-8 h-8 mx-auto" />
                                    <div className="grow text-left">Import a seed phrase</div>
                                </div>
                                <div onClick={goToRestoreFromBackup} className="relative after:chevron-right flex gap-5 p-4 items-center bg-contrast-1 hover:bg-contrast-1.5 active:scale-[98%] text-center transition-all duration-100 cursor-pointe rounded">
                                    <img src="./icons/restore_from_backup.svg" alt="Create a new account" className="w-8 h-8 mx-auto" />
                                    <div className="grow text-left">Import a Minima backup</div>
                                </div>
                            </div>
                        </div>
                    </MobileOnboardingWrapper>
                    <FreshNodeSetupProvider>
                        <MobileFreshNodeSetup />
                    </FreshNodeSetupProvider>
                    <MobileRestoreFromPhrase step={step} setStep={setStep} />
                    <MobileRestoreFromBackup step={step} setStep={setStep} />
                </div>
                <div className="fixed z-20 top-0 left-0 w-full h-full p-2 overflow-hidden">
                    <div className="relative w-full h-full overflow-hidden rounded-sm">
                        <svg className={`absolute inset-0 w-full h-full transition-all duration-[1s] ${fullGradientOnSteps.includes(step as number) ? 'scale-[1]' : 'scale-1 grayscale-[80%] opacity-[70%]'}`} width="444px" height="776px" viewBox="0 0 444 776" version="1.1" xmlns="http://www.w3.org/2000/svg">
                            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                <g id="Artboard" transform="translate(2.000000, -64.000000)">
                                    <path className="blur-[100px]" d="M-128.231869,352.443406 C-195.476812,320.311585 -212.292602,366.673318 -285.941755,352.443406 C-412.781438,327.935614 -348.138724,725.151378 -288.636547,835.33908 C-173.741999,1048.10591 417.735292,1066.26807 351.119469,835.33908 C322.986328,737.816674 282.179254,657.954467 179.336171,635.357473 C152.8613,629.540405 96.2711873,631.311184 53.480399,588.517922 C-24.4028147,510.630206 -95.1216955,368.264768 -128.231869,352.443406 Z" id="Path" fill="#6162FB"></path>
                                    <path className="blur-[100px]" d="M526.769306,507.464924 C614.991094,396.575924 599.517912,260.756924 692.36447,156.847824 C879.828298,-52.9510756 783.6794,837.250924 562.422623,976.090924 C395.064218,1081.11192 52.1446047,1083.70292 99.4330669,844.538924 C134.136028,669.023924 293.259503,726.929924 406.002285,625.983924 C454.610936,582.462924 484.137741,561.046924 526.769306,507.464924 Z" id="Path" fill="#FF8630"></path>
                                </g>
                            </g>
                        </svg>
                    </div>
                </div>
            </div>

            {/* Desktop */}
            <div className={`hidden lg:block fixed top-0 left-0 w-full h-full z-50 bg-cover bg-center ${showOnboarding ? 'opacity-100' : 'transition-all duration-200 opacity-0 pointer-events-none'}`}>
                <div className="absolute z-50 top-0 left-0 w-full h-full">
                    <OnboardingBackButton />
                    <div className="relative z-30">
                        <OnboardingPrompt />
                        <OnboardingWrapper display={step === 0}>
                            <div onClick={() => incrementStep()} className={`fixed top-0 left-0 z-20 h-screen w-screen flex items-center justify-center transition-transform duration-300 ${introductionStep === 0 ? 'cursor-pointer opacity-100' : 'pointer-events-none translate-y-1 opacity-0 h-0 w-0'}`}>
                                <div className={`animate-fadeIn transition-opacity ${introductionStep === 0 ? 'w-16 h-16 lg:h-20 lg:w-20' : 'h-0 w-0'}`}>
                                    <img src="./m.svg" alt="Minima" className="w-16 h-16 lg:w-20 lg:h-20" />
                                </div>
                            </div>
                            <div onClick={() => dismissIntroduction()} className={`fixed top-0 left-0 z-20 h-full w-full flex items-center justify-center transition-all duration-300 ${introductionStep === 1 ? 'cursor-pointer opacity-100 translate-y-0' : 'pointer-events-none translate-y-2 opacity-0'}`}>
                                <div className="text-white text-xl lg:text-4xl">Welcome to Minima</div>
                            </div>
                        </OnboardingWrapper>
                        <OnboardingWrapper display={step === 1}>
                            <OnboardingModal display={step === 1}>
                                <h1 className="pt-6 lg:pt-0 -mt-1.5 mb-8 text-xl lg:text-2xl text-center mx-auto">Let's get started</h1>
                                <div className="flex flex-col lg:flex-row gap-3">
                                    <div onClick={goToFreshNodeSetup} className="bg-contrast-1 hover:bg-contrast-1.5 active:scale-[98%] text-center transition-all duration-100 cursor-pointer p-5 lg:p-9 rounded">
                                        <img src="./icons/create_a_new_account.svg" alt="Create a new account" className="w-10 h-10 mx-auto mb-4" />
                                        Create a new account
                                    </div>
                                    <div onClick={goToSeedPhraseOptions} className="bg-contrast-1 hover:bg-contrast-1.5 active:scale-[98%] text-center transition-all duration-100 cursor-pointer p-5 lg:p-9 rounded">
                                        <img src="./icons/restore_from_phrase.svg" alt="Create a new account" className="w-10 h-10 mx-auto mb-4" />
                                        Import a seed phrase
                                    </div>
                                    <div onClick={goToRestoreFromBackup} className="bg-contrast-1 hover:bg-contrast-1.5 active:scale-[98%] text-center transition-all duration-100 cursor-pointer p-5 lg:p-9 rounded">
                                        <img src="./icons/restore_from_backup.svg" alt="Create a new account" className="w-10 h-10 mx-auto mb-4" />
                                        Import a Minima backup
                                    </div>
                                </div>
                            </OnboardingModal>
                        </OnboardingWrapper>
                        <FreshNodeSetupProvider>
                            <FreshNodeSetup step={step} setStep={setStep} setShowOnboarding={setShowOnboarding} />
                        </FreshNodeSetupProvider>
                        <RestoreFromPhrase step={step} setStep={setStep} />
                        <RestoreFromBackup step={step} setStep={setStep} />
                    </div>
                </div >
                <div className="fixed z-20 top-0 left-0 w-full h-full p-4 lg:p-10 overflow-hidden">
                    <div className="relative w-full h-full overflow-hidden rounded-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1320 776" fill="none" className={`absolute inset-0 w-full h-full transition-all duration-[1s] ${fullGradientOnSteps.includes(step as number) ? 'scale-[1.1]' : 'scale-1 grayscale-[80%] opacity-[70%]'}`}>
                            <g clipPath="url(#clip0_6032_13353)" className="w-full h-full" filter="url(#noise)">
                                <path className="blur-[100px]" d="M1386.94 404.211C1505.02 293.322 1484.31 157.503 1608.58 53.5939C1859.49 -156.205 1730.8 733.997 1434.66 872.837C1210.66 977.858 751.681 980.449 814.974 741.285C861.422 565.77 1074.4 623.676 1225.3 522.73C1290.36 479.209 1329.88 457.793 1386.94 404.211Z" fill="#FF8630" />
                                <path className="blur-[150px]" d="M204.744 586.528C100.422 534.55 112.001 394.547 -2.25632 371.528C-199.032 331.883 -94.5664 707.283 -2.25632 885.528C175.988 1229.71 1093.59 1259.09 990.244 885.528C946.599 727.771 883.292 598.582 723.744 562.028C607.916 535.491 546.556 634.521 427.744 632.528C338.836 631.036 284.332 626.183 204.744 586.528Z" fill="#6162FB" />
                                <ellipse className="blur-[100px]" cx="915" cy="964.117" rx="492" ry="326.5" fill="#FF8630" />
                                <circle className="blur-[100px]" cx="1396" cy="699.617" r="233" fill="#FF8630" />
                            </g>
                        </svg>
                        {/* <div className={`absolute w-full h-full bg-[url('/bg_minima_black.png')] scale-120 bg-cover bg-center transition-all duration-[2s] ${step === 0 ? 'opacity-0 scale-[1.1]' : 'scale-1 grayscale'}`} /> */}
                    </div>
                </div>
                <div className="absolute z-10 backdrop-blur-2xl bg-black w-full h-full" />
            </div>
        </onboardingContext.Provider>
    );
};

export default Onboarding;
