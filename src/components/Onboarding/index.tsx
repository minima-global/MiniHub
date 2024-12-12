import { createContext, useEffect, useState } from "react";

import RestoreFromPhrase from "./RestoreFromPhrase";
import RestoreFromBackup from "./RestoreFromBackup";
import OnboardingWrapper from "./OnboardingWrapper";
import FreshNodeSetup from "./FreshNodeSetup";
import OnboardingModal from "./OnboardingModal";
import STEPS from "./steps";
import OnboardingPrompt from "./OnboardingPrompt";

type Step = number | string | null;
type Prompt = {
    display: boolean;
    title: string;
    description: string;
}
type BackButton = string | null;

export const onboardingContext = createContext<{
    step: Step;
    setStep: (step: Step) => void;
    prompt: Prompt;
    setPrompt: (prompt: Prompt) => void;
    backButton: BackButton;
    setBackButton: (backButton: BackButton) => void;
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
});

const Onboarding = () => {
    const [showOnboarding, setShowOnboarding] = useState(true);
    const [step, setStep] = useState<number | string | null>(0);
    const [introductionStep, setIntroductionStep] = useState(0);
    const [prompt, setPrompt] = useState<{
        display: boolean;
        title: string;
        description: string;
    }>({
        display: false,
        title: "",
        description: "",
    });
    const [backButton, setBackButton] = useState<BackButton>(null);

    useEffect(() => {
        if (introductionStep === 0) {
            const timeout = setTimeout(() => {
                setIntroductionStep(1);
            }, 1500);

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

    const [showPurchaseFailed, setShowPurchaseFailed] = useState(false);

    const fullGradientOnSteps = [
        0,
        STEPS.WELCOME_TO_THE_NETWORK,
        6
    ];

    const goToCreateAccount = () => {
        setStep("CREATE_ACCOUNT_ONE");
        setBackButton(1);
    };

    return (
        <onboardingContext.Provider value={{ step, setStep, prompt, setPrompt, backButton, setBackButton }}>
            {backButton && (
                <div onClick={() => setStep(backButton)} className="absolute z-[60] top-12 left-14 text-white text-sm cursor-pointer relative z-50 flex items-center gap-2">
                    <img src="/icons/chevron_backward.svg" alt="Back" className="w-4 h-4" />
                    Back
                </div>
            )}
            <div className={`fixed top-0 left-0 w-full h-full z-50 bg-cover bg-center transition-all duration-300 ${showOnboarding ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <div className="absolute z-50 top-0 left-0 w-full h-full">
                    <div className="relative z-30">
                        <OnboardingPrompt display={showPurchaseFailed} dismiss={() => setShowPurchaseFailed(false)} />
                        <OnboardingWrapper display={step === 0}>
                            <div onClick={() => incrementStep()} className={`fixed top-0 left-0 z-20 h-screen w-screen flex items-center justify-center transition-transform duration-300 ${introductionStep === 0 ? 'cursor-pointer opacity-100' : 'pointer-events-none translate-y-1 opacity-0 h-0 w-0'}`}>
                                <div className={`animate-fadeIn transition-opacity ${introductionStep === 0 ? 'h-20 w-20' : 'h-0 w-0'}`}>
                                    <img src="/m.svg" alt="Minima" className="w-20 h-20" />
                                </div>
                            </div>
                            <div onClick={() => dismissIntroduction()} className={`fixed top-0 left-0 z-20 h-full w-full flex items-center justify-center transition-all duration-300 ${introductionStep === 1 ? 'cursor-pointer opacity-100 translate-y-0' : 'pointer-events-none translate-y-2 opacity-0'}`}>
                                <div className="text-white text-4xl">Welcome to Minima</div>
                            </div>
                        </OnboardingWrapper>
                        <OnboardingWrapper display={step === 1}>
                            <OnboardingModal display={step === 1}>
                                <h1 className="-mt-2 mb-12 text-2xl text-center mx-auto">Let's get started</h1>
                                <div className="flex flex-row gap-3">
                                    <div onClick={goToCreateAccount} className="bg-contrast-1 hover:bg-contrast-1.5 active:scale-[98%] text-center transition-all duration-100 cursor-pointer p-9 rounded">
                                        <img src="/icons/create_a_new_account.svg" alt="Create a new account" className="w-10 h-10 mx-auto mb-4" />
                                        Create a new account
                                    </div>
                                    <div onClick={() => setStep(STEPS.IMPORT_SEED_PHRASE_OPTIONS)} className="bg-contrast-1 hover:bg-contrast-1.5 active:scale-[98%] text-center transition-all duration-100 cursor-pointer p-9 rounded">
                                        <img src="/icons/restore_from_phrase.svg" alt="Create a new account" className="w-10 h-10 mx-auto mb-4" />
                                        Import a seed phrase
                                    </div>
                                    <div onClick={() => setStep("RESTORE_FROM_BACKUP")} className="bg-contrast-1 hover:bg-contrast-1.5 active:scale-[98%] text-center transition-all duration-100 cursor-pointer p-9 rounded">
                                        <img src="/icons/restore_from_backup.svg" alt="Create a new account" className="w-10 h-10 mx-auto mb-4" />
                                        Import a Minima backup
                                    </div>
                                </div>
                            </OnboardingModal>
                        </OnboardingWrapper>
                        <FreshNodeSetup step={step} setStep={setStep} setShowOnboarding={setShowOnboarding} />
                        <RestoreFromPhrase step={step} setStep={setStep} setShowOnboarindg={setShowOnboarding} />
                        <RestoreFromBackup step={step} setStep={setStep} setShowOnboarindg={setShowOnboarding} />
                    </div>
                </div >
                <div className="fixed z-20 top-0 left-0 w-full h-full p-10 overflow-hidden">
                    <div className="relative w-full h-full overflow-hidden rounded-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1320 776" fill="none" className={`absolute opacity-[80%] inset-0 w-full h-full transition-all duration-[1s] ${fullGradientOnSteps.includes(step) ? 'scale-[1.1]' : 'scale-1 grayscale-[60%] opacity-[100%]'}`}>
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
